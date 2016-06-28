import { parseVideoProps } from '../utils';
import { fetchVideoMetadata } from './api';
import * as consts from './constants';

function tryFetchMetadata(videoID, cb) {
  if (videoID !== null) {
    fetchVideoMetadata(videoID).then(cb);
  }
}

export function updateTrackMetadata({ dispatch }, track, metadata) {
  dispatch(consts.MUTATION_UPDATE_TRACK_METADATA, track, metadata);
}

export function updateTrackVolume({ dispatch }, track, volume) {
  dispatch(consts.MUTATION_UPDATE_TRACK_VOLUME, track, volume);
}

export function updateTrackDelay({ dispatch }, track, delay) {
  dispatch(consts.MUTATION_UPDATE_TRACK_DELAY, track, delay);
}

export function fetchTrackMetadata(store, track) {
  const source = store.state.tracks[track].source;
  const { id, delay } = parseVideoProps(source);
  if (id != null) {
    tryFetchMetadata(id, metadata => {
      if (store.state.tracks[track].source === source) {
        updateTrackDelay(store, track, delay);
        updateTrackMetadata(store, track, metadata);
      }
    });
  }
}

export function updateTrackSource(store, track, source) {
  store.dispatch(consts.MUTATION_UPDATE_TRACK_SOURCE, track, source);
  fetchTrackMetadata(store, track, source);
}

export function clearTrack({ dispatch }, track) {
  dispatch(consts.MUTATION_CLEAR_TRACK, track);
}
