<template>
  <v-app v-if="$auth.ready() && loaded">
    <app-navbar v-if="$auth.check()"></app-navbar>
    <transition
      appear
      enter-class=""
      enter-active-class="vivify popInLeft"
      leave-class=""
      leave-active-class="vivify popOutRight"
      mode="out-in"
    >
      <router-view :key="$route.fullPath"></router-view>
    </transition>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
  import Navbar from './components/include/navbar/Navbar.vue';
  import Footer from './components/include/footer/Footer.vue';
  import { store } from './store/store';

  export default {
    data() {
      return {
        loaded: false
      };
    },
    created() {
        this.$auth.ready(() => {
          console.log('Auth ready!');
          console.log(this.$auth.check());
          console.log('user:', this.$auth.user());
          store.dispatch('fetchUser')
            .then(() => {
              console.log(1);
              this.loaded = true;
            })
            .catch(() => {
              this.$router.push({ name: 'login' })
              this.loaded = true;
            });
        });
    },
    mounted() {
      // Set up $auth.ready with other arbitrary loaders (ex: language file).
      console.log(0);
      // console.log(to);
    },
    components: {
      appNavbar: Navbar,
      appFooter: Footer
    }
  }

</script>

<style lang="stylus">
  @import './stylus/main'
  @import './stylus/theme'
</style>
