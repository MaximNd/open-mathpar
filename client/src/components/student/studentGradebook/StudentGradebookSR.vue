<template>
  <v-expansion-panel popout>
    <v-expansion-panel-content v-for="(subjectData, subjectDataIndex) in subjectsData" :key="`subject-SR-${subjectData.subject.id}`" class="elevation-1">
      <div slot="header" class="secondary--text">{{ subjectData.subject.name }}</div>
      <v-card>
        <v-card-title class="headline" primary-title>
          <p>
            Teacher: <router-link :to="`/profile/${subjectData.teacher.id}`">{{ subjectData.teacher.fullName }}</router-link>
          </p>
        </v-card-title>
        <v-card-text>
          <v-card>
            <v-card-title>
              Tasks
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
            <v-data-table
              :search="search"
              :headers="headers"
              :items="subjectData.tasks"
              class="elevation-1"
            >
              <template slot="items" slot-scope="props">
                <td>{{ props.item.taskName }}</td>
                <td class="text-xs-right">
                  <template v-if="props.item.studentMarks.length > 0">
                    <v-select
                      :items="props.item.studentMarks.map((_, index) => (index + 1))"
                      v-model="currentIndexOfSrTries[subjectDataIndex][props.index]"
                      single-line
                      auto
                    ></v-select>
                  </template>
                  <template v-else>
                    No Data yet
                  </template>
                </td>
                <td class="text-xs-right">{{ props.item.studentMarks.length === 0 ? 'No data yet' : props.item.studentMarks[currentIndexOfSrTries[subjectDataIndex][props.index] - 1].mark }}</td>
                <td class="text-xs-right">{{ props.item.studentMarks.length === 0 ? 'No data yet' : `${props.item.studentMarks[currentIndexOfSrTries[subjectDataIndex][props.index] - 1].fourNumbers.firstNumber} ${props.item.studentMarks[currentIndexOfSrTries[subjectDataIndex][props.index] - 1].fourNumbers.secondNumber.toFixed(1)}/${props.item.studentMarks[currentIndexOfSrTries[subjectDataIndex][props.index] - 1].fourNumbers.thirdNumber}  ${props.item.studentMarks[currentIndexOfSrTries[subjectDataIndex][props.index] - 1].fourNumbers.fourthNumber.toFixed(1)}` }}</td>
              </template>
              <v-alert slot="no-results" :value="true" color="error" icon="warning">
                Your search for "{{ search }}" found no results.
              </v-alert>
            </v-data-table>
          </v-card>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>


<script>
export default {
  props: {
    subjectsData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      search: '',
      currentIndexOfSrTries: [],
      headers: [
        {
          text: 'Task', align: 'left', sortable: true, value: 'taskName',
        },
        {
          text: '№', align: 'right', sortable: false, value: false, width: '20px',
        },
        {
          text: 'Mark', align: 'right', sortable: false, value: 'studentMarks.mark',
        },
        {
          text: 'Four Numbers', align: 'right', sortable: false, value: 'studentMarks.fourNumbers',
        },
      ],
    };
  },
  watch: {
    subjectsData(newSubjectsData) {
      this.currentIndexOfSrTries = newSubjectsData.map(subjectData => subjectData.tasks.map(task => task.studentMarks.length));
    },
  },
  created() {

  },
};
</script>


<style>

</style>
