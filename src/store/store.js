import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const initialState = {
  audio: {
    source: null,
    volume: 80,
    delay: 0,
    details: null
  },
  video: {
    source: null,
    volume: 50,
    delay: 0,
    details: null
  }
};

/* eslint-disable no-param-reassign */
const mutations = {
  'SET_AUDIO_SOURCE'(state, source) {
    state.audio.source = source;
  },
  'SET_AUDIO_DETAILS'(state, details) {
    state.audio.details = details;
  },
  'SET_AUDIO_DELAY'(state, delay) {
    state.audio.delay = delay;
  },
  'SET_AUDIO_VOLUME'(state, volume) {
    state.audio.volume = volume;
  },
  'CLEAR_AUDIO'(state) {
    state.audio.source = null;
    state.audio.details = null;
    state.audio.delay = 0;
  },
  'SET_VIDEO_SOURCE'(state, source) {
    state.video.source = source;
  },
  'SET_VIDEO_DETAILS'(state, details) {
    state.video.details = details;
  },
  'SET_VIDEO_DELAY'(state, delay) {
    state.video.delay = delay;
  },
  'SET_VIDEO_VOLUME'(state, volume) {
    state.video.volume = volume;
  },
  'CLEAR_VIDEO'(state) {
    state.video.source = null;
    state.video.details = null;
    state.audio.delay = 0;
  }
};
/* eslint-enable no-param-reassign */

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: initialState,
  mutations
});
