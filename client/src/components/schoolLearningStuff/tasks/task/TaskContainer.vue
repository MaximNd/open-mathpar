<template>
  <v-container fluid>
    <app-task v-if="$auth.user().role.indexOf('teacher') === -1"></app-task>
    <app-teacher-task v-else></app-teacher-task>
  </v-container>
</template>

<script>
import Task from './Task.vue';
import TeacherTask from './TeacherTask.vue';
import { store } from '../../../../store/store';

export default {
  components: {
    appTask: Task,
    appTeacherTask: TeacherTask
  },
  beforeRouteLeave(to, from, next) {
    function reset() {
      store.commit('SET_SPACE', '');
      store.commit('SET_TASK', null);
      store.commit('SET_TASK_FINISHED', false);
      store.commit('SET_CURRENT_RESULT', []);
      store.commit('SET_SECTIONS', []);
      store.commit('SET_VARIANT', 0);
      store.commit('SET_FULL_ANSWERS', []);
      // TODO reset resource
    }
    if (store.getters.taskFinished) {
      reset();
      next();
      // eslint-disable-next-line
    } else if (confirm('You have unsaved data!')) {
      reset();
      next();
    } else {
      next(false);
    }
    next();
  },
};
</script>
