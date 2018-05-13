<template>
  <v-card>
    <v-card-text>
      <appCreatePlan></appCreatePlan>
      <appPlansTable :chooseMode="false"></appPlansTable>
    </v-card-text>
  </v-card>
</template>


<script>
  import CreatePlan from './CreatePlan.vue';
  import PlansTable from './PlansTable.vue';

  export default {
    components: {
      appCreatePlan: CreatePlan,
      appPlansTable: PlansTable
    }
  }
</script>
