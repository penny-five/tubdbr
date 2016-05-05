import URL from 'url-parse';

const KNOWN_VALID_HOST_NAMES = [
  'www.youtube.com',
  'youtube.com',
  'www.youtu.be',
  'youtu.be'
];

const VALID_VIDEO_ID_MATCHER = /^[\w\d-]{5,12}$/;

function tryParseVideoIdFromPossibleUrl(possibleUrl) {
  const url = new URL(possibleUrl, true);
  return KNOWN_VALID_HOST_NAMES.indexOf(url.hostname) > -1 ? url.query.v : null;
}

export function tryParseVideoId(input) {
  const id = tryParseVideoIdFromPossibleUrl(input) || input;
  return VALID_VIDEO_ID_MATCHER.exec(id) !== null ? id : null;
}
