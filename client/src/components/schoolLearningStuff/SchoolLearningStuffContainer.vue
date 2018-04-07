<template>
  <v-container fluid>
    <v-layout wrap row>
      <v-flex xs12>
        <v-expansion-panel popout>
          <v-expansion-panel-content class="elevation-1">
            <div slot="header" class="primary--text title">Tasks</div>
            <appTasksContainer></appTasksContainer>
          </v-expansion-panel-content>
          <v-expansion-panel-content class="elevation-1">
            <div slot="header" class="primary--text title">Lectures</div>
            <appLecturesContainer></appLecturesContainer>
          </v-expansion-panel-content>
          <v-expansion-panel-content class="elevation-1">
            <div slot="header" class="primary--text title">Subjects and Themes</div>
            <appSubjectsContainer></appSubjectsContainer>
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

  export default {
    components: {
      appTasksContainer: TasksContainer,
      appLecturesContainer: LecturesContainer,
      appSubjectsContainer: SubjectsContainer
    }
  };
</script>


