import $ from 'jquery';
import 'bootstrap-sass';

/* Fixes clipboard.js not working with Bootstrap modals on some browsers (mainly FF).
More info: https://github.com/zenorocha/clipboard.js/issues/155
*/
$.fn.modal.Constructor.prototype.enforceFocus = function() {};

import Vue from 'vue';

import { clamp, duration } from './filters';
import App from 'components/app';


Vue.filter('clamp', clamp);
Vue.filter('duration', duration);

new Vue({
  el: 'body',
  components: { App }
});
