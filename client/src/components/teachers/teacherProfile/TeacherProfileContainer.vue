<template>
  <v-container fluid>
    <appTeacherProfileData></appTeacherProfileData>
  </v-container>
</template>


<script>
import TeacherProfileData from './TeacherProfileData.vue';

export default {
  components: {
    appTeacherProfileData: TeacherProfileData,
  },
};
</script>
