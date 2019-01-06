import Vue from 'vue';

const state = {
  plan: undefined,
  planInTable: undefined,
  plans: [],
};

const getters = {
  isShow(state) {
    return !!state.plan;
  },
  plan(state) {
    return state.plan;
  },
  planInTable(state) {
    return state.planInTable;
  },
  plans(state) {
    return state.plans;
  },
};

const mutations = {
  SET_PLAN(state, payload) {
    state.plan = payload;
  },
  SET_PLAN_IN_TABLE(state, payload) {
    state.planInTable = payload;
  },
  SET_PLANS(state, payload) {
    state.plans = payload;
  },
};

const actions = {
  getFilteredPlans({ commit }, {
    schoolId, fetchType, teacherId, subjectId,
  }) {
    return Vue.http.get(`plans/${schoolId}/${fetchType}/${teacherId}/${subjectId}`)
      .then(data => commit('SET_PLANS', data.body))
      .catch(err => console.log(err));
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
