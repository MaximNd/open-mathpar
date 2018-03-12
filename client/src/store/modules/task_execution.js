import Vue from 'vue';
import Router from 'vue-router'
import VueResource from 'vue-resource';

Vue.use(Router);
Vue.use(VueResource);

const state = {
    task: null,
    currentResults: [],
    sections: [],
    taskFinished: false,
    resource: Vue.resource('http://localhost:8084/mathpar/api/calc', {},
    {
      calc: {
        method: 'POST',
        url: 'http://localhost:8084/mathpar/api/calc'
      }
    },
    {
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  )
};

const getters = {
    task(state) {
      return state.task;
    },
    taskFinished(state) {
      return state.taskFinished;
    },
    currentResults(state) {
      return state.currentResults.slice();
    },
    sections(state) {
      return state.sections.slice();
    }
};

const mutations = {
    SET_TASK(state, payload) {
        state.task = payload;
    },
    SET_TASK_FINISHED(state, payload) {
      state.taskFinished = payload;
    },
    SET_CURRENT_RESULT(state, payload) {
      state.currentResults = payload;
    },
    SET_SECTIONS(state, payload) {
      state.sections = payload;
    },
    resource(state, payload) {
      state.resource = payload;
    }
};

const actions = {
    getTaskById({ commit }, payload) {
        return new Promise((resolve, reject) => {
            return Vue.http.get(`task/${payload}`)
                .then(data => {
                    commit('SET_TASK', data.body);
                    resolve({
                        status: 'success'
                    });
                })
                .catch(err => reject(err));
        });
    },
    calc({ commit, state }, payload) {
      return state.resource.calc({}, { sectionId: payload.sectionId, task: payload.task });
    },
    giveUp({ commit }, payload) {
      return Vue.http.get(`task/${payload.id}/show-solution/${payload.exercise}`);
    },
    check({ commit }, payload) {
      return Vue.http.get(`task/${payload.id}/check-answer/${payload.exercise}/${payload.studentAnswers}`);
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
