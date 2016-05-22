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
