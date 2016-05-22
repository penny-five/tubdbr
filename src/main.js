import _ from 'lodash';
import Vue from 'vue';

import { parseDuration, formatDuration } from 'utils';
import App from './app';

Vue.filter('clamp', {
  read: (value, min, max) => _.clamp(parseInt(value, 10) || 0, min, max),
  write: (value, oldValue, min, max) => _.clamp(parseInt(value, 10) || 0, min, max)
});

Vue.filter('duration', {
  read: formatDuration,
  write: parseDuration
});

new Vue({
  el: 'body',
  components: { App }
});
