import moment from 'moment';
import URL from 'url-parse';

const YOUTUBE_HOSTNAME_VARIANTS = [
  'www.youtube.com',
  'youtube.com',
  'www.youtu.be',
  'youtu.be'
];

const VALID_VIDEO_ID_MATCHER = /^[\w\d-]{5,12}$/;

function tryParseVideoIdFromPossibleUrl(possibleUrl) {
  const url = new URL(possibleUrl, true);
  return YOUTUBE_HOSTNAME_VARIANTS.indexOf(url.hostname) > -1 ? url.query.v : null;
}

export function tryParseVideoId(input) {
  const id = tryParseVideoIdFromPossibleUrl(input) || input;
  return VALID_VIDEO_ID_MATCHER.exec(id) !== null ? id : null;
}

export function formatDuration(value) {
  return moment.duration(value, 'seconds').format('m:ss', { trim: false });
}

export function parseDuration(value) {
  const minutes = parseInt(value.split(':')[0], 10) || 0;
  const seconds = parseInt(value.split(':')[1], 10) || 0;
  return minutes * 60 + seconds;
}
