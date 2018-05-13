<template>
  <v-layout class="mb-1" raw wrap>
    <v-flex xs12>
      <v-card>
        <v-card-text>
          <v-dialog v-model="dialog" max-width="500px">
            <v-btn color="primary" dark slot="activator">Create Group</v-btn>
            <v-card>
              <v-card-title>
                <span class="headline">New Group</span>
              </v-card-title>
              <v-form @submit.prevent="createGroup">
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm6>
                        <v-text-field v-model="group.name" label="Group name" required></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-text-field v-model="group.course" label="Course" required></v-text-field>
                      </v-flex>
                    </v-layout>
                  </v-container>
                  <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="error" flat @click.native="dialog = false">Close</v-btn>
                  <v-btn type="submit" color="success" flat @click.native="dialog = false">Save</v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data() {
      return {
        group: {
          name: '',
          course: ''
        },
        dialog: null
      };
    },
    methods: {
      createGroup() {
        this.$store.dispatch('createGroup', this.group)
          .then(() => {
            this.$alertify.success('Success');
            this.$store.dispatch('getGroupsBySchoolId', { schoolId: this.$auth.user().clients[0].client.schoolId._id });
          })
          .catch(() => {
            this.$alertify.error('Error! Try again later please.');
          });
      }
    }
  }
</script>
