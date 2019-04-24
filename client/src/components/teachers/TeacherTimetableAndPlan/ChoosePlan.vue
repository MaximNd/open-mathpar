<template>
    <v-card>
      <v-card-title class="info white--text">
        <span class="headline">{{ $t('teacher.timetableAndPlan.timetable.choosePlan.name') }}</span>
      </v-card-title>
      <v-card-text>
        <appPlansTable
          ref="plansTableRef"
          @plan-choosed="choosePlan($event)"
          :groupId="groupId"
          :subjectId="subjectId"
          :chooseMode="true"></appPlansTable>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="error"
          flat
          @click.native="closePlanDialog">
          {{ $t('utils.button.close') }}
        </v-btn>
      </v-card-actions>
    </v-card>
</template>

<script>
import PlansTable from '../../schoolLearningStuff/Plans/PlansTable.vue';

export default {
  props: {
    index: {
      type: Number,
      required: true,
    },
    groupId: {
      type: String,
      required: true,
    },
    recordId: {
      type: String,
      required: true,
    },
    subjectId: {
      type: String,
      required: true,
    },
  },
  methods: {
    closePlanDialog() {
      this.$emit('closed-choose-plan-dialog', this.index);
    },
    choosePlan({ planId, studentsVariants }) {
      this.$http.put(`plan/${planId}/set`, { planId, recordId: this.recordId, groupId: this.groupId, studentsVariants })
        .then(() => {
          this.$emit('plan-choosed');
        });
    },
    filter() {
      this.$refs.plansTableRef.filterPlans();
    },
  },
  components: {
    appPlansTable: PlansTable
  },
};
</script>

<style>

</style>
