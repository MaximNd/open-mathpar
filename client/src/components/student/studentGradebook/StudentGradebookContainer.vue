<template>
  <v-container fluid>
    <v-layout wrap>
      <v-flex xs12>
        <v-flex xs12 class="text-xs-center"><h3 class="info--text">SR's</h3></v-flex>
        <appStudentGradebookSR :subjectsData="SRsubjectsData"></appStudentGradebookSR>
        <v-flex xs12 class="text-xs-center"><h3 class="info--text">KR's</h3></v-flex>
        <appStudentGradebookKR :subjectsData="KRsubgectsData"></appStudentGradebookKR>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import StudentGgradebookList from './StudentGgradebookList.vue';
import StudentGradebookSR from './StudentGradebookSR.vue';
import StudentGradebookKR from './StudentGradebookKR.vue';

export default {
  data() {
    return {
      studentGradebook: [],
      studentSubjects: [],
    };
  },
  computed: {
    SRsubjectsData() {
      return this.studentSubjects.map(({ subject }) => ({
        subject: { name: subject.name, id: subject.id || subject._id },
        tasks: subject.plan ? subject.plan.timetable.reduce((tasksData, timetableRow) => (timetableRow.taskId.isTest ? [...tasksData, {
          taskName: timetableRow.taskId.name,
          taskId: timetableRow.taskId._id,
          studentMarks: this.studentGradebook.reduce((marks, gradebookRow) => ((gradebookRow.taskId._id === timetableRow.taskId._id && gradebookRow.taskId.subjectId._id === subject.id) ? [...marks, {
            mark: gradebookRow.mark,
            fourNumbers: this.calculateFourNumbersBySRMark(gradebookRow.mark),
          }] : marks), []),
        }] : tasksData), []) : [],
        teacher: subject.teacher,
      }));
    },
    KRsubgectsData() {
      return this.studentSubjects.map(({ subject }) => ({
        subject: { name: subject.name, id: subject.id || subject._id },
        tasks: subject.plan ? subject.plan.timetable.reduce((tasksData, timetableRow) => (!timetableRow.taskId.isTest ? [...tasksData, {
          taskName: timetableRow.taskId.name,
          taskId: timetableRow.taskId._id,
          studentMarks: this.studentGradebook.reduce((marks, gradebookRow) => ((gradebookRow.taskId._id === timetableRow.taskId._id && gradebookRow.taskId.subjectId._id === subject.id) ? [...marks, gradebookRow.mark] : marks), []),
        }] : tasksData), []) : [],
        teacher: subject.teacher,
      }));
    },
  },
  methods: {
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
  },
  created() {
    this.$http.get(`student/${this.$auth.user().clients.find(client => client.clientRole === 'student').client._id}/gradebook`)
      .then((data) => {
        this.studentGradebook = data.body;
      });
    this.$http.get(`student/${this.$auth.user().clients.find(client => client.clientRole === 'student').client._id}/subjects`)
      .then((data) => { this.studentSubjects = data.body; });
  },
  components: {
    appStudentGradebookSR: StudentGradebookSR,
    appStudentGradebookKR: StudentGradebookKR,
  },
};
</script>


<style>

</style>
