// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import './plugins/vuetify';
import colors from 'vuetify/es5/util/colors';
import VueResource from 'vue-resource';
import Vuetify from 'vuetify';
import VueI18n from 'vue-i18n';
import VeeValidate from 'vee-validate';
import VueAuth from '@websanova/vue-auth';
import VueAlertify from 'vue-alertify';
import { store } from './store/store';

import App from './App.vue';
import router from './router';

import messages from './locales';

Vue.router = router;
Vue.use(VueI18n);
Vue.use(Vuetify, {
  theme: {
    primary: colors.blue.darken2,
    accent: colors.blue.accent2,
    secondary: colors.grey.darken3,
    info: colors.blue.base,
    warning: colors.amber.base,
    error: colors.red.base,
    success: colors.green.base,
  },
});
Vue.use(VueResource);
Vue.use(VeeValidate);
Vue.use(VueAlertify);

Vue.http.options.root = 'http://localhost:3000/app-api';

Vue.use(VueAuth, {
  // eslint-disable-next-line
  auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
  // eslint-disable-next-line
  http: require('@websanova/vue-auth/drivers/http/vue-resource.1.x.js'),
  // eslint-disable-next-line
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  loginData: {
    url: `${Vue.http.options.root}/user/login`, method: 'POST', redirect: '/', fetchUser: false,
  },
  registerData: {
    url: `${Vue.http.options.root}/user/signup`, method: 'POST', redirect: '/login', fetchUser: false,
  },
  refreshData: {
    url: 'auth/refresh', method: 'GET', enabled: false, interval: 0,
  },
  fetchData: { url: 'auth/user', method: 'GET', enabled: false },
});

Vue.config.productionTip = false;

Vue.http.interceptors.push((request, next) => {
  next((res) => {
    // Unauthorized Access
    if (res.status === 401 && ['UnauthorizedAccess', 'InvliadToken'].indexOf(res.data.code) > -1) {
      Vue.auth.logout({
        redirect: { name: 'login' },
      });
    } else if (res.status === 500) { // System Error
      Vue.router.push({ name: 'error-500' });
    }
  });
});

const i18n = new VueI18n({
  locale: 'eng',
  fallbackLocale: 'eng',
  messages
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App },
});
