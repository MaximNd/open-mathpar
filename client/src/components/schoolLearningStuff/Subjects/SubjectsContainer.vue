<template>
  <v-card>
    <v-card-text>
      <appSubjectsTable :schoolModel="schoolModel" :isSchool="isSchool"></appSubjectsTable>
    </v-card-text>
  </v-card>
</template>


<script>
import SubjectsTable from './SubjectsTable.vue';

export default {
  components: {
    appSubjectsTable: SubjectsTable,
  },
  props: ['schoolModel', 'isSchool'],
};
</script>
