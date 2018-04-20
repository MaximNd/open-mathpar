<template>
  <v-container fluid v-if="$auth.ready()">
    <v-layout row wrap align-center justify-center>
      <v-flex sm12 md5 lg4 xl2>
        <v-form v-if="!$auth.check()" @submit.prevent="loginUser" method="POST">
          <v-card>
            <v-card-title class="primary white--text title">
              Login
            </v-card-title>
            <v-card-text>
              <v-flex xs12>
                <v-text-field v-model="data.email" label="Email" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field v-model="data.password" label="Password" type="password" required></v-text-field>
              </v-flex>
            </v-card-text>
            <v-card-actions class="pl-3 pb-1">
              <v-btn color="info" small :to="'/register'">Register</v-btn>
            </v-card-actions>
            <v-card-actions class="pl-3 pb-4">
                <v-btn type="submit" color="primary">Login<v-icon right>send</v-icon></v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import Vue from 'vue';

  export default {
    beforeRouteEnter(to, from, next) {
      if (Vue.auth.check()) {
        Vue.router.push('/');
      }
      next();
    },
    data() {
      return {
        data: {
          email: '',
          password: ''
        }
      };
    },
    methods: {
      loginUser() {
        this.$auth.login({
          body: this.data,
          success: function (data) {
            let user = data.body.user;
            user.clients = data.body.clients;
            this.$auth.user(user);
            this.$store.commit('SET_USER', user);
            this.$store.commit('SET_IS_LOGGED_IN_USER', true);
          },
          rememberMe: true
        });
      }
    }
  }
</script>


<style>
  .title {
    font-size: 22px;
    font-weight: 400;
  }
</style>
