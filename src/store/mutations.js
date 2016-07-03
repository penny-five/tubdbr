import _ from 'lodash';

import {
  UPDATE_TRACK_METADATA,
  UPDATE_TRACK_VOLUME,
  UPDATE_TRACK_DELAY,
  SET_INVALID_TRACK_SOURCE,
  CLEAR_INVALID_TRACK_SOURCE,
  UPDATE_TRACK_SOURCE,
  CLEAR_TRACK,
  TOGGLE_SHOW_SHARE_DIALOG,
  TOGGLE_SHARE_MODE
} from '../constants/actions';


/* eslint-disable no-param-reassign */
export default {
  [UPDATE_TRACK_SOURCE]({ tracks }, track, source) {
    tracks[track].source = source;
    tracks[track].invalid = false;
  },
  [UPDATE_TRACK_METADATA]({ tracks }, track, metadata) {
    tracks[track].metadata = metadata;
    tracks[track].invalid = false;
    tracks[track].delay = _.clamp(tracks[track].delay, 0, metadata.duration);
  },
  [UPDATE_TRACK_DELAY]({ tracks }, track, delay) {
    tracks[track].delay = delay;
  },
  [UPDATE_TRACK_VOLUME]({ tracks }, track, volume) {
    tracks[track].volume = volume;
  },
  [CLEAR_TRACK]({ tracks }, track) {
    tracks[track].invalid = false;
    tracks[track].source = null;
    tracks[track].metadata = null;
    tracks[track].delay = 0;
  },
  [TOGGLE_SHOW_SHARE_DIALOG](state) {
    state.showShareDialog = !state.showShareDialog;
  },
  [TOGGLE_SHARE_MODE](state) {
    state.shareMode = !state.shareMode;
  },
  [SET_INVALID_TRACK_SOURCE]({ tracks }, track) {
    tracks[track].invalid = true;
  },
  [CLEAR_INVALID_TRACK_SOURCE]({ tracks }, track) {
    tracks[track].invalid = false;
  }
};
/* eslint-enable no-param-reassign */
