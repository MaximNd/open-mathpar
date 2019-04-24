<template>
  <v-container fluid>
    <appTaskReview></appTaskReview>
  </v-container>
</template>

<script>
import TaskReview from './TaskReview.vue';
import { store } from '../../../../store/store';

export default {
  components: {
    appTaskReview: TaskReview
  },
  beforeRouteLeave(to, from, next) {
    store.commit('SET_SPACE', '');
    store.commit('SET_TASK', null);
    store.commit('SET_TASK_FINISHED', false);
    store.commit('SET_CURRENT_RESULT', []);
    store.commit('SET_SECTIONS', []);
    store.commit('SET_VARIANT', 0);
    store.commit('SET_FULL_ANSWERS', []);
    // TODO reset resource
    next();
  }
};
</script>

<style>

</style>
