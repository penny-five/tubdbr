import _ from 'lodash';
import Vue from 'vue';

import App from './app';

Vue.filter('clamp', {
  read: (value, min, max) => _.clamp(parseInt(value, 10) || 0, min, max),
  write: (value, oldValue, min, max) => _.clamp(parseInt(value, 10) || 0, min, max)
});

new Vue({
  el: 'body',
  components: { App }
});
