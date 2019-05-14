import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const state = {};

const getters = {};

const mutations = {};

const actions = {
  createClass({ commit }, payload) {
    return new Promise((resolve, reject) => {
      Vue.http.post('class', payload)
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  },
  createClassU({ commit }, payload) {
    return new Promise((resolve, reject) => {
      Vue.http.post('class-u', payload)
        .then(data => resolve(data))
        .catch(err => reject(err));
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
