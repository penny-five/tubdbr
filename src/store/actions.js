import { tryParseVideoId } from './helpers';
import { fetchVideoDetails } from './api';

export function setAudioDetails({ dispatch }, details) {
  dispatch('SET_AUDIO_DETAILS', details);
}

export function setAudioSource(store, source) {
  store.dispatch('SET_AUDIO_SOURCE', source);
  fetchVideoDetails(tryParseVideoId(source)).then(details => {
    setAudioDetails(store, details);
  });
}

export function setAudioVolume({ dispatch }, volume) {
  dispatch('SET_AUDIO_VOLUME', volume);
}

export function setAudioDelay({ dispatch }, delay) {
  dispatch('SET_AUDIO_DELAY', delay);
}

export function setVideoDetails({ dispatch }, details) {
  dispatch('SET_VIDEO_DETAILS', details);
}

export function setVideoSource(store, source) {
  store.dispatch('SET_VIDEO_SOURCE', source);
  fetchVideoDetails(tryParseVideoId(source)).then(details => {
    setVideoDetails(store, details);
  });
}

export function setVideoVolume({ dispatch }, volume) {
  dispatch('SET_VIDEO_VOLUME', volume);
}

export function setVideoDelay({ dispatch }, delay) {
  dispatch('SET_VIDEO_DELAY', delay);
}
