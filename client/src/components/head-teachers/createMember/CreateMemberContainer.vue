<template>
  <v-container fluid>
    <v-layout row justify-center>
      <v-flex xs1><appCreateStudent></appCreateStudent></v-flex>
      <v-flex xs1><appCreateTeacher></appCreateTeacher></v-flex>
    </v-layout>
  </v-container>
</template>


<script>
  import CreateStudent from './CreateStudent.vue';
  import CreateTeacher from './CreateTeacher.vue';

  export default {
    components: {
      appCreateStudent: CreateStudent,
      appCreateTeacher: CreateTeacher
    }
  };
</script>
