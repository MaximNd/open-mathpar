<template>
  <v-dialog v-model="editTimetableDialog" max-width="2000px">
    <v-btn color="info" slot="activator">{{ $t('teacher.timetableAndPlan.plan.editPlan') }}</v-btn>
    <v-card>
      <v-card-title class="primary white--text">
        <span class="headline">{{ $t('teacher.timetableAndPlan.plan.editPlan') }}: {{ planName }}</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm6 md4>
              <v-text-field label="Legal first name" required></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field label="Legal middle name" hint="example of helper text only on focus"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field label="Legal last name" hint="example of persistent helper text"
                            persistent-hint
                            required
              ></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Email" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Password" type="password" required></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
              <v-select
                label="Age"
                required
                :items="['0-17', '18-29', '30-54', '54+']"
              ></v-select>
            </v-flex>
            <v-flex xs12 sm6>
              <v-select
                label="Interests"
                multiple
                autocomplete
                chips
                :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
              ></v-select>
            </v-flex>
          </v-layout>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" flat @click.native="editTimetableDialog = false">Close</v-btn>
        <v-btn color="success" flat @click.native="editTimetableDialog = false">Save</v-btn>
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
      editTimetableDialog: false,
    };
  },
};
</script>

<style>

</style>
