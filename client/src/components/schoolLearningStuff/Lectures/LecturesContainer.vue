<template>
  <v-card>
    <v-card-text>
      <v-dialog v-model="createLectionDialog" max-width="500px">
        <v-btn color="success" dark slot="activator">Create Lecture</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline primary--text">New Lecture</span>
          </v-card-title>
          <v-form @submit.prevent="createLection">
            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field v-model="lection.name" label="Lection Name" required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      v-model="lection.text"
                      label="Lection Text"
                      multi-line
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="error" flat @click.native="createLectionDialog = false">Close</v-btn>
              <v-btn type="submit" color="success" flat @click.native="createLectionDialog = false">Save</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
      <v-btn color="info">All Lectures</v-btn>
      <v-btn color="info">All Your Lectures</v-btn>
      <appLecturesTable></appLecturesTable>
    </v-card-text>
  </v-card>
</template>

<script>
  import LecturesTable from './LecturesTable.vue';

  export default {
    data() {
      return {
        lection: {
          name: '',
          text: ''
        },
        createLectionDialog: false
      };
    },
    methods: {
      createLection() {
        this.$store.dispatch('createLection', this.lection)
          .then(() => {
            this.$alertify.success('Success');
          })
          .catch(() => {
            this.$alertify.error('Error! Try again later please.');
          });
      }
    },
    components: {
      appLecturesTable: LecturesTable
    }
  };
</script>

<style scoped>
  .title {
    font-size: 22px;
    font-weight: 400;
  }
</style>
