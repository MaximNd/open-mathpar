<template>
  <v-card>
    <v-card-title class="success white--text">
      <span class="headline">Create Plan</span>
    </v-card-title>
    <v-form @submit.prevent="createPlan(subjectId, groupId, recordId)">
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 :sm6="typeof subjectId === 'undefined'">
              <v-text-field v-model="plan.name" label="Plan name" required></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 v-if="typeof subjectId === 'undefined'">
              <v-select
                v-model="plan.subjectId"
                :items="subjects"
                item-text="name"
                item-value="_id"
                label="Select subject"
                autocomplete
              ></v-select>
            </v-flex>
            <v-flex xs12>
              <v-btn @click="changeCountFieldsOfPlan(1)" block color="success">Add one field</v-btn>
            </v-flex>
            <v-flex xs12>
              <v-btn v-if="countPlanCols > 0" @click="changeCountFieldsOfPlan(-1)" block color="error">Delete last field</v-btn>
            </v-flex>
            <v-flex v-for="(planCount, index) in countPlanCols" :key="index + '-PlanCol'" xs12>
              <v-layout>
                <v-flex xs12 sm4>
                  <v-select
                    v-model="plan.timetable[index].lectionId"
                    :items="filteredLectures"
                    item-text="name"
                    item-value="_id"
                    label="Select lecture"
                    autocomplete
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm4>
                  <v-select
                    v-model="plan.timetable[index].taskId"
                    :items="filteredTasks"
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
        <v-btn color="error" flat @click.native="closePlanDialog">Close</v-btn>
        <v-btn type="submit" color="success" flat @click.native="closePlanDialog">Save</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>


<script>
  export default {
    props: {
      index: {
        type: Number,
        required: false
      },
      groupsAndSubjects: {
        type: Array,
        required: false
      },
      subjectId: {
        type: String,
        required: false
      },
      groupId: {
        type: String,
        required: false
      },
      recordId: {
        type: String,
        required: false
      },
      lections: {
        type: Array,
        required: true
      },
      tasks: {
        type: Array,
        required: true
      },
      subjects: {
        type: Array,
        required: false
      }
    },
    data() {
      return {
        plan: {
          name: '',
          groupId: undefined,
          subjectId: '',
          timetable: []
        },
        modals: [],
        countPlanCols: 5
      };
    },
    watch: {
      countPlanCols(val, oldVal) {
        if (val > oldVal) {
          this.plan.timetable.push({ lectionId: '', taskId: '', date: null });
          this.modals.push(false);
        } else {
          this.plan.timetable.pop();
          this.modals.pop();
        }
      }
    },
    computed: {
      filteredTasks() {
        const subjectId = typeof this.subjectId === 'undefined' ? this.plan.subjectId : this.subjectId;
        return this.tasks.filter(task => task.subjectId === subjectId);
      },
      filteredLectures() {
        const subjectId = typeof this.subjectId === 'undefined' ? this.plan.subjectId : this.subjectId;
        return this.lections.filter(lecture => lecture.subjectId === subjectId);
      }
    },
    methods: {
      changeCountFieldsOfPlan(on) {
        if (this.countPlanCols <= 0 && on < 0) return;
        this.countPlanCols += on;
      },
      createPlan(subjectId, groupId, recordId) {
        if (typeof subjectId !== 'undefined') {
          this.plan.subjectId = subjectId;
        }
        if (typeof groupId !== 'undefined') {
          this.plan.groupId = groupId;
        }

        this.plan.schoolId = this.$auth.user().clients.find(client => client.clientRole === 'teacher').client.schoolId._id;

        this.$http.post('plan', Object.assign({}, this.plan, { recordId }))
          .then(() => {
            this.$alertify.success('Success');
            this.$emit('plan-added');
          })
          .catch(() => {
            this.$alertify.error('Error! Try again later please.');
          });
      },
      closePlanDialog(index) {
        this.$emit('closed-create-plan-dialog', this.index);
      }
    },
    created() {
      for (let i = 0; i < this.countPlanCols; ++i) {
        this.plan.timetable.push({ lectionId: '', taskId: '', date: null });
        this.modals.push(false);
      }
    }
  }
</script>

<style>

</style>
