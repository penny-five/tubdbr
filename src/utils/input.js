import _ from 'lodash';
import 'moment-duration-format';
import URL from 'url-parse';
import Duration from 'duration-js';

const YT_HOSTNAME_VARIANTS = [
  'www.youtube.com',
  'youtube.com',
  'www.youtu.be',
  'youtu.be'
];

const YT_VIDEO_ID = /^[\w\d-]{5,12}$/;

const isYouTubeVideoID = input => YT_VIDEO_ID.test(input);

const isYouTubeURL = url => YT_HOSTNAME_VARIANTS.includes(url.hostname);

function parseVideoIdFromURL(url) {
  let id = url.query.v;
  if (id == null) {
    id = url.query.v || _.chain(url.pathname).split('/').last().value();
  }
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
  delay: null
});

const urlToProps = url => ({
  id: parseVideoIdFromURL(url),
  delay: parseVideoDelayFromURL(url)
});

const emptyProps = () => ({
  id: null,
  delay: null
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
