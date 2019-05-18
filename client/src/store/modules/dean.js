import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const state = {
  deans: [],
};

const getters = {
  deans(state) {
    return state.deans;
  },
};

const mutations = {

};

const actions = {
  createDean({ commit }, payload) {
    return new Promise((resolve, reject) => {
      Vue.http.post('dean', payload)
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
