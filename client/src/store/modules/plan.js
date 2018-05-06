import Vue from 'vue';

const state = {
    plan: undefined,
    plans: []
};

const getters = {
    isShow(state) {
        return !!state.plan;
    },
    plan(state) {
        return state.plan;
    },
    plans(state) {
      return state.plans;
    }
};

const mutations = {
    SET_PLAN(state, payload) {
        state.plan = payload;
    },
    SET_PLANS(state, payload) {
      state.plans = payload;
    }
};

const actions = {
  getFilteredPlans({ commit }, payload) {
    Vue.http.get('plans')
            .then(data => commit('SET_PLANS', data.body))
            .catch(err => console.log(err));
  }
};

export default {
    state,
    getters,
    mutations,
    actions
};
