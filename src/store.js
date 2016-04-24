import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
  msg: 'Hello Vuex'
};

const mutations = {};

export default new Vuex.Store({ state, mutations });
