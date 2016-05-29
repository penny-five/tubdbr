import { parseVideoID } from '../utils';
import { fetchVideoMetadata } from './api';

function tryFetchMetadata(source, cb) {
  const videoID = parseVideoID(source);
  if (videoID !== null) {
    fetchVideoMetadata(videoID).then(cb);
  }
}

export function updateTrackMetadata({ dispatch }, track, metadata) {
  dispatch('UPDATE_TRACK_METADATA', track, metadata);
}

export function fetchTrackMetadata(store, track) {
  const source = store.state.tracks[track].source;
  tryFetchMetadata(source, metadata => {
    if (store.state.tracks[track].source === source) {
      updateTrackMetadata(store, track, metadata);
    }
  });
}

export function updateTrackSource(store, track, source) {
  store.dispatch('UPDATE_TRACK_SOURCE', track, source);
  fetchTrackMetadata(store, track);
}

export function updateTrackVolume({ dispatch }, track, volume) {
  dispatch('UPDATE_TRACK_VOLUME', track, volume);
}

export function updateTrackDelay({ dispatch }, track, delay) {
  dispatch('UPDATE_TRACK_DELAY', track, delay);
}

export function clearTrack({ dispatch }, track) {
  dispatch('CLEAR_TRACK', track);
}
