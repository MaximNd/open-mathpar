<template>
  <v-expansion-panel popout>
    <v-expansion-panel-content
      v-for="(subjectData, subjectDataIndex) in subjectsData"
      :key="`subject-SR-${subjectData.subject.id}`"
      class="elevation-1">
      <div slot="header" class="secondary--text">{{ subjectData.subject.name }}</div>
      <v-card>
        <v-card-title class="headline" primary-title>
          <p>
            {{ $t('student.gradeBook.sr.teacher') }}: <router-link :to="`/profile/${subjectData.teacher.id}`">
              {{ subjectData.teacher.fullName }}
            </router-link>
          </p>
        </v-card-title>
        <v-card-text>
          <v-card>
            <v-card-title>
              {{ $t('student.gradeBook.sr.tasks') }}
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                append-icon="search"
                :label="$t('utils.labels.search')"
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
                    {{ $t('utils.data.noDataYet') }}
                  </template>
                </td>
                <td class="text-xs-right">
                  {{ props.item.studentMarks.length === 0 ? $t('utils.data.noDataYet') : props.item.studentMarks[currentIndexOfSrTries[subjectDataIndex][props.index] - 1].mark }}
                </td>
                <td class="text-xs-right">
                  {{ props.item.studentMarks.length === 0 ? $t('utils.data.noDataYet') : `${props.item.studentMarks[currentIndexOfSrTries[subjectDataIndex][props.index] - 1].fourNumbers.firstNumber} ${props.item.studentMarks[currentIndexOfSrTries[subjectDataIndex][props.index] - 1].fourNumbers.secondNumber.toFixed(1)}/${props.item.studentMarks[currentIndexOfSrTries[subjectDataIndex][props.index] - 1].fourNumbers.thirdNumber}  ${props.item.studentMarks[currentIndexOfSrTries[subjectDataIndex][props.index] - 1].fourNumbers.fourthNumber.toFixed(1)}` }}
                </td>
              </template>
              <v-alert slot="no-results" :value="true" color="error" icon="warning">
                {{ $t('utils.data.noSearchResult', [search]) }}
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
      currentIndexOfSrTries: []
    };
  },
  watch: {
    subjectsData(newSubjectsData) {
      this.currentIndexOfSrTries = newSubjectsData.map(subjectData => subjectData.tasks.map(task => task.studentMarks.length));
    },
  },
  computed: {
    headers() {
      return [
        {
          text: this.$t('student.gradeBook.sr.task'), align: 'left', sortable: true, value: 'taskName',
        },
        {
          text: '№', align: 'right', sortable: false, value: false, width: '20px',
        },
        {
          text: this.$t('student.gradeBook.sr.mark'), align: 'right', sortable: false, value: 'studentMarks.mark',
        },
        {
          text: this.$t('student.gradeBook.sr.fourNumbers'), align: 'right', sortable: false, value: 'studentMarks.fourNumbers',
        },
      ];
    }
  }
};
</script>


<style>

</style>
