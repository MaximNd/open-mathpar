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
      <router-view></router-view>
    </transition>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
  import Navbar from './components/include/navbar/Navbar.vue';
  import Footer from './components/include/footer/Footer.vue';

  export default {
    data() {
      return {
        loaded: false
      };
    },
    created() {
        this.$auth.ready(() => {
            console.log('Auth ready!');
        });
    },
    mounted() {
        // Set up $auth.ready with other arbitrary loaders (ex: language file).
        setTimeout(() => {
            this.loaded = true;
        }, 1000);
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
