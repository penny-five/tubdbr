import _ from 'lodash';
import qs from 'query-string';
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
  VIDEO_DELAY
} from '../constants/queryparams';


const parseSource = input => input || null;

const parseVolume = (input, defaultVolume) => {
  const volume = parseInt(input, 10);
  return _.clamp(volume != null ? volume : defaultVolume, 0, 100);
};

const parseDelay = input => parseInt(input, 10);

export function fromURL(url) {
  const queryParams = qs.parse(url.search);

  return {
    tracks: {
      audio: {
        invalid: false,
        source: parseSource(queryParams[AUDIO_SOURCE]),
        volume: parseVolume(queryParams[AUDIO_VOLUME], DEFAULT_AUDIO_TRACK_VOLUME),
        delay: parseDelay(queryParams[AUDIO_DELAY]),
        metadata: null
      },
      video: {
        invalid: false,
        source: parseSource(queryParams[VIDEO_SOURCE]),
        volume: parseVolume(queryParams[VIDEO_VOLUME], DEFAULT_VIDEO_TRACK_VOLUME),
        delay: parseDelay(queryParams[VIDEO_DELAY]),
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
    [AUDIO_VOLUME]: audio.volume
  });
  return url.toString();
}
