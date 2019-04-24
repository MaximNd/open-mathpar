<template>
  <v-card class="mt-2">
    <v-card-text>
      <v-card class="elevation-1">
        <v-card-title>
          <p class="headline primary--text">
            {{ $t('schoolLearningStuff.tasks.tasksTable.filters.name') }}
          </p>
        </v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-layout row justify-space-between wrap>
              <v-flex xs3>
                <v-select
                  :items="filterThisSchool"
                  item-text="text"
                  item-value="value"
                  v-model="filterData.thisSchool"
                  single-line
                ></v-select>
              </v-flex>
              <v-flex xs4>
                <v-select
                  :items="filterData.fetchTypes"
                  v-model="filterData.fetchType"
                  :label="$t('utils.labels.selectType')"
                  single-line
                ></v-select>
              </v-flex>
              <v-flex xs4>
                <v-select
                  :items="['Eazy', 'Middle', 'Hard']"
                  v-model="filterData.difficultyLevel"
                  :label="$t('utils.labels.selectDifficultyLevel')"
                  single-line
                ></v-select>
              </v-flex>
              <v-flex xs3>
                <v-select
                  :items="filterData.subjects"
                  v-model="filterData.subjectId"
                  item-text="name"
                  item-value="_id"
                  :label="$t('utils.labels.selectSubject')"
                  single-line
                ></v-select>
              </v-flex>
              <v-flex xs4>
                <v-select
                  :items="[1,2,3,4,5,6,7,8,9,10,11,12]"
                  v-model="filterData.classNumber"
                  :label="$t('utils.labels.selectClass')"
                  single-line
                ></v-select>
              </v-flex>
              <v-flex xs4>
                <v-select
                  :items="filterData.themes"
                  v-model="filterData.themeId"
                  item-text="name"
                  item-value="_id"
                  :label="$t('utils.labels.selectTheme')"
                  single-line
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-text>
          <v-layout justify-end>
            <v-btn color="primary" @click="filter">
              {{ $t('utils.button.filterTasks') }}
            </v-btn>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-card-text>
    <v-card-title class="title info--text">
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        :label="$t('utils.labels.search')"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
    </v-card-title>

    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="tasks"
        :search="search"
      >
        <template slot="items" slot-scope="props">
          <td class="text-xs-left">{{ props.item.order }}</td>
          <td class="text-xs-left clickable">
            <router-link :to="`/task/${props.item._id}`" tag="span">
              {{ props.item.name }}
            </router-link>
          </td>
          <td class="text-xs-right">{{ props.item.class }}</td>
          <td class="text-xs-right">{{ props.item.difficultyLevel }}</td>
          <td class="text-xs-right">{{ props.item.subjectId.name }}</td>
          <td class="text-xs-left">{{ props.item.theme.order }}</td>
          <td class="text-xs-left">{{ props.item.theme.name }}</td>
          <td class="text-xs-right">{{ props.item.isTest ? 'SR' : 'KR' }}</td>
          <td class="text-xs-right clickable">
            <router-link :to="`/profile/${props.item.teacherId.userId._id}`" tag="span">
              {{ props.item.teacherId.userId.fullName }}
            </router-link>
          </td>
          <td class="text-xs-right clickable">
            <router-link :to="`/school/${props.item.teacherId.schoolId._id}`" tag="span">
              {{ `№${props.item.teacherId.schoolId.number} ${props.item.teacherId.schoolId.name}` }}
            </router-link>
          </td>
        </template>
        <template slot="pageText" slot-scope="{ pageStart, pageStop }">
          From {{ pageStart }} to {{ pageStop }}
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      filterData: {
        thisSchool: true,
        fetchTypes: ['allTasks', 'allSR', 'allKR', 'allYourTasks', 'allYourSR', 'allYourKR'],
        fetchType: undefined,
        classNumber: undefined,
        subjects: [],
        subjectId: undefined,
        themes: [],
        themeId: undefined,
        difficultyLevel: undefined,
      },
      max25chars: v => v.length <= 25 || 'Input too long!',
      tmp: '',
      search: '',
      pagination: {}
    };
  },
  computed: {
    tasks() {
      return this.$store.getters.tasks;
    },
    filterThisSchool() {
      return [
        { text: this.$t('schoolLearningStuff.tasks.tasksTable.filters.' + (this.schoolModel === 'School' ? 'findInThisSchool' : 'findInThisUniversity')), value: true },
        { text: this.$t('schoolLearningStuff.tasks.tasksTable.filters.' + (this.schoolModel === 'School' ? 'findInAllSchools' : 'findInAllUniversities')), value: false }
      ];
    },
    headers() {
      return [
        {
          text: this.$t('schoolLearningStuff.tasks.tasksTable.headers.taskNumber'), align: 'left', value: 'order', sortable: false, width: '20px',
        },
        {
          text: this.$t('schoolLearningStuff.tasks.tasksTable.headers.task'), align: 'left', value: 'name', sortable: false,
        },
        {
          text: this.$t('schoolLearningStuff.tasks.tasksTable.headers.class'), align: 'right', value: 'class', sortable: false,
        },
        {
          text: this.$t('schoolLearningStuff.tasks.tasksTable.headers.difficultyLevel'), align: 'right', value: 'difficultyLevel', sortable: false,
        },
        {
          text: this.$t('schoolLearningStuff.tasks.tasksTable.headers.subject'), align: 'right', value: 'subjectId.name', sortable: false,
        },
        {
          text: this.$t('schoolLearningStuff.tasks.tasksTable.headers.themeNumber'), align: 'left', value: 'theme.order', sortable: false, width: '20px',
        },
        {
          text: this.$t('schoolLearningStuff.tasks.tasksTable.headers.theme'), align: 'left', value: 'theme.name', sortable: false,
        },
        {
          text: this.$t('schoolLearningStuff.tasks.tasksTable.headers.type'), align: 'right', value: 'isTest', sortable: false,
        },
        {
          text: this.$t('schoolLearningStuff.tasks.tasksTable.headers.teacher'), align: 'right', value: 'teacherId.userId.fullName', sortable: false,
        },
        {
          text: this.$t('schoolLearningStuff.tasks.tasksTable.headers.' + (this.schoolModel === 'School' ? 'school' : 'university')), align: 'right', value: 'teacherId.schoolId.name', sortable: false,
        }
      ];
    }
  },
  watch: {
    'filterData.subjectId': function (newSubjectId) {
      let allThemes = this.filterData.subjects.find(subject => subject._id === newSubjectId).themes;
      if (typeof this.filterData.classNumber !== 'undefined') {
        allThemes = allThemes.filter(theme => theme.class === this.filterData.classNumber);
      }
      this.filterData.themes = allThemes;
    },
    'filterData.classNumber': function (newClassNumber) {
      if (typeof this.filterData.subjectId !== 'undefined') {
        this.filterData.themes = this.filterData.subjects.find(subject => subject._id === this.filterData.subjectId).themes.filter(theme => theme.class === newClassNumber);
      }
    },
  },
  methods: {
    filter() {
      const filter = {};
      if (this.filterData.thisSchool) {
        filter.schoolId = this.$auth.user().clients.find(client => client.clientRole !== 'admin').client.schoolId._id;
      } else {
        filter.schoolId = undefined;
      }
      if (this.filterData.fetchType && (this.filterData.fetchType === 'allYourTasks' || this.filterData.fetchType === 'allYourSR' || this.filterData.fetchType === 'allYourKR')) {
        filter.teacherId = this.$auth.user().clients.find(client => client.clientRole === 'teacher').client._id;
      }
      filter.fetchType = this.filterData.fetchType;
      filter.classNumber = this.filterData.classNumber;
      filter.subjectId = this.filterData.subjectId;
      filter.themeId = this.filterData.themeId;
      filter.difficultyLevel = this.filterData.difficultyLevel;
      this.$store.dispatch('getFilteredTasks', filter);
    },
  },
  created() {
    this.$http.get('subjects')
      .then(({ body }) => {
        this.filterData.subjects = body;
        this.filter();
      });
  },
  props: ['schoolModel'],
};
</script>


<style scoped>
  .title {
    font-size: 22px;
    font-weight: 400;
  }
  .clickable {
    cursor: pointer;
  }
</style>
