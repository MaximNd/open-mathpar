<template>
  <v-container fluid>
    <app-task></app-task>
  </v-container>
</template>

<script>
  import Task from './Task.vue';

  export default {
    components: {
      appTask: Task
    }
  };
</script>
