import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

const state = {
    user: undefined,
    otherUser: undefined,
    isLoggedInUser: undefined
};

const getters = {
    user(state) {
      return state.user;
    },
    otherUser(state) {
      return state.otherUser;
    },
    isLoggedInUser(state) {
      return state.isLoggedInUser;
    }
};

const mutations = {
    SET_USER(state, payload) {
        state.user = payload;
    },
    SET_OTHER_USER(state, payload) {
      state.otherUser = payload;
    },
    SET_IS_LOGGED_IN_USER(state, payload) {
      state.isLoggedInUser = payload;
    }
};

const actions = {
    fetchUser({ commit, dispatch }) {
      return new Promise((resolve, reject) => {
        const token = Vue.auth.token();
        if (token) {
          Vue.http.get(`auth/user`, {}, { headers: { 'Authorization': `Bearer ${token}` } })
          .then(data => {
              let user = data.body.user;
              let clients = data.body.clients;
              user.clients = clients;
              Vue.auth.user(user);
              commit('SET_USER', user);
              resolve();
          })
        } else {
          reject();
        }
      });
    },
    checkIfCurrent({ commit }, payload) {
      console.log('check:', payload.params.id === Vue.auth.user().id);
      if (payload.params.id === Vue.auth.user().id) {
        commit('SET_IS_LOGGED_IN_USER', true);
        return true;
      } else {
        commit('SET_IS_LOGGED_IN_USER', false);
        return false;
      }
    },
    getUser({ commit }, payload) {
        return new Promise((resolve, reject) => {
          Vue.http.get(`user/${payload.params.id}`)
          .then(data => {
              let user = data.body.user;
              let clients = data.body.clients;
              user.clients = clients;
              // Vue.auth.user(user);
              commit('SET_OTHER_USER', user);
              resolve();
          })
          .catch(err => reject(err));
        });
    }
};

export default {
    state,
    getters,
    mutations,
    actions
};
