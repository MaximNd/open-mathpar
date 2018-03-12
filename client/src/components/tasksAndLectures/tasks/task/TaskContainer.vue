<template>
  <v-container fluid>
    <app-task></app-task>
  </v-container>
</template>

<script>
  import Task from './Task.vue';
  import { store } from './../../../../store/store';

  export default {
    components: {
      appTask: Task
    },
    beforeRouteLeave(to, from, next) {
      function reset() {
        store.commit('SET_TASK', null);
        store.commit('SET_TASK_FINISHED', false);
        store.commit('SET_CURRENT_RESULT', []);
        store.commit('SET_SECTIONS', []);
      }
      if (store.getters.taskFinished) {
        reset();
        next();
      } else {
        if (confirm('You have unsaved data!')) {
          reset();
          next();
        } else {
          next(false);
        }
      }
    }
  };
</script>
