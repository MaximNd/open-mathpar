<template>
    <v-container fluid>
        <appStudentSubjectsList></appStudentSubjectsList>
        <appStudentSubjectPlan></appStudentSubjectPlan>
    </v-container>
</template>


<script>
import StudentSubjectsList from './StudentSubjectsList.vue';
import StudentSubjectPlan from './StudentSubjectPlan.vue';

export default {
  components: {
    appStudentSubjectsList: StudentSubjectsList,
    appStudentSubjectPlan: StudentSubjectPlan,
  },
};
</script>


<style>

</style>
