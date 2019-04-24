<template>
  <v-container fluid>
    <v-layout wrap row>
      <v-flex xs12>
        <v-expansion-panel popout>
          <v-expansion-panel-content lazy class="elevation-1">
            <div slot="header" class="primary--text title">Tasks</div>
            <appTasksContainer :schoolModel="schoolModel"></appTasksContainer>
          </v-expansion-panel-content>
          <v-expansion-panel-content lazy class="elevation-1">
            <div slot="header" class="primary--text title">Lectures</div>
            <appLecturesContainer></appLecturesContainer>
          </v-expansion-panel-content>
          <v-expansion-panel-content lazy class="elevation-1">
            <div slot="header" class="primary--text title">Subjects and Themes</div>
            <appSubjectsContainer :schoolModel="schoolModel" :isSchool="isSchool"></appSubjectsContainer>
          </v-expansion-panel-content>
          <v-expansion-panel-content lazy class="elevation-1">
            <div slot="header" class="primary--text title">Plans</div>
            <appPlansContainer :schoolModel="schoolModel"></appPlansContainer>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import TasksContainer from './tasks/TasksContainer.vue';
import LecturesContainer from './Lectures/LecturesContainer.vue';
import SubjectsContainer from './Subjects/SubjectsContainer.vue';
import PlansContainer from './Plans/PlansContainer.vue';

export default {
  beforeRouteLeave(to, from, next) {
    this.$store.commit('SET_PLAN', undefined);
    this.$store.commit('SET_PLAN_IN_TABLE', undefined);
    next();
  },
  components: {
    appTasksContainer: TasksContainer,
    appLecturesContainer: LecturesContainer,
    appSubjectsContainer: SubjectsContainer,
    appPlansContainer: PlansContainer,
  },
  data () {
    return {
      schoolModel: this.$auth.user().clients[0].client.schoolModel,
      isSchool: this.$auth.user().clients[0].client.schoolModel === "School",
    }
  },
};
</script>
