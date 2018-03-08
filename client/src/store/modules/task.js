import Vue from 'vue';
import Router from 'vue-router'

Vue.use(Router);

const state = {
    tasks: []
};

const getters = {
    tasks(state) {
        return state.tasks;
    }
};

const mutations = {
    SET_TASKS(state, payload) {
        state.tasks = payload;
    }
};

const actions = {
    createTask({ commit }, payload) {
        return new Promise((resolve, reject) => {
            return Vue.http.post('task', payload)
                .then(data => resolve(data.body))
                .catch(err => reject(err));
        });
    },
    getTasksByTeacherId({ commit }, payload) {
        Vue.http.get(`tasks/teacher/${payload.teacherId}`)
            .then(data => commit('SET_TASKS', data.body))
            .catch(err => console.log(err));
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
