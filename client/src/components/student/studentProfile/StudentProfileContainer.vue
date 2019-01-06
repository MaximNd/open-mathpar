<template>
    <v-container fluid>
        <appStudentProfileData></appStudentProfileData>
    </v-container>
</template>


<script>
import StudentProfileData from './StudentProfileData.vue';

export default {
  components: {
    appStudentProfileData: StudentProfileData,
  },
};
</script>
