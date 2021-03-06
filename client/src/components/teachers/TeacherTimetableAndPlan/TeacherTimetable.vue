<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-card>
        <v-card-title class="primary--text title">
          {{ $t('teacher.timetableAndPlan.timetable.name') }}
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
              <td
                class="clickable text-xs-right text"
                v-if="(typeof props.item.plan === 'undefined'
                      || props.item.plan === ''
                      || props.item.plan == null)">
                <v-dialog persistent v-model="choosePlanDialog[props.index]" max-width="2000px">
                  <v-btn
                    @click="filter(props.index)"
                    color="info"
                    slot="activator">
                    {{ $t('teacher.timetableAndPlan.timetable.choosePlan.name') }}
                  </v-btn>
                  <appChoosePlan
                    :ref="`choosePlanRef${props.index}`"
                    @closed-choose-plan-dialog="closePlanChooseDialog($event)"
                    @plan-choosed="updateTeacherTimeTable"
                    :subjectId="props.item.subject._id"
                    :index="props.index"
                    :groupId="props.item.group._id"
                    :recordId="props.item._id"></appChoosePlan>
                </v-dialog>
                <v-dialog
                  lazy
                  persistent
                  v-model="createPlanDialog[props.index]"
                  max-width="2000px">
                  <v-btn
                    style="margin-right:-10px;"
                    color="success"
                    slot="activator">
                    {{ $t('teacher.timetableAndPlan.timetable.createPlan.name') }}
                  </v-btn>
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
              <td
                v-else
                class="clickable text-xs-right text">
                <v-btn
                  @click="showPlan(props.item.plan)"
                  color="info"
                  style="margin-right:-10px;">
                  {{ props.item.plan.name }}
                </v-btn>
              </td>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import CreatePlan from './CreatePlan.vue';
import ChoosePlan from './ChoosePlan.vue';

export default {
  data() {
    return {
      choosePlanDialog: [],
      createPlanDialog: [],
      date: null,
      menu: false
    };
  },
  computed: {
    headers() {
      return [
        { text: this.$t('teacher.timetableAndPlan.timetable.headers.subject'), align: 'left', value: 'subject' },
        { text: this.$t('teacher.timetableAndPlan.timetable.headers.group'), align: 'right', value: 'group' },
        { text: this.$t('teacher.timetableAndPlan.timetable.headers.plan'), align: 'right', value: 'plan' },
      ];
    },
    timetable() {
      return this.$store.getters.timetable.map(row => ({
        plan: ((typeof row.planId === 'undefined') ? '' : row.planId), group: row.groupId, subject: row.subjectId, _id: row._id,
      }));
    },
    lections() {
      return this.$store.getters.lections;
    },
    tasks() {
      return this.$store.getters.tasks;
    },
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
    },
    filter(index) {
      this.$refs[`choosePlanRef${index}`].filter();
    },
  },
  created() {
    const teacherId = { teacherId: this.$auth.user().clients.find(client => client.clientRole === 'teacher').client._id };

    this.$store.dispatch('getLectionsByTeacherId', teacherId);
    this.$store.dispatch('getTasksByTeacherId', teacherId);
    this.$store.dispatch('getTeacherTimeTable', teacherId);
  },
  components: {
    appCreatePlan: CreatePlan,
    appChoosePlan: ChoosePlan,
  },
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
