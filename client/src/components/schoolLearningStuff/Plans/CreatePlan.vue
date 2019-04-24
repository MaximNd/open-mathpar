<template>
  <v-dialog v-model="createPlanDialog" max-width="2000px">
    <v-btn style="margin-right:-10px;" color="success" slot="activator">
      {{ $t('schoolLearningStuff.plans.createPlan.name') }}
    </v-btn>
    <appCreatePlan
      @closed-create-plan-dialog="closePlanCreateDialog($event)"
      :lections="lections"
      :tasks="tasks"
      :subjects="subjects"></appCreatePlan>
  </v-dialog>
</template>


<script>
import CreatePlan from '../../teachers/TeacherTimetableAndPlan/CreatePlan.vue';

export default {
  data() {
    return {
      createPlanDialog: false,
      lections: [],
      tasks: [],
      subjects: [],
    };
  },
  methods: {
    closePlanCreateDialog() {
      this.createPlanDialog = false;
    },
  },
  created() {
    const teacherClient = this.$auth.user().clients.find(client => client.clientRole === 'teacher').client;
    const teacherId = teacherClient._id;

    this.$http.get(`tasks/teacher/${teacherId}`)
      .then((data) => { this.tasks = data.body; })
      .catch(err => console.log(err));

    this.$http.get(`lection/teacher/${teacherId}`)
      .then((data) => { this.lections = data.body; })
      .catch(err => console.log(err));

    const teacherSubjects = teacherClient.timetable.map(timetableRow => timetableRow.subjectId);
    this.subjects = teacherSubjects;
  },
  components: {
    appCreatePlan: CreatePlan,
  },
};
</script>

<style>

</style>
