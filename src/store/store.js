import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const initialState = {
  audio: {
    source: null,
    volume: 0,
    delay: 0
  },
  video: {
    source: null,
    volume: 0,
    delay: 0
  }
};

/* eslint-disable no-param-reassign */
const mutations = {
  'SET_AUDIO_SOURCE'(state, source) {
    state.audio.source = source;
  },
  'SET_AUDIO_DELAY'(state, delay) {
    state.audio.delay = delay;
  },
  'SET_AUDIO_VOLUME'(state, volume) {
    state.audio.volume = volume;
  },
  'SET_VIDEO_SOURCE'(state, source) {
    state.video.source = source;
  },
  'SET_VIDEO_DELAY'(state, delay) {
    state.video.delay = delay;
  },
  'SET_VIDEO_VOLUME'(state, volume) {
    state.video.volume = volume;
  }
};
/* eslint-enable no-param-reassign */

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: initialState,
  mutations
});
