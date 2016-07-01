import _ from 'lodash';
import qs from 'query-string';
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import suggestedAudioTracks from '../assets/suggested_audio_tracks.json';
import * as actions from './actions';
import * as consts from './constants';


const queryParams = qs.parse(location.search);

const initialState = {
  showSharing: false,
  suggestedAudioTracks,
  tracks: {
    audio: {
      invalid: false,
      source: queryParams[consts.KEY_AUDIO_SOURCE] || null,
      volume: _.clamp(parseInt(queryParams[consts.KEY_AUDIO_VOLUME], 10) || consts.DEFAULT_AUDIO_TRACK_VOLUME, 0, 100),
      delay: parseInt(queryParams[consts.KEY_AUDIO_DELAY], 10),
      metadata: null
    },
    video: {
      invalid: false,
      source: queryParams[consts.KEY_VIDEO_SOURCE] || null,
      volume: _.clamp(parseInt(queryParams[consts.KEY_VIDEO_VOLUME], 10) || consts.DEFAULT_VIDEO_TRACK_VOLUME, 0, 100),
      delay: parseInt(queryParams[consts.KEY_VIDEO_DELAY], 10),
      metadata: null
    }
  }
};

const initMiddleware = {
  onInit({ tracks: { audio, video } }, store) {
    if (audio.source) actions.fetchTrackMetadata(store, 'audio');
    if (video.source) actions.fetchTrackMetadata(store, 'video');
  }
};

/* eslint-disable no-param-reassign */
const mutations = {
  [consts.MUTATION_UPDATE_TRACK_SOURCE]({ tracks }, track, source) {
    tracks[track].source = source;
    tracks[track].invalid = false;
  },
  [consts.MUTATION_UPDATE_TRACK_METADATA]({ tracks }, track, metadata) {
    tracks[track].metadata = metadata;
    tracks[track].invalid = false;
    tracks[track].delay = _.clamp(tracks[track].delay, 0, metadata.duration);
  },
  [consts.MUTATION_UPDATE_TRACK_DELAY]({ tracks }, track, delay) {
    tracks[track].delay = delay;
  },
  [consts.MUTATION_UPDATE_TRACK_VOLUME]({ tracks }, track, volume) {
    tracks[track].volume = volume;
  },
  [consts.MUTATION_CLEAR_TRACK]({ tracks }, track) {
    tracks[track].invalid = false;
    tracks[track].source = null;
    tracks[track].metadata = null;
    tracks[track].delay = 0;
  },
  [consts.MUTATION_TOGGLE_SHOW_SHARING](state) {
    state.showSharing = !state.showSharing;
  },
  [consts.MUTATION_SET_INVALID_TRACK_SOURCE]({ tracks }, track) {
    tracks[track].invalid = true;
  },
  [consts.MUTATION_CLEAR_INVALID_TRACK_SOURCE]({ tracks }, track) {
    tracks[track].invalid = false;
  }
};
/* eslint-enable no-param-reassign */

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: initialState,
  mutations,
  middlewares: [
    initMiddleware
  ]
});
