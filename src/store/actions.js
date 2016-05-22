import { parseVideoID } from '../utils';
import { fetchVideoMetadata } from './api';

function tryFetchVideoMetadata(source, cb) {
  const videoID = parseVideoID(source);
  if (videoID !== null) {
    fetchVideoMetadata(videoID).then(cb);
  }
}

export function updateAudioTrackMetadata({ dispatch }, metadata) {
  dispatch('UPDATE_AUDIO_TRACK_METADATA', metadata);
}

export function updateAudioTrackSource(store, source) {
  store.dispatch('UPDATE_AUDIO_TRACK_SOURCE', source);
  tryFetchVideoMetadata(source, metadata => {
    if (store.state.audioTrack.source === source) {
      updateAudioTrackMetadata(store, metadata);
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

export function updateVideoTrackMetadata({ dispatch }, metadata) {
  dispatch('UPDATE_VIDEO_TRACK_METADATA', metadata);
}

export function updateVideoTrackSource(store, source) {
  store.dispatch('UPDATE_VIDEO_TRACK_SOURCE', source);
  tryFetchVideoMetadata(source, metadata => {
    if (store.state.videoTrack.source === source) {
      updateVideoTrackMetadata(store, metadata);
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
