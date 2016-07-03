import { parseVideoProps } from '../utils/input';
import { fetchVideoMetadata } from './api';

import {
  UPDATE_TRACK_METADATA,
  UPDATE_TRACK_VOLUME,
  UPDATE_TRACK_DELAY,
  SET_INVALID_TRACK_SOURCE,
  CLEAR_INVALID_TRACK_SOURCE,
  UPDATE_TRACK_SOURCE,
  CLEAR_TRACK,
  TOGGLE_SHOW_SHARING
} from '../constants/actions';


export function updateTrackMetadata({ dispatch }, track, metadata) {
  dispatch(UPDATE_TRACK_METADATA, track, metadata);
}

export function updateTrackVolume({ dispatch }, track, volume) {
  dispatch(UPDATE_TRACK_VOLUME, track, volume);
}

export function updateTrackDelay({ dispatch }, track, delay) {
  dispatch(UPDATE_TRACK_DELAY, track, delay);
}

export function setInvalidTrackSource({ dispatch }, track) {
  dispatch(SET_INVALID_TRACK_SOURCE, track);
}

export function clearInvalidTrackSource({ dispatch }, track) {
  dispatch(CLEAR_INVALID_TRACK_SOURCE, track);
}

export function fetchTrackMetadata(store, track) {
  const source = store.state.tracks[track].source;
  const { id, delay } = parseVideoProps(source);
  if (id != null) {
    fetchVideoMetadata(id).then(metadata => {
      if (store.state.tracks[track].source === source) {
        if (delay != null) {
          updateTrackDelay(store, track, delay);
        }
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
  store.dispatch(UPDATE_TRACK_SOURCE, track, source);
  fetchTrackMetadata(store, track, source);
}

export function clearTrack({ dispatch }, track) {
  dispatch(CLEAR_TRACK, track);
}

export function toggleShowSharing({ dispatch }) {
  dispatch(TOGGLE_SHOW_SHARING);
}
