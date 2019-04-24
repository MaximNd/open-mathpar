<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-card>
        <v-card-title class="primary--text title">
          <v-layout row >
            <v-flex xs12 sm6>
              {{ $t('group.name') }}: {{ group.group.name }}
            </v-flex>
          </v-layout>
        </v-card-title>
      </v-card>
      <v-card class="mt-1">
        <v-card-title class="primary--text title">
          <v-layout row justify-space-between>
            <v-flex xs12 sm6>
              {{ $t('group.AVGSRMark') }}
            </v-flex>
            <v-flex xs12 sm6 class="text-xs-right">
              {{ $t('group.AVGSRDispersion') }}
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-card-text>
          <v-layout row justify-space-between>
            <v-flex xs12 sm6>
              {{ group.groupAVGMarks.avgSR.firstNumber == null ? noDataYet : group.groupAVGMarks.avgSR.firstNumber }} |
              {{ group.groupAVGMarks.avgSR.secondNumber == null ? noDataYet : group.groupAVGMarks.avgSR.secondNumber }} |
              {{ group.groupAVGMarks.avgSR.thirdNumber == null ? noDataYet : group.groupAVGMarks.avgSR.thirdNumber }} |
              {{ group.groupAVGMarks.avgSR.fourthNumber == null ? noDataYet : group.groupAVGMarks.avgSR.fourthNumber }}
            </v-flex>
            <v-flex xs12 sm6 class="text-xs-right">
              {{ group.groupAVGDispersion.avgSR.firstNumber == null ? noDataYet : group.groupAVGDispersion.avgSR.firstNumber }} |
              {{ group.groupAVGDispersion.avgSR.secondNumber == null ? noDataYet : group.groupAVGDispersion.avgSR.secondNumber }} |
              {{ group.groupAVGDispersion.avgSR.thirdNumber == null ? noDataYet : group.groupAVGDispersion.avgSR.thirdNumber }} |
              {{ group.groupAVGDispersion.avgSR.fourthNumber == null ? noDataYet : group.groupAVGDispersion.avgSR.fourthNumber }}
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
      <v-card class="mt-1">
        <v-card-title class="primary--text title">
          <v-layout row>
            <v-flex xs12 sm6>
              {{ $t('group.AVGKRMark') }}
            </v-flex>
            <v-flex xs12 sm6 class="text-xs-right">
              {{ $t('group.AVGKRDispersion') }}
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-card-text>
          <v-layout row>
            <v-flex xs12 sm6>
              {{ group.groupAVGMarks.avgKR == null ? noDataYet : group.groupAVGMarks.avgKR }}
            </v-flex>
            <v-flex xs12 sm6 class="text-xs-right">
              {{ group.groupAVGDispersion.avgKR == null ? noDataYet : group.groupAVGDispersion.avgKR }}
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
      <v-card class="mt-1">
        <v-card-title class="primary--text title">
          {{ $t('group.students') }}
          <v-spacer></v-spacer>
          <v-text-field
            append-icon="search"
            :label="$t('utils.labels.search')"
            single-line
            hide-details
            v-model="seachStudent"
          ></v-text-field>
        </v-card-title>
        <v-data-table
          v-bind:headers="studentHeaders"
          v-bind:items="group.members[0].students"
          v-bind:search="seachStudent"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left clickable"><router-link tag="span" :to="`/profile/${props.item.user.id}`">{{ props.item.user.fullName }}</router-link></td>
            <td class="text-xs-right">
              {{ props.item.clients.find(client => client.clientRole === 'student').client.avgMarks.avgAllSR.avgAll.firstNumber == null ? noDataYet : props.item.clients.find(client => client.clientRole === 'student').client.avgMarks.avgAllSR.avgAll.firstNumber }} |
              {{ props.item.clients.find(client => client.clientRole === 'student').client.avgMarks.avgAllSR.avgAll.secondNumber == null ? noDataYet : props.item.clients.find(client => client.clientRole === 'student').client.avgMarks.avgAllSR.avgAll.secondNumber }} |
              {{ props.item.clients.find(client => client.clientRole === 'student').client.avgMarks.avgAllSR.avgAll.thirdNumber == null ? noDataYet : props.item.clients.find(client => client.clientRole === 'student').client.avgMarks.avgAllSR.avgAll.thirdNumber }} |
              {{ props.item.clients.find(client => client.clientRole === 'student').client.avgMarks.avgAllSR.avgAll.fourthNumber == null ? noDataYet : props.item.clients.find(client => client.clientRole === 'student').client.avgMarks.avgAllSR.avgAll.fourthNumber }}
            </td>
            <td class="text-xs-right">{{ props.item.clients.find(client => client.clientRole === 'student').client.avgMarks.avgAllKR || noDataYet }}</td>
            <td class="text-xs-right">
              {{ props.item.clients.find(client => client.clientRole === 'student').client.avgDispercion.allSr.firstNumber == null ? noDataYet : props.item.clients.find(client => client.clientRole === 'student').client.avgDispercion.allSr.firstNumber }} |
              {{ props.item.clients.find(client => client.clientRole === 'student').client.avgDispercion.allSr.secondNumber == null ? noDataYet : props.item.clients.find(client => client.clientRole === 'student').client.avgDispercion.allSr.secondNumber }} |
              {{ props.item.clients.find(client => client.clientRole === 'student').client.avgDispercion.allSr.thirdNumber == null ? noDataYet : props.item.clients.find(client => client.clientRole === 'student').client.avgDispercion.allSr.thirdNumber }} |
              {{ props.item.clients.find(client => client.clientRole === 'student').client.avgDispercion.allSr.fourthNumber == null ? noDataYet : props.item.clients.find(client => client.clientRole === 'student').client.avgDispercion.allSr.fourthNumber }}
            </td>
            <td class="text-xs-right">{{ props.item.clients.find(client => client.clientRole === 'student').client.avgDispercion.allKr || noDataYet }}</td>
          </template>
          <template slot="pageText" slot-scope="{ pageStart, pageStop }">
            From {{ pageStart }} to {{ pageStop }}
          </template>
        </v-data-table>
      </v-card>

      <v-card class="mt-1">
        <v-card-title class="primary--text title">
          {{ $t('group.teachers') }}
          <v-spacer></v-spacer>
          <v-text-field
            append-icon="search"
            :label="$t('utils.labels.search')"
            single-line
            hide-details
            v-model="seachTeacher"
          ></v-text-field>
        </v-card-title>
        <v-data-table
          v-bind:headers="teacherHeaders"
          v-bind:items="group.members[1].teachers"
          v-bind:search="seachTeacher"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left clickable"><router-link tag="span" :to="`/profile/${props.item.user.id}`">{{ props.item.user.fullName }}</router-link></td>
            <td class="text-xs-left">{{ props.item.user.email }}</td>
          </template>
          <template slot="pageText" slot-scope="{ pageStart, pageStop }">
            From {{ pageStart }} to {{ pageStop }}
          </template>
        </v-data-table>
      </v-card>
      <v-card class="mt-1">
        <v-card-title class="primary--text title">
          {{ $t('group.marksSR') }}
          <v-spacer></v-spacer>
          <v-select
            :items="[{text: 'Base', value: 'base'},{text: 'Full', value: 'full'},{text: 'Time', value: 'time'}]"
            v-model="srView"
            :label="$t('utils.labels.selectView')"
            single-line
            item-text="text"
            item-value="value"
          ></v-select>
          <v-spacer></v-spacer>
          <v-select
            :items="subjects"
            v-model="currentSubjectSRId"
            :label="$t('utils.labels.selectSubject')"
            single-line
            item-text="name"
            item-value="_id"
          ></v-select>
        </v-card-title>
        <v-card-title>
          <v-checkbox v-for="(task, index) in studentSRBySubject" :key="`task-${index}`"
            :label="`${task.name}`"
            v-model="selectedTasks[index].show"
          ></v-checkbox>
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="studentSRMarksHeaders"
            :items="studentSRMarksData"
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.fullName }}</td>
              <template v-for="(mark, index) in props.item.marks">
                <!-- props.item.marks[index].marks[currentIndexOfSrTries[props.index][index]-1] -->
                <td :key="`${props.item.studentId}-number-${index}`" class="text-xs-right">
                  <template v-if="props.item.marks[index].numbers.length > 0">
                    <v-select
                      :items="props.item.marks[index].numbers"
                      v-model="currentIndexOfSrTries[props.index][index]"
                      single-line
                      auto
                    ></v-select>
                  </template>
                  <template v-else>
                    No Data yet
                  </template>
                </td>
                <td v-if="srView === 'base'" :key="`${props.item.studentId}-mark-${index}`" class="text-xs-right">{{ props.item.marks[index].marks.length > 0 ? props.item.marks[index].marks[currentIndexOfSrTries[props.index][index]-1].mark : noDataYet }}</td>
                <td v-else-if="srView === 'full'" :key="`${props.item.studentId}-fourNumbers-${index}`" class="text-xs-right">
                  <template v-if="props.item.marks[index].fourthNumbers.length > 0">
                    {{ `${props.item.marks[index].fourthNumbers[currentIndexOfSrTries[props.index][index]-1].firstNumber} ${props.item.marks[index].fourthNumbers[currentIndexOfSrTries[props.index][index]-1].secondNumber.toFixed(1)}/${props.item.marks[index].fourthNumbers[currentIndexOfSrTries[props.index][index]-1].thirdNumber}  ${props.item.marks[index].fourthNumbers[currentIndexOfSrTries[props.index][index]-1].fourthNumber.toFixed(1)}` }}
                  </template>
                  <template v-else>
                    {{ noDataYet }}
                  </template>
                </td>
                <td v-else :key="`${props.item.studentId}-eachTime-${index}`" class="text-xs-right">
                  {{ props.item.marks[index].times[currentIndexOfSrTries[props.index][index]-1] }}
                </td>
                <td :key="`${props.item.studentId}-time-${index}`" class="text-xs-right">{{ typeof props.item.marks[index].totalDuration[currentIndexOfSrTries[props.index][index]-1] === 'undefined' ? noDataYet : `${props.item.marks[index].totalDuration[currentIndexOfSrTries[props.index][index]-1].hours()}:${props.item.marks[index].totalDuration[currentIndexOfSrTries[props.index][index]-1].minutes()}:${props.item.marks[index].totalDuration[currentIndexOfSrTries[props.index][index]-1].seconds()}` }}</td>
              </template>

            </template>
            <!-- <v-alert slot="no-results" :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert> -->
          </v-data-table>
        </v-card-text>
      </v-card>

      <v-card class="mt-1">
        <v-card-title class="primary--text title">
          {{ $t('group.marksKR') }}
          <v-spacer></v-spacer>
          <v-select
            :items="subjects"
            v-model="currentSubjectKRId"
            label="Select Subject"
            single-line
            multiple
            item-text="name"
            item-value="_id"
          ></v-select>
          <!-- <v-text-field
            append-icon="search"
            label="Search"
            single-line
            hide-details
            v-model="seachTeacher"
          ></v-text-field> -->
        </v-card-title>
        <v-card-title>
          <v-checkbox v-for="(task, index) in studentKRBySubject" :key="`task-${index}`"
            :label="`${task.name}`"
            v-model="selectedKRTasks[index].show"
          ></v-checkbox>
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="studentKRMarksHeaders"
            :items="studentKRMarksData"
          >
            <template slot="items" slot-scope="props">
              <td>{{ props.item.fullName }}</td>
              <template v-for="(mark, index) in props.item.marks">
                <td
                  :key="`${props.item.studentId}-mark-${index}`"
                  class="text-xs-right">
                  {{ props.item.marks[index].marks.length > 0
                    ? props.item.marks[index].marks[0].mark : noDataYet }}
                </td>
                <td
                  :key="`${props.item.studentId}-time-${index}`"
                  class="text-xs-right">
                  {{ typeof props.item.marks[index].totalDuration[0] === 'undefined'
                    ? noDataYet
                    : `${props.item.marks[index].totalDuration[0].hours()}:${props.item.marks[index].totalDuration[0].minutes()}:${props.item.marks[index].totalDuration[0].seconds()}` }}
                </td>
                <td
                  :key="`${props.item.studentId}-review-${index}`"
                  class="text-xs-right">
                  <v-btn
                    color="info"
                    @click="redirectToReviewTask(props.item.marks[index].taskId, props.item.marks[index].variant, props.item.marks[index].fullAnswers)">
                    Review
                  </v-btn>
                </td>
              </template>

            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import moment from 'moment';

