/* eslint-disable no-empty-pattern */
/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import Vue from 'vue';
import Router from 'vue-router';
import VueResource from 'vue-resource';

Vue.use(Router);
Vue.use(VueResource);

const state = {
  space: '',
  task: null,
  variant: 0,
  fullAnswers: [],
  currentResults: [],
  sections: [],
  taskFinished: false,
  resource: Vue.resource(`${process.env.VUE_APP_API}/api/calc`, {},
    {
      calc: {
        method: 'POST',
        url: `${process.env.VUE_APP_API}/api/calc`,
      },
      space: {
        method: 'POST',
        url: `${process.env.VUE_APP_API}/api/space-memory`,
      },
      getMatrix3d: {
        method: 'GET',
        url: `${process.env.VUE_APP_API}/servlet/matrix3d?section_number={sectionId}`,
      },
      setMatrix3d: {
        method: 'POST',
        url: `${process.env.VUE_APP_API}/servlet/matrix3d?section_number={sectionId}`,
      },
      plot3dImplicit: {
        method: 'POST',
        url: `${process.env.VUE_APP_API}/api/plot3dimplicit`,
      },
      plot3dExplicit: {
        method: 'POST',
        url: `${process.env.VUE_APP_API}/api/plot3dexplicit`,
      },
      plot3dparametric: {
        method: 'POST',
        url: `${process.env.VUE_APP_API}/api/plot3dparametric`,
      },
    },
    {
      withCredentials: true,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      before(request) {
        if (request.method === 'POST' && request.url.includes('/servlet/matrix3d?section_number=')) {
          request.headers.map['Content-Type'] = ['application/x-www-form-urlencoded'];
        }
      },
    }),
};

const getters = {
  space(state) {
    return state.space;
  },
  task(state) {
    return state.task;
  },
  variant(state) {
    return state.variant;
  },
  fullAnswers(state) {
    return state.fullAnswers;
  },
  taskFinished(state) {
    return state.taskFinished;
  },
  currentResults(state) {
    return state.currentResults.slice();
  },
  sections(state) {
    return state.sections.slice();
  },
};

const mutations = {
  SET_SPACE(state, payload) {
    state.space = payload;
  },
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
  SET_VARIANT(state, payload) {
    state.variant = payload;
  },
  SET_FULL_ANSWERS(state, payload) {
    state.fullAnswers = payload;
  },
  SET_RESOURCE(state, payload) {
    state.resource = payload;
  },
};

const actions = {
  getTaskByIdWithOneVariant({ state, commit }, payload) {
    return new Promise((resolve, reject) => Vue.http.get(`task/${payload}/${state.variant}`)
      .then((data) => {
        commit('SET_TASK', data.body);
        resolve({
          status: 'success',
        });
      })
      .catch(err => reject(err)));
  },
  calc({ state }, payload) {
    return state.resource.calc({}, { sectionId: payload.sectionId, task: payload.task });
  },
  giveUp({}, payload) {
    return Vue.http.get(`task/${payload.id}/show-solution/${payload.exerciseId}`);
  },
  check({}, payload) {
    return Vue.http.get(`task/${payload.id}/check-answer/${payload.exerciseId}/${payload.studentAnswers}`);
  },
  space({ commit, state }) {
    return state.resource.space()
      .then(({ body }) => {
        commit('SET_SPACE', body.space);
      });
  },
  getMatrix3d({ state }, payload) {
    return new Promise((resolve, reject) => state.resource
      .getMatrix3d({ sectionId: payload })
      .then((res) => {
        resolve(res);
      })
      .catch(reject));
  },
  setMatrix3d({ state }, payload) {
    return new Promise((resolve, reject) => state.resource
      .setMatrix3d({ sectionId: payload.sectionId }, payload.data)
      .then((res) => {
        resolve(res);
      })
      .catch(reject));
  },
  plot3dImplicit({ state }, payload) {
    return state.resource.plot3dImplicit({}, { sectionId: payload.sectionId, task: payload.task });
  },
  plot3dExplicit({ state }, payload) {
    return state.resource.plot3dExplicit({}, { sectionId: payload.sectionId, task: payload.task });
  },
  plot3dparametric({ state }, payload) {
    return state.resource
      .plot3dparametric({}, { sectionId: payload.sectionId, task: payload.task });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
