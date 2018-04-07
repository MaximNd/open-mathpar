<template>
  <v-container fluid>
    <appTeacherTimetable></appTeacherTimetable>
    <appTeacherPlan v-if="isShow"></appTeacherPlan>
  </v-container>
</template>

<script>
  import TeacherPlan from './TeacherPlan.vue';
  import TeacherTimetable from './TeacherTimetable.vue';

  export default {
    computed: {
      isShow() {
        return this.$store.getters.isShow;
      }
    },
    components: {
      appTeacherTimetable: TeacherTimetable,
      appTeacherPlan: TeacherPlan
    },
    beforeRouteLeave(to, from, next) {
      this.$store.commit('SET_TASKS', []);
      next();
    }
  };
</script>

<style scoped>

</style>
