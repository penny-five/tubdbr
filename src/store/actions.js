import { parseVideoProps } from '../utils';
import { fetchVideoMetadata } from './api';
import * as consts from './constants';

export function updateTrackMetadata({ dispatch }, track, metadata) {
  dispatch(consts.MUTATION_UPDATE_TRACK_METADATA, track, metadata);
}

export function updateTrackVolume({ dispatch }, track, volume) {
  dispatch(consts.MUTATION_UPDATE_TRACK_VOLUME, track, volume);
}

export function updateTrackDelay({ dispatch }, track, delay) {
  dispatch(consts.MUTATION_UPDATE_TRACK_DELAY, track, delay);
}

export function setInvalidTrackSource({ dispatch }, track) {
  dispatch(consts.MUTATION_SET_INVALID_TRACK_SOURCE, track);
}

export function clearInvalidTrackSource({ dispatch }, track) {
  dispatch(consts.CLEAR_INVALID_TRACK_SOURCE, track);
}

export function fetchTrackMetadata(store, track) {
  const source = store.state.tracks[track].source;
  const { id, delay } = parseVideoProps(source);
  if (id != null) {
    fetchVideoMetadata(id).then(metadata => {
      if (store.state.tracks[track].source === source) {
        updateTrackDelay(store, track, delay);
        updateTrackMetadata(store, track, metadata);
      }
    }).catch(() => {
      if (store.state.tracks[track].source === source) {
        setInvalidTrackSource(store, track);
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

export function toggleShowSharing({ dispatch }) {
  dispatch(consts.MUTATION_TOGGLE_SHOW_SHARING);
}
