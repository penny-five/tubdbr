import _ from 'lodash';
import qs from 'query-string';
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import * as actions from './actions';

const queryParams = qs.parse(location.search);

const initialState = {
  audioTrack: {
    source: queryParams.audioSrc || null,
    volume: _.clamp(parseInt(queryParams.audioVol, 10) || 0, 0, 100),
    delay: parseInt(queryParams.audioDelay, 10),
    metadata: null
  },
  videoTrack: {
    source: queryParams.videoSrc || null,
    volume: _.clamp(parseInt(queryParams.videoVol, 10) || 0, 0, 100),
    delay: parseInt(queryParams.videoDelay, 10),
    metadata: null
  }
};

const initMiddleware = {
  onInit({ videoTrack, audioTrack }, store) {
    if (videoTrack.source) actions.fetchVideoTrackMetadata(store);
    if (audioTrack.source) actions.fetchAudioTrackMetadata(store);
  }
};

/* eslint-disable no-param-reassign */
const mutations = {
  'UPDATE_AUDIO_TRACK_SOURCE'({ audioTrack }, source) {
    audioTrack.source = source;
  },
  'UPDATE_AUDIO_TRACK_METADATA'({ audioTrack }, metadata) {
    audioTrack.metadata = metadata;
    audioTrack.delay = _.clamp(audioTrack.delay, 0, metadata.duration);
  },
  'UPDATE_AUDIO_TRACK_DELAY'({ audioTrack }, delay) {
    audioTrack.delay = delay;
  },
  'UPDATE_AUDIO_TRACK_VOLUME'({ audioTrack }, volume) {
    audioTrack.volume = volume;
  },
  'CLEAR_AUDIO_TRACK'({ audioTrack }) {
    audioTrack.source = null;
    audioTrack.metadata = null;
    audioTrack.delay = 0;
  },
  'UPDATE_VIDEO_TRACK_SOURCE'({ videoTrack }, source) {
    videoTrack.source = source;
  },
  'UPDATE_VIDEO_TRACK_METADATA'({ videoTrack }, metadata) {
    videoTrack.metadata = metadata;
    videoTrack.delay = _.clamp(videoTrack.delay, 0, metadata.duration);
  },
  'UPDATE_VIDEO_TRACK_DELAY'({ videoTrack }, delay) {
    videoTrack.delay = delay;
  },
  'UPDATE_VIDEO_TRACK_VOLUME'({ videoTrack }, volume) {
    videoTrack.volume = volume;
  },
  'CLEAR_VIDEO_TRACK'({ videoTrack }) {
    videoTrack.source = null;
    videoTrack.metadata = null;
    videoTrack.delay = 0;
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
