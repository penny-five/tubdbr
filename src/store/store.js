import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import audioTrackSuggestions from '../assets/audio_track_suggestions.json';
import { fetchTrackMetadata } from './actions';
import { fromURL } from '../utils/state';
import mutations from './mutations';


const initialState = Object.assign(fromURL(window.location), {
  showShareDialog: false,
  audioTrackSuggestions
});

const initMiddleware = {
  onInit({ tracks: { audio, video } }, store) {
    if (audio.source) fetchTrackMetadata(store, 'audio');
    if (video.source) fetchTrackMetadata(store, 'video');
  }
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: initialState,
  mutations,
  middlewares: [
    initMiddleware
  ]
});
