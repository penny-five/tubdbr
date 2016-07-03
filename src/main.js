import 'jquery';
import 'bootstrap-sass';
import Vue from 'vue';

import { clamp, duration } from './filters';
import App from 'components/app';


Vue.filter('clamp', clamp);
Vue.filter('duration', duration);

new Vue({
  el: 'body',
  components: { App }
});
