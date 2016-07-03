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


export function fromURL(url) {
  const queryParams = qs.parse(url.search);

  return {
    tracks: {
      audio: {
        invalid: false,
        source: queryParams[AUDIO_SOURCE] || null,
        volume: _.clamp(parseInt(queryParams[AUDIO_VOLUME], 10) || DEFAULT_AUDIO_TRACK_VOLUME, 0, 100),
        delay: parseInt(queryParams[AUDIO_DELAY], 10),
        metadata: null
      },
      video: {
        invalid: false,
        source: queryParams[VIDEO_SOURCE] || null,
        volume: _.clamp(parseInt(queryParams[VIDEO_VOLUME], 10) || DEFAULT_VIDEO_TRACK_VOLUME, 0, 100),
        delay: parseInt(queryParams[VIDEO_DELAY], 10),
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
