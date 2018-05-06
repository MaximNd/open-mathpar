<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-card>
        <v-card-title class="primary--text title">
          <!-- Subjects -->
          Timetable
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="headers"
            :items="timetable"
            :loading="timetable.length === 0"
            :no-data-text="'Loading...'"
            hide-actions
            class="elevation-1"
          >
            <template slot="items" slot-scope="props">
              <td class="text-xs-left title">{{ props.item.subject.name }}</td>
              <td class="text-xs-right text">{{ props.item.group.name }}</td>
              <td class="clickable text-xs-right text" v-if="(typeof props.item.plan === 'undefined' || props.item.plan === '' || props.item.plan == null)">
                <v-dialog v-model="choosePlanDialog[props.index]" max-width="2000px">
                  <v-btn style="margin-right:-10px;" color="info" slot="activator">Choose Plan</v-btn>
                  <v-card>
                    <v-card-title class="error white--text">
                      <span class="headline">At the moment this functionality does not work :(</span>
                    </v-card-title>
                    <!-- <v-card-title class="success white--text">
                      <span class="headline">Create Paln</span>
                    </v-card-title>
                    <v-form @submit.prevent="createPlan(props.item.subject._id, props.item.group._id, props.item._id)">
                      <v-card-text>
                        <v-container grid-list-md>
                          <v-layout wrap>
                            <v-flex xs12>
                              <v-text-field v-model="plan.name" label="Plan name" required></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                              <v-btn @click="changeCountFieldsOfPlan(1)" block color="success">Add one field</v-btn>
                            </v-flex>
                            <v-flex xs12>
                              <v-btn v-if="countPlanCols > 0" @click="changeCountFieldsOfPlan(-1)" block color="error">Delete last field</v-btn>
                            </v-flex>
                            <v-flex v-for="(planCount, index) in countPlanCols" :key="index" xs12>
                              <v-layout>
                                <v-flex xs12 sm4>
                                  <v-select
                                    v-model="plan.timetable[index].lectionId"
                                    :items="lections"
                                    item-text="name"
                                    item-value="_id"
                                    label="Select lecture"
                                    autocomplete
                                  ></v-select>
                                </v-flex>
                                <v-flex xs12 sm4>
                                  <v-select
                                    v-model="plan.timetable[index].taskId"
                                    :items="tasks"
                                    item-text="name"
                                    item-value="_id"
                                    label="Select task"
                                    autocomplete
                                  ></v-select>
                                </v-flex>
                                <v-flex sx12 sm4>
                                  <v-dialog
                                    :ref="'planDialog'"
                                    persistent
                                    v-model="modals[index]"
                                    full-width
                                    width="290px"
                                  >
                                    <v-text-field
                                      slot="activator"
                                      label="Date"
                                      v-model="plan.timetable[index].date"
                                      prepend-icon="event"
                                      readonly
                                    ></v-text-field>
                                    <v-date-picker v-model="plan.timetable[index].date" scrollable>
                                      <v-spacer></v-spacer>
                                      <v-btn flat color="error" @click="modals.splice(index,1,false)">Cancel</v-btn>
                                      <v-btn flat color="success" @click="$refs.planDialog[index].save(plan.timetable[index].date)">OK</v-btn>
                                    </v-date-picker>
                                 </v-dialog>
                                </v-flex>
                              </v-layout>
                            </v-flex>
                          </v-layout>
                        </v-container>
                        <small>*indicates required field</small>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="error" flat @click.native="closePlanDialog(props.index)">Close</v-btn>
                        <v-btn type="submit" color="success" flat @click.native="closePlanDialog(props.index)">Save</v-btn>
                      </v-card-actions>
                    </v-form> -->
                  </v-card>
                </v-dialog>
                <v-dialog v-model="createPlanDialog[props.index]" max-width="2000px">
                  <v-btn style="margin-right:-10px;" color="success" slot="activator">Create Plan</v-btn>
                  <appCreatePlan
                    @closed-create-plan-dialog="closePlanCreateDialog($event)"
                    @plan-added="updateTeacherTimeTable"
                    :index="props.index"
                    :subjectId="props.item.subject._id"
                    :groupId="props.item.group._id"
                    :recordId="props.item._id"
                    :lections="lections"
                    :tasks="tasks"></appCreatePlan>
                </v-dialog>
              </td>
              <td v-else class="clickable text-xs-right text"><v-btn @click="showPlan(props.item.plan)" style="margin-right:7.5px;" info>{{ props.item.plan.name }}</v-btn></td>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import CreatePlan from './CreatePlan.vue';

  export default {
    data () {
      return {

        choosePlanDialog: [],
        createPlanDialog: [],
        date: null,
        menu: false,

        headers: [
          { text: 'Subject', align: 'left', value: 'subject' },
          { text: 'Grop', align: 'right', value: 'group' },
          { text: 'Plan', align: 'right', value: 'plan' }
        ]
      }
    },

    computed: {
      timetable() {
        return this.$store.getters.timetable.map(row => ({ plan: ((typeof row.planId === 'undefined') ? '' : row.planId), group: row.groupId, subject: row.subjectId, _id: row._id }));
      },
      lections() {
        return this.$store.getters.lections;
      },
      tasks() {
        return this.$store.getters.tasks;
      }
    },
    methods: {
      closePlanCreateDialog(index) {
        this.$set(this.createPlanDialog, index, false);
      },
      closePlanChooseDialog(index) {
        this.$set(this.choosePlanDialog, index, false);
      },
      showPlan(plan) {
        this.$store.commit('SET_PLAN', plan);
      },
      updateTeacherTimeTable() {
        const teacherId = { teacherId: this.$auth.user().clients.find(client => client.clientRole === 'teacher').client._id };
        this.$store.dispatch('getTeacherTimeTable', teacherId);
      }
    },
    created() {
      // for (let i = 0; i < this.createPlanDialog; ++i) {
      //   this.createPlanDialog.push(false);
      //   this.choosePlanDialog.push(false);
      // }

      const teacherId = { teacherId: this.$auth.user().clients.find(client => client.clientRole === 'teacher').client._id };

      this.$store.dispatch('getLectionsByTeacherId', teacherId);
      this.$store.dispatch('getTasksByTeacherId', teacherId);
      this.$store.dispatch('getTeacherTimeTable', teacherId);
      // this.$http.get('lection/fetch-all-lections')
      //   .then(data => { this.lections = data.body });
      // this.$http.get('task/fetch-all-tasks')
      //   .then(data => { this.tasks = data.body });
      // this.$http.get(`teacher/timetable/${this.$auth.user().clients[0].client._id}`)
      //   .then(timetable => { this.timetable = timetable.body.map(row => ({ plan: ((typeof row.planId === 'undefined') ? '' : row.planId), group: row.groupId, subject: row.subjectId, _id: row._id })) });
        // .then(timetable => { this.timetable = timetable });
    },
    components: {
      appCreatePlan: CreatePlan
    }
  }
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
