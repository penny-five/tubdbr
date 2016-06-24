import _ from 'lodash';
import qs from 'query-string';
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import suggestedAudioTracks from '../suggested_audio_tracks.json';
import * as actions from './actions';

const DEFAULT_VIDEO_TRACK_VOLUME = 80;
const DEFAULT_AUDIO_TRACK_VOLUME = 40;

const queryParams = qs.parse(location.search);

const initialState = {
  suggestedAudioTracks,
  tracks: {
    audio: {
      source: queryParams.audioSrc || null,
      volume: _.clamp(parseInt(queryParams.audioVol, 10) || DEFAULT_AUDIO_TRACK_VOLUME, 0, 100),
      delay: parseInt(queryParams.audioDelay, 10),
      metadata: null
    },
    video: {
      source: queryParams.videoSrc || null,
      volume: _.clamp(parseInt(queryParams.videoVol, 10) || DEFAULT_VIDEO_TRACK_VOLUME, 0, 100),
      delay: parseInt(queryParams.videoDelay, 10),
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
  'UPDATE_TRACK_SOURCE'({ tracks }, track, source) {
    tracks[track].source = source;
  },
  'UPDATE_TRACK_METADATA'({ tracks }, track, metadata) {
    tracks[track].metadata = metadata;
    tracks[track].delay = _.clamp(tracks[track].delay, 0, metadata.duration);
  },
  'UPDATE_TRACK_DELAY'({ tracks }, track, delay) {
    tracks[track].delay = delay;
  },
  'UPDATE_TRACK_VOLUME'({ tracks }, track, volume) {
    tracks[track].volume = volume;
  },
  'CLEAR_TRACK'({ tracks }, track) {
    tracks[track].source = null;
    tracks[track].metadata = null;
    tracks[track].delay = 0;
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
