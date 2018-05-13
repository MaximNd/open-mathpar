<template>
    <v-card>
      <v-card-title class="info white--text">
        <span class="headline">Choose Plan</span>
      </v-card-title>
      <v-card-text>
        <appPlansTable ref="plansTableRef" @plan-choosed="choosePlan($event)" :subjectId="subjectId" :chooseMode="true"></appPlansTable>
      </v-card-text>
      <v-card-actions>
        <!-- <v-form @submit.prevent="choosePlan"> -->
          <v-spacer></v-spacer>
          <v-btn color="error" flat @click.native="closePlanDialog">Close</v-btn>
          <!-- <v-btn type="submit" color="success" flat @click.native="closePlanDialog">Choose</v-btn> -->
        <!-- </v-form> -->
      </v-card-actions>
    </v-card>
</template>

<script>
  import PlansTable from './../../schoolLearningStuff/Plans/PlansTable.vue';

  export default {
    props: {
      index: {
        type: Number,
        required: true
      },
      groupId: {
        type: String,
        required: true
      },
      recordId: {
        type: String,
        required: true
      },
      subjectId: {
        type: String,
        required: true
      }
    },
    methods: {
      closePlanDialog() {
        this.$emit('closed-choose-plan-dialog', this.index);
      },
      choosePlan(planId) {
        this.$http.put(`plan/${planId}/set`, { planId, recordId: this.recordId, groupId: this.groupId })
          .then(() => {
            this.$emit('plan-choosed');
          });
      },
      filter() {
        console.log('filter1', this.subjectId);
        this.$refs.plansTableRef.filterPlans();
      }
    },
    components: {
      appPlansTable: PlansTable
    }
  }
</script>

<style>

</style>
