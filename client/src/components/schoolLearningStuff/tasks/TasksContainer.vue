<template>
  <v-card>
    <v-card-text>
      <appCreateTask></appCreateTask>
      <appTasksTable></appTasksTable>
    </v-card-text>
  </v-card>
</template>

<script>
  import CreateTask from './CreateTask.vue';
  import TasksTable from './TasksTable.vue';

  export default {
    components: {
      appTasksTable: TasksTable,
      appCreateTask: CreateTask
    }
  };
</script>

<style scoped>
  .title {
    font-size: 22px;
    font-weight: 400;
  }
</style>
