import { tryParseVideoId } from '../utils';
import { fetchVideoDetails } from './api';

function tryFetchVideoDetails(source, cb) {
  const videoId = tryParseVideoId(source);
  if (videoId !== null) {
    fetchVideoDetails(videoId).then(cb);
  }
}

export function updateAudioTrackDetails({ dispatch }, details) {
  dispatch('UPDATE_AUDIO_TRACK_DETAILS', details);
}

export function updateAudioTrackSource(store, source) {
  store.dispatch('UPDATE_AUDIO_TRACK_SOURCE', source);
  tryFetchVideoDetails(source, details => {
    if (store.state.audioTrack.source === source) {
      updateAudioTrackDetails(store, details);
    }
  });
}

export function updateAudioTrackVolume({ dispatch }, volume) {
  dispatch('UPDATE_AUDIO_TRACK_VOLUME', volume);
}

export function updateAudioTrackDelay({ dispatch }, delay) {
  dispatch('UPDATE_AUDIO_TRACK_DELAY', delay);
}

export function clearAudioTrack({ dispatch }) {
  dispatch('CLEAR_AUDIO_TRACK');
}

export function updateVideoTrackDetails({ dispatch }, details) {
  dispatch('UPDATE_VIDEO_TRACK_DETAILS', details);
}

export function updateVideoTrackSource(store, source) {
  store.dispatch('UPDATE_VIDEO_TRACK_SOURCE', source);
  tryFetchVideoDetails(source, details => {
    if (store.state.videoTrack.source === source) {
      updateVideoTrackDetails(store, details);
    }
  });
}

export function updateVideoTrackVolume({ dispatch }, volume) {
  dispatch('UPDATE_VIDEO_TRACK_VOLUME', volume);
}

export function updateVideoTrackDelay({ dispatch }, delay) {
  dispatch('UPDATE_VIDEO_TRACK_DELAY', delay);
}

export function clearVideoTrack({ dispatch }) {
  dispatch('CLEAR_VIDEO_TRACK');
}
