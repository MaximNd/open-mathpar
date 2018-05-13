<template>
  <v-app v-if="$auth.ready() && loaded">
    <app-navbar v-if="$auth.check()"></app-navbar>
    <transition
      appear
      enter-class=""
      enter-active-class="vivify swoopInLeft"
      leave-class=""
      leave-active-class="vivify swoopOutRight"
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

  export default {
    data() {
      return {
        loaded: false
      };
    },
    created() {
        this.$auth.ready(() => {
          this.$store.dispatch('fetchUser')
            .then(() => {
              this.loaded = true;
            })
            .catch(() => {
              this.$router.push({ name: 'login' })
              this.loaded = true;
            });
        });
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
