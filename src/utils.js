import moment from 'moment';
import 'moment-duration-format';
import URL from 'url-parse';
import Duration from 'duration-js';

import * as consts from './store/constants';

const YT_HOSTNAME_VARIANTS = [
  'www.youtube.com',
  'youtube.com',
  'www.youtu.be',
  'youtu.be'
];

const YT_VIDEO_ID = /^[\w\d-]{5,12}$/;

const isYouTubeVideoID = input => YT_VIDEO_ID.test(input);

const isYouTubeURL = url => YT_HOSTNAME_VARIANTS.indexOf(url.hostname) > -1;

function parseVideoIdFromURL(url) {
  const id = url.query.v;
  return isYouTubeVideoID(id) ? id : null;
}

function parseVideoDelayFromURL({ query: { t } }) {
  try {
    return new Duration(t).seconds();
  } catch (err) {
    return parseInt(t, 10);
  }
}

const idToProps = id => ({
  id,
  delay: 0
});

const urlToProps = url => ({
  id: parseVideoIdFromURL(url),
  delay: parseVideoDelayFromURL(url)
});

const emptyProps = () => ({
  id: null,
  delay: 0
});

export function parseVideoProps(input) {
  const url = new URL(input, true);
  if (isYouTubeVideoID(input)) {
    return idToProps(input);
  } else if (isYouTubeURL(url)) {
    return urlToProps(url);
  }
  return emptyProps();
}

export const createYoutubeLink = videoId => `https://www.youtube.com/watch?v=${videoId}`;

export function formatDuration(value) {
  return moment.duration(value, 'seconds').format('mm:ss', { trim: false });
}

export function parseDuration(value) {
  const minutes = parseInt(value.split(':')[0], 10) || 0;
  const seconds = parseInt(value.split(':')[1], 10) || 0;
  return minutes * 60 + seconds;
}

export function createShareableURL(hostname, videoTrack, audioTrack) {
  const url = new URL(hostname);
  url.set('query', {
    [consts.KEY_VIDEO_SOURCE]: videoTrack.metadata.id,
    [consts.KEY_VIDEO_DELAY]: videoTrack.delay,
    [consts.KEY_VIDEO_VOLUME]: videoTrack.volume,
    [consts.KEY_AUDIO_SOURCE]: audioTrack.metadata.id,
    [consts.KEY_AUDIO_DELAY]: audioTrack.delay,
    [consts.KEY_AUDIO_VOLUME]: audioTrack.volume
  });
  return url.toString();
}
