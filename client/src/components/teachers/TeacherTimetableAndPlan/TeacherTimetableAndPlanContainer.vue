<template>
  <v-container fluid>
    <appTeacherTimetable></appTeacherTimetable>
    <appTeacherPlan v-if="isShow" :planKey="'plan'" :chooseMode="false"></appTeacherPlan>
  </v-container>
</template>

<script>
import TeacherPlan from './TeacherPlan.vue';
import TeacherTimetable from './TeacherTimetable.vue';

export default {
  computed: {
    isShow() {
      return this.$store.getters.isShow;
    },
  },
  components: {
    appTeacherTimetable: TeacherTimetable,
    appTeacherPlan: TeacherPlan,
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.$store.commit('SET_PLAN', undefined);
    });
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit('SET_TASKS', []);
    next();
  },
};
</script>

<style scoped>

</style>
