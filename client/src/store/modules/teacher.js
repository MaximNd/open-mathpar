import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const state = {
  timetable: [],
};

const getters = {
  timetable(state) {
    return state.timetable;
  },
};

const mutations = {
  SET_TIMETABLE(state, payload) {
    state.timetable = payload;
  },
};

const actions = {
  getTeacherTimeTable({ commit }, payload) {
    Vue.http.get(`teacher/${payload.teacherId}/timetable`)
      .then(data => commit('SET_TIMETABLE', data.body))
      .catch(err => console.log(err));
  },
  createTeacher({ commit }, payload) {
    return new Promise((resolve, reject) => Vue.http.post('teacher', payload)
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
