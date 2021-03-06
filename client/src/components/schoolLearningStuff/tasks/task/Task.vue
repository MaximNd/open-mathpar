<template>
  <div>
    <v-stepper v-if="task !== null && currentResults.length !== 0" v-model="exercise">
      <v-subheader class="primary--text" v-text="task.name"></v-subheader>
      <v-stepper-header>
        <template v-for="(n, index) in steps">
          <v-stepper-step
            :key="`${index}-step`"
            :step="n"
            :complete="currentResults[index].passed"
            editable
          >
            {{ $t('task.exerciseNumber', [n]) }}
          </v-stepper-step>
          <v-divider v-if="n !== steps" :key="index"></v-divider>
        </template>
      </v-stepper-header>
      <v-stepper-content
        :step="n"
        v-for="(n, index) in steps"
        :key="`${index}-content`"
      >
        <v-container fluid>
          <v-layout>
            <v-flex xs3>
              <v-card flat>
                <v-card-text>
                  <appTips
                    :exerciseId="index"
                    @tip:selected="insertTipsData('studentAnswerTextField', $event)"></appTips>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs9>
              <div :style="{ 'overflow-y': 'scroll', 'height': height }">
              <v-card class="mb-5" flat>
                <v-layout column>
                  <v-flex>
                    <v-card-text>

                      <v-card class="mb-2">
                        <v-card-actions>
                          <v-container fluid>
                            <v-layout justify-start>
                              <v-flex xs12 align-start>
                                <v-btn :color="currentResults[index].active ? 'warning' : 'primary'" @click="execute(index)" :disabled="currentResults[index].passed || taskFinished">
                                  <v-icon left>play_arrow</v-icon>
                                  {{ currentResults[index].active ? $t('utils.button.activeTask') : $t('utils.button.startTask') }}
                                </v-btn>
                                <v-btn color="info" @click="swap(index)" :disabled="!currentResults[index].active">
                                  <v-icon left>swap_horiz</v-icon>
                                  {{ $t('utils.button.swap') }}
                                </v-btn>
                                <v-btn color="success" @click="addInputBelow(index)" :disabled="!currentResults[index].active || currentResults[index].passed || taskFinished">
                                  <v-icon left>add</v-icon>
                                  {{ $t('utils.button.addOneInputBelow') }}
                                </v-btn>
                              </v-flex>
                            </v-layout>
                          </v-container>
                        </v-card-actions>
                        <v-card-text>
                          <v-card class="original">
                            <template v-if="!currentResults[index].active">
                              <v-card-text class="original-input">
                                {{ $t('task.exerciseNotStartedYet') }}
                              </v-card-text>
                            </template>
                            <template v-else-if="!currentResults[index].exerciseText.isLatex">
                              <v-card-text class="original-input">
                                <v-textarea
                                  :value="currentResults[index].exerciseText.task"
                                  :label="$t('utils.labels.exercise')"
                                  auto-grow></v-textarea>
                              </v-card-text>
                              <v-card-text class="original-output">
                                <h3>
                                  {{ $t('utils.text.output') }}
                                </h3>
                                <p>{{ currentResults[index].exerciseText.result }}</p>
                              </v-card-text>
                            </template>
                            <template v-else>
                              <v-card-text>
                                <div class="math-jax" id="latex_markup" v-html="currentResults[index].exerciseText.latex">
                                </div>
                              </v-card-text>
                            </template>
                          </v-card>

                        </v-card-text>
                      </v-card>

                      <v-card class="mb-2" v-for="(answer, index2) in currentResults[index].studentAnswers" :key="`${index2}-answer`">
                        <v-card-actions>
                          <v-container fluid>
                            <v-layout justify-start>
                              <v-flex xs12 align-start>
                                <v-btn color="primary" @click="execute(index, index2)" :disabled="currentResults[index].giveUp ? index2 !== 0 : (!currentResults[index].active || currentResults[index].passed || taskFinished)">
                                  <v-icon left>play_arrow</v-icon>
                                  {{ $t('utils.button.execute') }}
                                </v-btn>
                                <v-btn color="info" @click="swap(index, index2)" :disabled="currentResults[index].giveUp ? index2 !== 0 : (currentResults[index].passed || taskFinished || !currentResults[index].active)">
                                  <v-icon left>swap_horiz</v-icon>
                                  {{ $t('utils.button.swap') }}
                                </v-btn>
                                <v-btn color="success" @click="addInputBelow(index, index2+1)" :disabled="!currentResults[index].active || currentResults[index].passed || taskFinished">
                                  <v-icon left>add</v-icon>
                                  {{ $t('utils.button.addOneInputBelow') }}
                                </v-btn>
                                <v-btn color="error" @click="deleteInputById(index, index2)" :disabled="!currentResults[index].active || currentResults[index].passed || taskFinished">
                                  <v-icon left>close</v-icon>
                                  {{ $t('utils.button.deleteThisInput') }}
                                </v-btn>
                              </v-flex>
                            </v-layout>
                          </v-container>
                        </v-card-actions>
                        <v-card-text>
                          <v-card class="original">
                            <template v-if="!currentResults[index].studentAnswers[index2].isLatex">
                              <v-card-text class="original-input">
                                <v-textarea
                                  :label="$t('utils.labels.yourAnswer')"
                                  auto-grow
                                  :ref='`studentAnswerTextField${index2}`'
                                  :value="currentResults[index].studentAnswers[index2].task"
                                  @input="updateInput(index, index2, $event)"
                                  @blur="getCaretPosition($refs[`studentAnswerTextField${index2}`][0].$el.children[0].children[0].children[0].children[1])"
                                  @focus="lastSection.sectionId = index2"></v-textarea>
                              </v-card-text>
                              <v-card-text class="original-output">
                                <h3>{{ $t('utils.text.output') }} {{ currentResults[index].studentAnswers[index2].result }}</h3>
                              </v-card-text>
                            </template>
                            <template v-else>
                              <v-card-text>
                                <div class="math-jax" v-html="currentResults[index].studentAnswers[index2].latex">
                                </div>
                              </v-card-text>
                              <v-card-text class="graphics">
                                <appGraphics
                                  :sectionId="currentResults[index].studentAnswers[index2].sectionId"
                                  :task="currentResults[index].studentAnswers[index2].task">
                                </appGraphics>
                              </v-card-text>
                            </template>
                          </v-card>
                        </v-card-text>
                      </v-card>

                    </v-card-text>
                  </v-flex>
                </v-layout>
              </v-card>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
        <v-flex xs12>
          <v-btn
            color="primary"
            @click="prevStep(n)">
            {{ $t('utils.button.prev') }}
          </v-btn>
          <v-btn
            color="primary"
            @click="nextStep(n)">
            {{ $t('utils.button.next') }}
          </v-btn>
          <template v-if="task.isTest" >
            <v-btn
              @click="check(index)"
              :disabled="!currentResults[index].active || currentResults[index].passed || taskFinished"
              color="success">
              {{ $t('task.check') }}
            </v-btn>
            <v-btn
              @click="giveUp(index)"
              :disabled="!currentResults[index].active || currentResults[index].passed || taskFinished"
              color="warning">
              {{ $t('task.giveUp') }}
            </v-btn>
          </template>
        </v-flex>
        <v-flex xs12>
          <v-btn @click="finish" :disabled="taskFinished" color="error">
            {{ $t('task.finish') }}
          </v-btn>
        </v-flex>
      </v-stepper-content>
    </v-stepper>
  </div>
