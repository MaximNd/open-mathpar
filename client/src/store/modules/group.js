import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);

const state = {
    groups: [],
    group: {}
};

const getters = {
    groups(state) {
        return state.groups;
    },
    group(state) {
        return state.group;
    }
};

const mutations = {
    SET_GROUP(state, payload) {
        state.group = payload;
    },

    SET_GROUPS(state, payload) {
        state.groups = payload;
    }
};

const actions = {
    createGroup({ commit }, payload) {
        return new Promise((resolve, reject) => {
            return Vue.http.post('group', payload)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    },
    getGroupById({ commit }, payload) {
        Vue.http.get(`group/${payload.groupId}`)
            .then(data => commit('SET_GROUP', data.body));
    },

    getGroupsBySchoolId({ commit }, payload) {
        Vue.http.get(`school/${payload.schoolId}/groups`)
            .then(data => commit('SET_GROUPS', data.body.groups));
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
