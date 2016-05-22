import moment from 'moment';
import URL from 'url-parse';

const YT_HOSTNAME_VARIANTS = [
  'www.youtube.com',
  'youtube.com',
  'www.youtu.be',
  'youtu.be'
];

const YT_VIDEO_ID = /^[\w\d-]{5,12}$/;

function parseVideoIDFromURL(possibleUrl) {
  const url = new URL(possibleUrl, true);
  return YT_HOSTNAME_VARIANTS.indexOf(url.hostname) > -1 ? url.query.v : null;
}

export function parseVideoID(input) {
  const id = parseVideoIDFromURL(input) || input;
  return YT_VIDEO_ID.exec(id) !== null ? id : null;
}

export function formatDuration(value) {
  return moment.duration(value, 'seconds').format('m:ss', { trim: false });
}

export function parseDuration(value) {
  const minutes = parseInt(value.split(':')[0], 10) || 0;
  const seconds = parseInt(value.split(':')[1], 10) || 0;
  return minutes * 60 + seconds;
}
