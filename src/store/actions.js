
export function setAudioSource({ dispatch }, source) {
  dispatch('SET_AUDIO_SOURCE', source);
}

export function setAudioVolume({ dispatch }, volume) {
  dispatch('SET_AUDIO_VOLUME', volume);
}

export function setAudioDelay({ dispatch }, delay) {
  dispatch('SET_AUDIO_DELAY', delay);
}

export function setVideoSource({ dispatch }, source) {
  dispatch('SET_VIDEO_SOURCE', source);
}

export function setVideoVolume({ dispatch }, volume) {
  dispatch('SET_VIDEO_VOLUME', volume);
}

export function setVideoDelay({ dispatch }, delay) {
  dispatch('SET_VIDEO_DELAY', delay);
}
