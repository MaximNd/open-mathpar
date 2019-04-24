<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-card>
        <v-card-title class="primary--text title">
          {{ $t('teacher.timetableAndPlan.plan.name') }}: {{ planName }}
        </v-card-title>
        <v-card-text>
          <v-data-table :items="timetable" hide-actions hide-headers class="elevation-1">
            <template slot="items" slot-scope="props">
              <td class="text-xs-left title">{{ props.item[0] }}</td>
              <template v-for="(i, index) in props.item">
                <td class="text-xs-left text clickable"
                  v-if="index != 0"
                  :key="index + '-Teacher_plan'">
                  <router-link v-if="props.item[0] === tasks" :to="`/task/${i._id}`">
                    {{ i.name || i }}
                  </router-link>
                  <template v-else>{{ i.name || i }}</template>
                  <v-icon
                    v-if="!i.isTest && props.item[0] === tasks"
                    class="ml-1 mb-2"
                    color="error"
                    size="20">
                    fa-tasks
                  </v-icon>
                </td>
              </template>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-text>
          <v-layout row wrap justify-start>
            <v-flex>
              <template v-if="isThisTeacherPlan">
                <appEditPlan :planName="planName"></appEditPlan>
                <appDeletePlan :planName="planName"></appDeletePlan>
              </template>
              <!-- <appChoosePlan v-if="chooseMode"></appChoosePlan> -->
              <v-btn
                v-if="chooseMode"
                @click="choosePlan"
                color="info">Choose This Plan</v-btn>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>

  </v-layout>
</template>

<script>
import EditPlan from './EditPlan.vue';
import DeletePlan from './DeletePlan.vue';

export default {
  props: {
    chooseMode: {
      type: Boolean,
      required: true,
    },
    planKey: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      date: null,
      menu: false,
      modal: false,
    };
  },
  computed: {
    lections() {
      return this.$t('teacher.timetableAndPlan.plan.lections');
    },
    tasks() {
      return this.$t('teacher.timetableAndPlan.plan.tasks');
    },
    dateInPlan() {
      return this.$t('teacher.timetableAndPlan.plan.date');
    },
    isThisTeacherPlan() {
      return this.$store.getters[this.planKey].teacherId._id === this.$auth.user().clients.find(client => client.clientRole === 'teacher').client._id;
    },
    planName() {
      return this.$store.getters[this.planKey].name;
    },
    timetable() {
      return this.$store.getters[this.planKey].timetable.reduce((resultTimetable, lesson) => {
        resultTimetable[0].push(lesson.lectionId);
        resultTimetable[1].push(lesson.taskId);
        resultTimetable[2].push(new Date(lesson.date).toDateString());
        return resultTimetable;
      }, [[this.lections], [this.tasks], [this.dateInPlan]]);
    },
  },
  methods: {
    choosePlan() {
      this.$emit('clicked-choose', this.$store.getters[this.planKey]._id);
    },
  },
  components: {
    appEditPlan: EditPlan,
    appDeletePlan: DeletePlan,
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
