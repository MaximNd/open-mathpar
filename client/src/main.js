// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue';
import { store } from './store/store';
import VueResource from 'vue-resource';
import Vuetify from 'vuetify';
import VeeValidate from 'vee-validate';
import VueAuth from '@websanova/vue-auth';

import App from './App';
import router from './router';

Vue.router = router;
Vue.use(Vuetify);
Vue.use(VueResource);
Vue.use(VeeValidate);

Vue.http.options.root = 'http://localhost:3000/app-api';

Vue.use(VueAuth, {
    auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
    http: require('@websanova/vue-auth/drivers/http/vue-resource.1.x.js'),
    router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
    loginData: { url: `${Vue.http.options.root}/user/login`, method: 'POST', redirect: '/', fetchUser: false },
    registerData: { url: `${Vue.http.options.root}/user/signup`, method: 'POST', redirect: '/login', fetchUser: false },
    refreshData: { url: 'auth/refresh', method: 'GET', enabled: false, interval: 0 },
    fetchData: { url: 'auth/user', method: 'GET', enabled: false }
});

Vue.config.productionTip = false;

Vue.http.interceptors.push((request, next) => {
    next(res => {
        // Unauthorized Access
        if (res.status === 401 && ['UnauthorizedAccess', 'InvliadToken'].indexOf(res.data.code) > -1) {
            Vue.auth.logout({
                redirect: {name: 'login'}
            });
        } else if (res.status === 500) { // System Error
            Vue.router.push({name: 'error-500'});
        }
    });
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
