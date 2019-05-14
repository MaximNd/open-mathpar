import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const state = {
  methodists: [],
};

const getters = {
  methodists(state) {
    return state.methodists;
  },
};

const mutations = {

};

const actions = {
  createMethodist({ commit }, payload) {
    return new Promise((resolve, reject) => {
      Vue.http.post('methodist', payload)
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
