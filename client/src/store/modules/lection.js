import Vue from 'vue';
import Router from 'vue-router'

Vue.use(Router);

const state = {
    lections: []
};

const getters = {
    lections(state) {
        return state.lections;
    }
};

const mutations = {
    SET_LECTIONS(state, payload) {
        state.lections = payload;
    }
};

const actions = {
    createLection({ commit }, payload) {
        return new Promise((resolve, reject) => {
            return Vue.http.post('lection', payload)
                .then(data => resolve(data.body))
                .catch(err => reject(err));
        });
    },
    getLectionsByTeacherId({ commit }, payload) {
        Vue.http.get(`lection/teacher/${payload.teacherId}`)
            .then(data => commit('SET_LECTIONS', data.body))
            .catch(err => console.log(err));
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
