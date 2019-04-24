<template>
  <v-expansion-panel popout>
    <v-expansion-panel-content
      v-for="subjectData in subjectsData"
      :key="`subject-SR-${subjectData.subject.id}`"
      class="elevation-1">
      <div slot="header" class="secondary--text">{{ subjectData.subject.name }}</div>
      <v-card>
        <v-card-title class="headline" primary-title>
          <p>
            {{ $t('student.gradeBook.kr.teacher') }}: <router-link :to="`/profile/${subjectData.teacher.id}`">
              {{ subjectData.teacher.fullName }}
              </router-link>
          </p>
        </v-card-title>
        <v-card-text>
          <v-card>
            <v-card-title>
              {{ $t('student.gradeBook.kr.tasks') }}
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
                  {{ props.item.studentMarks.length === 0 ?
                     $t('utils.data.noDataYet') : props.item.studentMarks[0] }}
                </td>
                <td class="text-xs-right">
                  <v-btn
                    color="info"
                    @click="redirectToReviewTask(props.item.taskId, props.item.variant, props.item.fullAnswers)">
                    {{ $t('utils.button.review') }}
                  </v-btn>
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
      search: ''
    };
  },
  computed: {
    headers() {
      return [
        {
          text: this.$t('student.gradeBook.kr.task'), align: 'left', sortable: true, value: 'taskName',
        },
        {
          text: this.$t('student.gradeBook.kr.mark'), align: 'right', sortable: false, value: 'studentMarks',
        },
        {
          text: this.$t('student.gradeBook.kr.review'), align: 'right', sortable: false, value: '',
        }
      ];
    }
  },
  methods: {
    redirectToReviewTask(taskId, variant, fullAnswers) {
      this.$store.commit('SET_VARIANT', variant);
      this.$store.commit('SET_FULL_ANSWERS', fullAnswers);
      this.$router.push(`/task-review/${taskId}`);
    }
  }
};
</script>


<style>

</style>
