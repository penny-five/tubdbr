import _ from 'lodash';
import { parse } from 'query-string';
import URL from 'url-parse';

import {
  DEFAULT_AUDIO_TRACK_VOLUME,
  DEFAULT_VIDEO_TRACK_VOLUME
} from '../constants/defaults';

import {
  AUDIO_SOURCE,
  AUDIO_VOLUME,
  AUDIO_DELAY,
  VIDEO_SOURCE,
  VIDEO_VOLUME,
  VIDEO_DELAY,
  SHARE_MODE
} from '../constants/queryparams';


const parseShareMode = input => input === '1' || input === 'true';

const parseSource = input => input || null;

const parseVolume = (input, defaultVolume) => {
  const volume = parseInt(input, 10);
  return _.clamp(!isNaN(volume) ? volume : defaultVolume, 0, 100);
};

const parseDelay = input => parseInt(input, 10);

export function fromURL(url) {
  const query = parse(url.search);

  return {
    shareMode: parseShareMode(query[SHARE_MODE]),
    tracks: {
      audio: {
        invalid: false,
        source: parseSource(query[AUDIO_SOURCE]),
        volume: parseVolume(query[AUDIO_VOLUME], DEFAULT_AUDIO_TRACK_VOLUME),
        delay: parseDelay(query[AUDIO_DELAY]),
        metadata: null
      },
      video: {
        invalid: false,
        source: parseSource(query[VIDEO_SOURCE]),
        volume: parseVolume(query[VIDEO_VOLUME], DEFAULT_VIDEO_TRACK_VOLUME),
        delay: parseDelay(query[VIDEO_DELAY]),
        metadata: null
      }
    }
  };
}

export function toURL(hostname, { tracks: { video, audio } }) {
  const url = new URL(hostname);
  url.set('query', {
    [VIDEO_SOURCE]: video.metadata.id,
    [VIDEO_DELAY]: video.delay,
    [VIDEO_VOLUME]: video.volume,
    [AUDIO_SOURCE]: audio.metadata.id,
    [AUDIO_DELAY]: audio.delay,
    [AUDIO_VOLUME]: audio.volume,
    [SHARE_MODE]: true
  });
  return url.toString();
}
