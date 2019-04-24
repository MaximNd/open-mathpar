<template>
  <v-dialog v-model="deleteTimetableDialog" max-width="400px">
    <v-btn color="error" slot="activator">{{ $t('teacher.timetableAndPlan.plan.deletePlan') }}</v-btn>
    <v-card>
      <v-card-title class="secondary--text">
        <span class="headline">{{ $t('teacher.timetableAndPlan.plan.deletePlan') }}: {{ planName }}?</span>
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="success"
          flat
          @click.native="deleteTimetableDialog = false">
          {{ $t('utils.button.no') }}
        </v-btn>
        <v-btn
          color="error"
          flat
          @click.native="deleteTimetableDialog = false">
          {{ $t('utils.button.yes') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    planName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      deleteTimetableDialog: false,
    };
  },
};
</script>

<style>

</style>