</template>


<script>
import Vue from 'vue';
import moment from 'moment';
import Tips from './tips/Tips.vue';
import Graphics from './graphics/Graphics.vue';
import { prepareTask, setCaretPosition, getCaretPosition } from '../../../../utils/utils';
// import MathJax from 'mathjax';

export default {
  data() {
    return {
      lastSection: {
        sectionId: 0,
        cursorIndex: 0
      },
      marks: {
        numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        smallLetters: [
          { number: 1, mark: 'a' }, { number: 2, mark: 'b' }, { number: 3, mark: 'c' }, { number: 4, mark: 'd' }, { number: 5, mark: 'e' }, { number: 6, mark: 'f' }, { number: 7, mark: 'g' }, { number: 8, mark: 'h' }, { number: 9, mark: 'i' },
        ],
        bigLetters: [
          { number: 0, mark: 'A' }, { number: 1, mark: 'B' }, { number: 2, mark: 'C' }, { number: 3, mark: 'D' }, { number: 4, mark: 'E' }, { number: 5, mark: 'F' }, { number: 6, mark: 'G' }, { number: 7, mark: 'H' }, { number: 8, mark: 'I' }, { number: 9, mark: 'J' },
        ],
      },
      exercise: 1,
    };
  },
  computed: {
    task() {
      return this.$store.getters.task;
    },
    taskFinished() {
      return this.$store.getters.taskFinished;
    },
    steps() {
      return this.task ? this.task.exercises.length : 10;
    },
    currentResults() {
      return this.$store.getters.currentResults;
    },
    height() {
      return this.currentResults[this.exercise - 1].studentAnswers.length > 0 ? '100vh' : '60vh';
    },
  },
  watch: {
    steps(val) {
      if (this.exercise > val) {
        this.exercise = val;
      }
    },
  },
  methods: {
    addInputBelow(exerciseId, sectionId) {
      if (!this.currentResults[exerciseId].active) return;
      if (this.currentResults[exerciseId].passed || this.taskFinished) return;
      const currentRes = this.currentResults;
      const sections = this.$store.getters.sections;
      const newSection = sections[exerciseId] + 1;
      sections[exerciseId] = newSection;
      if (currentRes[exerciseId].studentAnswers.length === 0) {
        currentRes[exerciseId].studentAnswers.push({
          task: '', latex: `<p>${this.$t('utils.data.noResultYet')}</p>`, isLatex: false, result: '', sectionId: newSection,
        });
      } else if (typeof sectionId === 'undefined' || sectionId === null) {
        currentRes[exerciseId].studentAnswers.splice(0, 0, {
          task: '', latex: `<p>${this.$t('utils.data.noResultYet')}</p>`, isLatex: false, result: '', sectionId: newSection,
        });
      } else {
        currentRes[exerciseId].studentAnswers.splice(sectionId, 0, {
          task: '', latex: `<p>${this.$t('utils.data.noResultYet')}</p>`, isLatex: false, result: '', sectionId: newSection,
        });
      }
      this.$store.commit('SET_CURRENT_RESULT', currentRes);
      this.$store.commit('SET_SECTIONS', sections);
    },
    deleteInputById(exerciseId, sectionId) {
      if (!this.currentResults[exerciseId].active) return;
      if (this.currentResults[exerciseId].passed || this.taskFinished) return;
      const currentRes = this.currentResults;

      currentRes[exerciseId].studentAnswers.splice(sectionId, 1);
      this.$store.commit('SET_CURRENT_RESULT', currentRes);
    },
    updateInput(exerciseId, sectionId, newVal) {
      if (!this.currentResults[exerciseId].active) return;
      if (this.currentResults[exerciseId].passed || this.taskFinished) return;
      const currentRes = this.currentResults;
      currentRes[exerciseId].studentAnswers[sectionId].task = newVal;

      this.$store.commit('SET_CURRENT_RESULT', currentRes);
    },
    setInactiveOldTask() {
      this.currentResults.forEach((currentResult) => {
        if (currentResult.active) currentResult.active = false;
      });
    },
    setActiveTask(exerciseId) {
      this.setInactiveOldTask();
      this.currentResults[exerciseId].active = true;
    },
    execute(exerciseId, section) {
      if (this.currentResults[exerciseId].giveUp
        ? section !== 0 : (this.currentResults[exerciseId].passed || this.taskFinished)) return;
      let task;
      let sectionId;
      if (typeof section === 'undefined' || section === null) {
        this.setActiveTask(exerciseId);
        sectionId = 0;
        task = this.currentResults[exerciseId].exerciseText.task;
      } else {
        if (this.currentResults[exerciseId].giveUp ? section !== 0 : (this.currentResults[exerciseId].passed || this.taskFinished || !this.currentResults[exerciseId].active)) return;
        task = this.currentResults[exerciseId].studentAnswers[section].task;
        sectionId = this.currentResults[exerciseId].studentAnswers[section].sectionId;
      }

      this.$store.dispatch('calc', { sectionId, task })
        .then((res) => {
          if (res.body.status === 'OK') {
            const latexArr = res.body.latex.split('\n');
            const latex = latexArr.reduce((latex, latexArrEl) => {
              if (latexArrEl !== '') {
                latex += `<div>${latexArrEl}</div>`;
              }
              return latex;
            }, '');
            if (typeof section === 'undefined' || section === null) {
              Vue.set(this.currentResults[exerciseId].exerciseText, 'latex', latex);
              Vue.set(this.currentResults[exerciseId].exerciseText, 'result', res.body.result);
              this.initializeNewTimer(exerciseId);
              if (!this.currentResults[exerciseId].exerciseText.isLatex) {
                this.swap(exerciseId, section);
              }
            } else {
              Vue.set(this.currentResults[exerciseId].studentAnswers[section], 'latex', latex);
              Vue.set(this.currentResults[exerciseId].studentAnswers[section], 'result', res.body.result);
              if (!this.currentResults[exerciseId].studentAnswers[section].isLatex) {
                this.swap(exerciseId, section);
              }
            }
          }
        });
    },
    swap(exerciseId, section) {
      if (this.currentResults[exerciseId].giveUp ? section !== 0 : (this.currentResults[exerciseId].passed || this.taskFinished || !this.currentResults[exerciseId].active)) return;
      if (typeof section === 'undefined' || section === null) {
        Vue.set(this.currentResults[exerciseId].exerciseText, 'isLatex', !this.currentResults[exerciseId].exerciseText.isLatex);
      } else {
        Vue.set(this.currentResults[exerciseId].studentAnswers[section], 'isLatex', !this.currentResults[exerciseId].studentAnswers[section].isLatex);
      }
      this.$nextTick(() => {
        window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub]);
      });
    },
    // submitForReview() {
    //   let results = this.currentResults.map(result => result.studentAnswers);
    //   this.$http.post(`task/${this.$route.params.id}/check-kr`, { results })
    //     .then(data => {
    //       const taksResult = {
    //         taskId: this.$route.params.id,
    //         mark: data.body.finalMark
    //       }
    //       console.log(taksResult);
    //       this.$http.put('student/set-mark', { taksResult });
    //     });
    // },
    finish() {
      // let finalMark = '';
      // let totalTime = { hours: 0, minutes: 0, seconds: 0 };
      // let totalDuration = moment.duration(0);
      if (this.taskFinished) return;
      this.offOldTimer();
      this.setInactiveOldTask();
      let studentResult = [];
      const taksResult = {};
      if (!this.task.isTest) {
        // If the student decides not to do the exercise, then the answer is an empty string('')
        studentResult = this.currentResults.map(result => ({
          exerciseId: result.exerciseId,
          answer: result.studentAnswers.length > 0 ? result.studentAnswers[result.studentAnswers.length - 1].result : '',
          fullAnswers: result.studentAnswers.map(({ task }) => task)
        }));
        taksResult.studentResult = studentResult;
      }
      const { mark, time } = this.currentResults.reduce((results, exerciseResult) => {
        // Calcukate total duration
        // if (exerciseResult.time.totalDuration !== 0) {
        //   totalDuration.add(exerciseResult.time.totalDuration.seconds(), 's');
        //   totalDuration.add(exerciseResult.time.totalDuration.minutes(), 'm');
        //   totalDuration.add(exerciseResult.time.totalDuration.hours(), 'h');
        // }
        let time = {};
        if (exerciseResult.time.totalDuration !== 0) {
          time = {
            exerciseId: exerciseResult.exerciseId,
            hours: exerciseResult.time.totalDuration.hours(),
            minutes: exerciseResult.time.totalDuration.minutes(),
            seconds: exerciseResult.time.totalDuration.seconds(),
          };
        } else {
          time = {
            exerciseId: exerciseResult.exerciseId,
            hours: exerciseResult.time.totalDuration,
            minutes: exerciseResult.time.totalDuration,
            seconds: exerciseResult.time.totalDuration,
          };
        }
        results.time.push(time);
        if (this.task.isTest) {
          if (exerciseResult.countTry === 0) results.mark += exerciseResult.mark;
          else if (!exerciseResult.passed && !exerciseResult.giveUp) results.mark += this.marks.smallLetters.find(el => el.number === exerciseResult.countTry).mark;
          else if (exerciseResult.passed) results.mark += exerciseResult.mark;
        }

        return { mark: results.mark, time: results.time };
      }, { mark: '', time: [] });

      taksResult.taskId = this.$route.params.id;
      taksResult.isTest = this.task.isTest;
      taksResult.mark = mark;
      taksResult.time = time;

      console.log(taksResult);
      this.$http.put('student/set-mark', { taksResult })
        .then((res) => {
          if (res.body.status === 'OK') {
            this.$store.commit('SET_TASK_FINISHED', true);
            window.onbeforeunload = undefined;
          }
        });
    },
    offOldTimer() {
      this.currentResults.forEach((currentResult, index) => {
        if (currentResult.time.isRun) {
          currentResult.time.isRun = false;
          currentResult.time.end = moment();
          const duration = moment.duration(currentResult.time.end.diff(currentResult.time.start));
          currentResult.time.totalDuration = duration;
          // currentResult.time.totalDuration.add(10, 'd');
          // const diff = currentResult.time.end.diff(currentResult.time.start);

          // console.log(`${duration.hours()}:${duration.minutes()}:${duration.seconds()}`);
          // console.log(moment(`${duration.hours()}:${duration.minutes()}:${duration.seconds()}`).format());
        }
      });
    },
    initializeNewTimer(exerciseId) {
      this.offOldTimer();
      if (this.currentResults[exerciseId].time.start === 0) {
        this.currentResults[exerciseId].time.start = moment();
      }
      this.currentResults[exerciseId].time.isRun = true;
    },
    initialize() {
      this.$store.dispatch('getTaskByIdWithOneVariant', this.$route.params.id)
        .then(({ status }) => {
          if (status !== 'success') return;
          const currentRes = [];
          const sections = [];
          for (let i = 0; i < this.steps; ++i) {
            currentRes.push({
              exerciseId: this.task.exercises[i]._id,
              exercise: i,
              active: false,
              exerciseText: {
                task: this.task.exercises[i].text,
                latex: `<p>${this.$t('utils.data.noResultYet')}</p>`,
                isLatex: false,
                result: '',
                sectionId: i,
              },
              time: {
                isRun: false,
                start: 0,
                end: 0,
                totalDuration: 0,
              },
              studentAnswers: [],
              mark: 0,
              countTry: 0,
              giveUp: false,
              passed: false,
            });
            sections.push(0);
          }
          this.$store.commit('SET_CURRENT_RESULT', currentRes);
          this.$store.commit('SET_SECTIONS', sections);
        });
    },
    check(index) {
      if (!this.currentResults[index].active || this.currentResults[index].passed || this.taskFinished) return;
      const lastIndexOfStudentAnswers = this.currentResults[index].studentAnswers.length - 1;
      const studentAnswers = this.currentResults[index].studentAnswers[lastIndexOfStudentAnswers].result;
      if (studentAnswers === '') return;
      const exerciseId = this.task.exercises[index]._id;
      this.$store.dispatch('check', { id: this.$route.params.id, exerciseId, studentAnswers })
        .then(({ body }) => {
          if (this.currentResults[index].countTry !== 9) {
            ++this.currentResults[index].countTry;
            ++this.currentResults[index].mark;
          }
          if (body.correct) {
            this.currentResults[index].passed = true;
            this.offOldTimer();
            this.setInactiveOldTask();
            this.$alertify.success('Success');
          } else {
            this.$alertify.error('Wrong');
          }
        });
    },
    giveUp(index) {
      if (!this.currentResults[index].active || this.currentResults[index].passed || this.taskFinished) return;
      const exerciseId = this.task.exercises[index]._id;
      this.$store.dispatch('giveUp', { id: this.$route.params.id, exerciseId })
        .then(({ body }) => {
          this.currentResults[index].mark = this.marks.bigLetters.find(el => el.number === this.currentResults[index].countTry).mark;
          this.addInputBelow(index);
          this.currentResults[index].studentAnswers[0].task = body.solution;
          this.currentResults[index].passed = true;
          this.currentResults[index].giveUp = true;

          this.offOldTimer();
          this.setInactiveOldTask();
        });
    },
    insertTipsData(ref, { exerciseId, dataToInsert, offset }) {
      if (this.currentResults[exerciseId].studentAnswers.length === 0) return;
      const { task } = this.currentResults[exerciseId].studentAnswers[this.lastSection.sectionId];
      const newTask = prepareTask(task, this.lastSection.cursorIndex, dataToInsert);
      this.$set(this.currentResults[exerciseId].studentAnswers[this.lastSection.sectionId], 'task', newTask);
      const input = this.$refs[`${ref}${this.lastSection.sectionId}`][0].$el.children[0].children[0].children[0].children[1];
      setCaretPosition(input, this.lastSection.cursorIndex + offset);
    },
    getCaretPosition(input) {
      this.lastSection.cursorIndex = getCaretPosition(input);
    },
    nextStep(n) {
      if (n === this.steps) {
        this.exercise = 1;
      } else {
        this.exercise = n + 1;
      }
    },
    prevStep(n) {
      if (n === 1) {
        this.exercise = this.steps;
      } else {
        this.exercise = n - 1;
      }
    },
  },
  created() {
    // this.$http.get(`task/${this.$route.params.id}`)
    //   .then(res => { this.task = res.body; });
    this.initialize();
    // this.$store.dispatch('calc');
    // console.log(window)
    // this.$http.get('task/1/check-answer/1/1');
    setInterval(() => {
      this.$nextTick(() => {
        window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub]);
      });
    }, 2000);
    setTimeout(() => {
      // start first exercise
      this.execute(0);
    }, 2000);
  },
  mounted() {
    window.onbeforeunload = function (e) {
      return true;
    };
  },
  beforeRouteUpdate(to, from, next) {
    console.log(1);
    next(false);
  },
  components: {
    appGraphics: Graphics,
    appTips: Tips
  },
};
</script>

<style scoped>
  .pos_abs {
    position: absolute;
  }
  .test {
    border: 1px solid red;
  }
</style>
