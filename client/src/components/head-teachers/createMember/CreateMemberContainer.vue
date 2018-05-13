<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <appCreateStudent></appCreateStudent>
      </v-flex>
      <v-flex xs12 sm6>
        <appCreateTeacher></appCreateTeacher>
      </v-flex>
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
