<template>
    <v-container v-if="updated" fluid grid-list-md>
        <v-layout row wrap>
            <v-flex xs12>
                <v-container fluid>
                    <appProfileData></appProfileData>
                </v-container>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import ProfileData from './ProfileData.vue';
// import { store } from './../../store/store.js';

export default {
  data() {
    return {
      updated: true,
    };
  },
  created() {
    console.log('this.$route:', this.$route);
    this.$store.dispatch('checkIfCurrent', this.$route)
      .then((result) => {
        console.log('result:', result);
        if (!result) {
          this.$store.dispatch('getUser', this.$route);
        } else {
          this.$store.commit('SET_OTHER_USER', undefined);
        }
      });
  },
  beforeRouteUpdate(to, from, next) {
    this.$store.commit('SET_OTHER_USER', undefined);
    next();
  },
  // beforeRouteUpdate(to, from, next) {
  //   console.log('to: ', to);
  //   store.dispatch('checkIfCurrent', to)
  //     .then(result => {
  //       if (!result) {
  //         return store.dispatch('getUser', to);
  //       }
  //     })
  //     .then(() => next());
  // },
  components: {
    appProfileData: ProfileData,
  },
};
</script>

<style scoped>

</style>
