<template>
  <v-card>
    <v-card-text>
      <appSubjectsTable></appSubjectsTable>
    </v-card-text>
  </v-card>
</template>


<script>
  import SubjectsTable from './SubjectsTable.vue';

  export default {
    components: {
      appSubjectsTable: SubjectsTable
    }
  }
</script>

