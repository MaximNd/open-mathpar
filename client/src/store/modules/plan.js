const state = {
    plan: undefined
};

const getters = {
    isShow(state) {
        return !!state.plan;
    },
    plan(state) {
        return state.plan;
    }
};

const mutations = {
    SET_PLAN(state, payload) {
        state.plan = payload;
    }
};

const actions = {};

export default {
    state,
    getters,
    mutations,
    actions
};
