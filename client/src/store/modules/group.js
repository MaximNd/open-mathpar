import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const state = {
  groups: [],
  group: {},
};

const getters = {
  groups(state) {
    return state.groups;
  },
  group(state) {
    return state.group;
  },
  groupStudents(state) {
    if (typeof state.group.members !== 'undefined') {
      return state.group.members[0].students.map(studentData => ({ ...studentData.user, ...{ clients: studentData.clients[0].client } }));
    }
  },
};

const mutations = {
  SET_GROUP(state, payload) {
    state.group = payload;
  },

  SET_GROUPS(state, payload) {
    state.groups = payload;
  },
};

const actions = {
  createGroup({ commit }, payload) {
    return new Promise((resolve, reject) => Vue.http.post('group', payload)
      .then(data => resolve(data))
      .catch(err => reject(err)));
  },
  createGroupU({ commit }, payload) {
    return new Promise((resolve, reject) => Vue.http.post('group-u', payload)
      .then(data => resolve(data))
      .catch(err => reject(err)));
  },
  getGroupById({ commit }, payload) {
    return Vue.http.get(`group/${payload.groupId}`)
      .then(data => commit('SET_GROUP', data.body));
  },

  getGroupsBySchoolId({ commit }, payload) {
    return Vue.http.get(`school/${payload.schoolId}/groups`)
      .then(data => commit('SET_GROUPS', data.body.groups));
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
