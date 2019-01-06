import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const state = {
  headTeachers: [],
};

const getters = {
  headTeachers(state) {
    return state.headTeachers;
  },
};

const mutations = {

};

const actions = {
  createHeadTeacher({ commit }, payload) {
    return new Promise((resolve, reject) => {
      Vue.http.post('head-teacher', payload)
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
