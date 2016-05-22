import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const initialState = {
  audioTrack: {
    source: null,
    volume: 50,
    delay: 0,
    metadata: null
  },
  videoTrack: {
    source: null,
    volume: 80,
    delay: 0,
    metadata: null
  }
};

/* eslint-disable no-param-reassign */
const mutations = {
  'UPDATE_AUDIO_TRACK_SOURCE'({ audioTrack }, source) {
    audioTrack.source = source;
  },
  'UPDATE_AUDIO_TRACK_METADATA'({ audioTrack }, metadata) {
    audioTrack.metadata = metadata;
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
  mutations
});
