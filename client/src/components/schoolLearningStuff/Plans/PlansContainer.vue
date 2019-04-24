<template>
  <v-card>
    <v-card-text>
      <appCreatePlan></appCreatePlan>
      <appPlansTable :chooseMode="false" :schoolModel="schoolModel"></appPlansTable>
    </v-card-text>
  </v-card>
</template>


<script>
import CreatePlan from './CreatePlan.vue';
import PlansTable from './PlansTable.vue';

export default {
  components: {
    appCreatePlan: CreatePlan,
    appPlansTable: PlansTable,
  },
  props: ['schoolModel', 'isSchool'],
};
</script>
