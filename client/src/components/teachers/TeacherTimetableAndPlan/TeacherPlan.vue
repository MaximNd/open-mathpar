<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-card>
        <v-card-title class="primary--text title">
          <!-- Timetable -->
          Plan: {{ planName }}
        </v-card-title>
        <v-card-text>
          <v-data-table :items="timetable" hide-actions hide-headers class="elevation-1">
            <template slot="items" slot-scope="props">
              <td class="text-xs-left title">{{ props.item[0] }}</td>
              <td class="text-xs-left text clickable"
                v-if="index != 0" v-for="(i, index) in props.item"
                :key="index + '-Teacher_plan'">
                  <router-link v-if="props.item[0] === 'Tasks'" :to="`/task/${i._id}`">{{ i.name || i }}</router-link>
                  <template v-else>{{ i.name || i }}</template>
              </td>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-text>
          <v-layout row wrap justify-start>
            <v-flex>
              <v-dialog v-model="editTimetableDialog" max-width="2000px">
              <v-btn color="info" slot="activator">Edit Plan</v-btn>
              <v-card>
                <v-card-title class="primary white--text">
                  <span class="headline">Edit Plan {{ planName }}</span>
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
              <v-dialog v-model="deleteTimetableDialog" max-width="400px">
                <v-btn color="error" slot="activator">Delete Plan</v-btn>
                <v-card>
                  <v-card-title class="secondary--text">
                    <span class="headline">Delete Plan {{ planName }}?</span>
                  </v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="success" flat @click.native="deleteTimetableDialog = false">No</v-btn>
                    <v-btn color="error" flat @click.native="deleteTimetableDialog = false">Yes</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>

  </v-layout>
</template>

<script>
  export default {
    data() {
      return {
        editTimetableDialog: false,
        deleteTimetableDialog: false,
        lectures: ['fdsfsd', 'sdfsfdsfsd', 'sfdfs', 'sfdsfsd', 'fdsfsdfsd', 'sfdfsdfsd', 'sfsdfdsfsd', 'sfsdfsdfds', 'sdfsdfsdsd', 'sfdsdsdfds'],
        tasks: ['fdsfsd', 'sdfsfdsfsd', 'sfdfs', 'sfdsfsd', 'fdsfsdfsd', 'sfdfsdfsd', 'sfsdfdsfsd', 'sfsdfsdfds', 'sdfsdfsdsd', 'sfdsdsdfds'],
        date: null,
        menu: false,
        modal: false
      };
    },
    computed: {
      planName() {
        return this.$store.getters.plan.name;
      },
      timetable() {
        return this.$store.getters.plan.timetable.reduce((resultTimetable, lesson) => {
          resultTimetable[0].push(lesson.lectionId);
          resultTimetable[1].push(lesson.taskId);
          resultTimetable[2].push(new Date(lesson.date).toDateString());
          return resultTimetable;
        }, [['Lections'], ['Tasks'], ['Date']]);
      }
    }
  };
</script>

<style scoped>
  .title {
    font-size: 22px;
    font-weight: 400;
  }
  .text {
    font-size: 18px;
  }
  .clickable {
    cursor: pointer;
  }
</style>