export default {
  data() {
    return {
      selectedTasks: [],
      selectedKRTasks: [],
      srView: 'base',
      currentIndexOfSrTries: [],
      plans: [],
      currentSubjectSRId: undefined,
      currentSubjectKRId: undefined,
      max25chars: v => v.length <= 25 || 'Input too long!',
      tmp: '',
      seachStudent: '',
      seachTeacher: '',
      pagination: {}
    };
  },
  computed: {
    noDataYet() {
      return this.$t('utils.data.noDataYet');
    },
    studentHeaders() {
      return [
        { text: this.$t('group.FullName'), align: 'left', value: 'user.fullName' },
        { text: this.$t('group.AVGSRMark'), align: 'right' },
        { text: this.$t('group.AVGKRMark'), align: 'right' },
        { text: this.$t('group.AVGSRDispersion'), align: 'right' },
        { text: this.$t('group.AVGKRDispersion'), align: 'right' }
      ];
    },
    teacherHeaders() {
      return [
        { text: this.$t('group.FullName'), align: 'left', value: 'name' },
        { text: this.$t('group.email'), align: 'left', value: 'age' }
      ];
    },
    group() {
      return this.$store.getters.group;
    },
    subjects() {
      return this.plans.map(plan => plan.subjectId);
    },
    groupStudents() {
      return this.$store.getters.groupStudents;
    },
    studentSRBySubject() {
      if (typeof this.currentSubjectSRId === 'undefined') return undefined;
      return this.plans
        .filter(plan => plan.subjectId._id === this.currentSubjectSRId)
        .reduce((headers, plan) => headers.concat(plan.timetable.map(timetable => timetable.taskId).filter(task => task.isTest)), []);
    },
    studentKRBySubject() {
      if (typeof this.currentSubjectKRId === 'undefined' || this.currentSubjectKRId.length === 0) return undefined;
      return this.plans
        .filter(plan => this.currentSubjectKRId.indexOf(plan.subjectId._id) !== -1)
        .reduce((headers, plan) => headers.concat(plan.timetable.map(timetable => timetable.taskId).filter(task => !task.isTest)), []);
    },
    studentSRMarksHeaders() {
      if (typeof this.studentSRBySubject === 'undefined') return undefined;
      const SRHeaders = [{
        text: 'Students', align: 'left', value: false, sortable: false,
      }];
      const headers = this.studentSRBySubject.reduce((headers, task, index) => {
        if (this.checkForTaskFilter(task._id, 'selectedTasks')) return headers;
        headers.push({
          text: `(${index + 1}) №`, align: 'right', width: '20px', value: false, sortable: false,
        });
        if (this.srView === 'time') {
          headers.push({
            text: `(${index + 1}) ${task.name}`, align: 'right', value: false, sortable: false,
          });
        } else {
          headers.push({
            text: `(${index + 1}) ${task.name}`, align: 'right', width: '30px', value: false, sortable: false,
          });
        }
        headers.push({
          text: `(${index + 1}) ${this.$t('group.time')}`, align: 'right', width: '20px', value: false, sortable: false,
        });
        return headers;
      }, []);
      return SRHeaders.concat(headers);
    },
    studentKRMarksHeaders() {
      if (typeof this.studentKRBySubject === 'undefined') return undefined;
      const KRHeaders = [{
        text: 'Students', align: 'left', value: false, sortable: false,
      }];
      const headers = this.studentKRBySubject.reduce((headers, task, index) => {
        if (this.checkForTaskFilter(task._id, 'selectedKRTasks')) return headers;
        headers.push({
          text: `(${index + 1}) ${task.name}`, align: 'right', width: '30px', value: false, sortable: false,
        });
        headers.push({
          text: `(${index + 1}) ${this.$t('group.time')}`, align: 'right', width: '20px', value: false, sortable: false,
        });
        headers.push({
          text: this.$t('group.review'), align: 'center', width: '20px', value: false, sortable: false,
        });
        return headers;
      }, []);
      return KRHeaders.concat(headers);
    },
    studentSRMarksData() {
      if (typeof this.studentSRBySubject === 'undefined') return undefined;
      return this.groupStudents.map((student) => {
        const data = { studentId: student._id, fullName: student.fullName, marks: [] };
        this.studentSRBySubject.filter(SR => !this.checkForTaskFilter(SR._id, 'selectedTasks')).forEach((SR) => {
          const grades = student.clients.gradeBook
            .filter(grade => grade.taskId._id === SR._id)
            .reduce((res, grade, index) => {
              res.numbers.push(index + 1);
              res.marks.push(grade);
              res.fourthNumbers.push(this.calculateFourNumbersBySRMark(grade.mark));
              const totalDuration = moment.duration(0);
              let resTimes = '';
              grade.time.forEach((time) => {
                resTimes += `${time.hours}:${time.minutes}:${time.seconds} | `;
                totalDuration.add(time.seconds, 's');
                totalDuration.add(grade.minutes, 'm');
                totalDuration.add(grade.hours, 'h');
              });
              res.times.push(resTimes);
              res.totalDuration.push(totalDuration);
              return res;
            }, {
              numbers: [], marks: [], fourthNumbers: [], times: [], totalDuration: [],
            });
          // .reduce((res, grade) => {
          //   res.push(grade.mark);
          //   return { number: ++res.number, marks: res, fullTime: { second: 0, minutes: 0, hours: 0 } }
          // }, { number: 0, marks: [], fullTime: { second: 0, minutes: 0, hours: 0 } });
            // const numbers
          data.marks.push(grades);
        });
        return data;
      });
    },
    studentKRMarksData() {
      if (typeof this.studentKRBySubject === 'undefined') return undefined;
      return this.groupStudents.map((studentUser) => {
        const data = { studentId: studentUser._id, fullName: studentUser.fullName, marks: [] };
        this.studentKRBySubject.filter(KR => !this.checkForTaskFilter(KR._id, 'selectedKRTasks')).forEach((KR) => {
          const grades = studentUser.clients.gradeBook
            .filter(grade => grade.taskId._id === KR._id)
            .reduce((res, grade, index) => {
              res.marks.push(grade);
              const totalDuration = moment.duration(0);
              grade.time.forEach((time) => {
                totalDuration.add(time.seconds, 's');
                totalDuration.add(grade.minutes, 'm');
                totalDuration.add(grade.hours, 'h');
              });
              res.totalDuration.push(totalDuration);
              return res;
            }, { marks: [], totalDuration: [] });
          if (grades.marks.length > 0) {
            const currentStudentId = studentUser.clients.id;
            grades.taskId = grades.marks[0].taskId._id;
            grades.variant = this.plans
              .find(plan => plan.subjectId._id === grades.marks[0].taskId.subjectId._id)
              .timetable.find(({ taskId }) => taskId._id === grades.taskId)
              .studentsVariants.find(({ studentId }) => (studentId === currentStudentId)).variant;
            grades.fullAnswers = grades.marks[0].fullAnswers;
            data.marks.push(grades);
          }
        });
        return data;
      });
    },
  },
  watch: {
    studentSRMarksData() {
      if (typeof this.studentSRBySubject === 'undefined') return undefined;
      this.currentIndexOfSrTries = this.studentSRMarksData.map(mark => mark.marks.map(mark => mark.marks.length));
    },
    currentSubjectSRId() {
      this.selectedTasks = [];
      this.studentSRBySubject.forEach(SR => this.selectedTasks.push({ taskId: SR._id, show: true }));
    },
    currentSubjectKRId() {
      this.selectedKRTasks = [];
      if (typeof this.studentKRBySubject !== 'undefined') {
        this.studentKRBySubject.forEach(KR => this.selectedKRTasks.push({ taskId: KR._id, show: true }));
      }
    },
  },
  methods: {
    redirectToReviewTask(taskId, variant, fullAnswers) {
      this.$store.commit('SET_VARIANT', variant);
      this.$store.commit('SET_FULL_ANSWERS', fullAnswers);
      this.$router.push(`/task-review/${taskId}`);
    },
    calculateFourNumbersBySRMark(mark) {
      // Count of numbers(number of solved tasks)
      if (typeof mark === 'undefined') {
        return {
          firstNumber: null, secondNumber: null, thirdNumber: null, fourthNumber: null,
        };
      }
      let firstNumber = 0;
      const markNumbers = mark.match(/[1-9]/g);
      if (markNumbers) {
        firstNumber += markNumbers.length;
      }

      // Sum of numbers divided by count of numbers > 0(average number of attempts per one solved task)
      let secondNumber = 0;
      let sumOfNumbers = 0;
      let countOfNumbersMoreThenZero = 0;

      if (markNumbers) {
        countOfNumbersMoreThenZero += markNumbers.length;
        sumOfNumbers = markNumbers.reduce((sum, number) => { sum += parseInt(number); return sum; }, 0);
      }
      if (countOfNumbersMoreThenZero > 0) secondNumber = sumOfNumbers / countOfNumbersMoreThenZero;

      // Count of big letters(number of tasks the answer was viewed)
      let thirdNumber = 0;
      const markBigLetters = mark.match(/[A-J]/g);

      let countOfAllLetters = 0;

      if (markBigLetters) {
        countOfAllLetters += markBigLetters.length;
        thirdNumber += markBigLetters.length;
      }

      // Sum of all big and small letters divided by count of all letters(average number of attempts per one no solved task)
      let fourthNumber = 0;
      const lettersToNumbersSet = {
        A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7, I: 8, J: 9, a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
      };

      let sumOfAllLetters = 0;
      const markSmallLetters = mark.match(/[a-i]/g);

      if (markSmallLetters) {
        countOfAllLetters += markSmallLetters.length;
        markSmallLetters.forEach((letter) => { sumOfAllLetters += lettersToNumbersSet[letter]; });
      }

      if (countOfAllLetters > 0) fourthNumber = sumOfAllLetters / countOfAllLetters;

      return {
        firstNumber, secondNumber, thirdNumber, fourthNumber,
      };
    },
    checkForTaskFilter(taskId, selectedTasks) {
      for (let i = 0; i < this[selectedTasks].length; ++i) {
        if (this[selectedTasks][i].taskId === taskId && !this[selectedTasks][i].show) return true;
      }
      return false;
    },
  },
  created() {
    this.$http.get(`plans/group/${this.$route.params.id}`)
      .then(({ body }) => { this.plans = body; });
  },
};
</script>


<style>
  .title {
    font-size: 22px;
    font-weight: 400;
  }
  .clickable {
    cursor: pointer;
  }
</style>
