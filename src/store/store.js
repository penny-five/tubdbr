import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
  audioDelay: 0,
  audioVolume: 50,
  videoDelay: 0,
  videoVolume: 75
};

const mutations = {
  'SET_AUDIO_DELAY' (state, delay) {
    state.audioDelay = delay;
  },
  'SET_AUDIO_VOLUME' (state, volume) {
    state.audioVolume = volume;
  },
  'SET_VIDEO_DELAY' (state, delay) {
    state.videoDelay = delay;
  },
  'SET_VIDEO_VOLUME' (state, volume) {
    state.videoVolume = volume;
  }
};

export default new Vuex.Store({ state, mutations });
