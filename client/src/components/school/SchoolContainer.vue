<template>
  <v-container fluid>
    <v-layout wrap>
      <v-flex xs12>
        <appSchoolData></appSchoolData>
      </v-flex>
      <v-flex md12 lg6><appSchoolFilials></appSchoolFilials></v-flex>
      <v-flex md12 lg6><appSchoolTeachers></appSchoolTeachers></v-flex>
      <v-flex xs12><appSchoolStudents></appSchoolStudents></v-flex>
      <v-flex xs12><appSchoolGroups></appSchoolGroups></v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import SchoolData from './SchoolData.vue';
import SchoolFilials from './SchoolFilials.vue';
import SchoolTeachers from './SchoolTeachers.vue';
import SchoolStudents from './SchoolStudents.vue';
import SchoolGroups from './SchoolGroups.vue';

export default {
  components: {
    appSchoolData: SchoolData,
    appSchoolFilials: SchoolFilials,
    appSchoolTeachers: SchoolTeachers,
    appSchoolStudents: SchoolStudents,
    appSchoolGroups: SchoolGroups,
  },
};

</script>

<style scoped>

</style>
