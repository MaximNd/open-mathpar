<template>
  <v-card>
    <v-card-text>
      <appCreateLecture></appCreateLecture>
      <v-btn color="info">All Lectures</v-btn>
      <v-btn color="info">All Your Lectures</v-btn>
      <appLecturesTable></appLecturesTable>
    </v-card-text>
  </v-card>
</template>

<script>
  import LecturesTable from './LecturesTable.vue';
  import CreateLecture from './CreateLecture.vue';

  export default {
    components: {
      appLecturesTable: LecturesTable,
      appCreateLecture: CreateLecture
    }
  };
</script>

<style scoped>
  .title {
    font-size: 22px;
    font-weight: 400;
  }
</style>
