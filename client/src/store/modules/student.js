import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const state = {};

const getters = {};

const mutations = {};

const actions = {
  createStudents({ commit }, payload) {
    return new Promise((resolve, reject) => Vue.http.post('student', payload)
      .then(data => resolve(data))
      .catch(err => reject(err)));
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
