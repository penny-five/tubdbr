import $ from 'jquery';
import moment from 'moment';
import URL from 'url-parse';

const LIST_VIDEOS_RESOURCE = 'https://www.googleapis.com/youtube/v3/videos';

function buildRequest(resource, { part, id }) {
  const url = new URL(resource);
  url.set('query', {
    id,
    part: part.join(','),
    key: process.env.YOUTUBE_API_KEY
  });
  return url.toString();
}

function parseResponse(res) {
  const item = res.items[0];
  return item === null ? null : {
    id: item.id,
    title: item.snippet.title,
    channel: item.snippet.channelTitle,
    thumbnail: item.snippet.thumbnails.default.url,
    duration: moment.duration(item.contentDetails.duration).asSeconds()
  };
}

export function fetchVideoDetails(videoId) {
  if (videoId === null) return Promise.resolve(null);

  return new Promise((resolve, reject) => {
    $.get(buildRequest(LIST_VIDEOS_RESOURCE, {
      id: videoId,
      part: ['snippet', 'contentDetails']
    })).done(res => {
      resolve(parseResponse(res));
    }).fail(reject);
  });
}
