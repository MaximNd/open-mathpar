<template>
  <div>
    <v-stepper v-if="task !== null && currentResults.length !== 0" v-model="exercise">
      <v-subheader class="primary--text" v-text="task.name"></v-subheader>
      <v-stepper-header>
        <template v-for="(n, index) in steps">
          <v-stepper-step
            :key="`${index}-step`"
            :step="n"
            :complete="false"
            editable
          >
            Exercise {{ n }}
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
              <v-card class="mb-5 elevation-0">
                <v-layout column>
                  <v-flex>
                    <v-card-text>

                      <v-card class="mb-2">
                        <v-card-actions>
                          <v-container fluid>
                            <v-layout justify-start>
                              <v-flex xs12 align-start>
                                <v-btn color="warning" @click="execute(index)">
                                  <v-icon left>play_arrow</v-icon>
                                  Start Task
                                </v-btn>
                                <v-btn color="info" @click="swap(index)">
                                  <v-icon left>swap_horiz</v-icon>
                                  Swap
                                </v-btn>
                                <v-btn color="success" @click="addInputBelow(index)">
                                  <v-icon left>add</v-icon>
                                  Add one input below
                                </v-btn>
                              </v-flex>
                            </v-layout>
                          </v-container>
                        </v-card-actions>
                        <v-card-text>
                          <v-card class="original">
                            <template v-if="!currentResults[index].exerciseText.isLatex">
                              <v-card-text class="original-input">
                                <v-textarea :value="currentResults[index].exerciseText.task" label="Exercise" auto-grow ></v-textarea>
                              </v-card-text>
                              <v-card-text class="original-output">
                                <h3>Output: </h3>
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
                                <v-btn color="primary" @click="execute(index, index2)">
                                  <v-icon left>play_arrow</v-icon>
                                  Execute
                                </v-btn>
                                <v-btn color="info" @click="swap(index, index2)">
                                  <v-icon left>swap_horiz</v-icon>
                                  Swap
                                </v-btn>
                                <v-btn color="success" @click="addInputBelow(index, index2+1)">
                                  <v-icon left>add</v-icon>
                                  Add one input below
                                </v-btn>
                                <v-btn color="error" @click="deleteInputById(index, index2)">
                                  <v-icon left>close</v-icon>
                                  Delete this input
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
                                  label="Your answer"
                                  auto-grow
                                  :ref='`studentAnswerTextField${index2}`'
                                  :value="currentResults[index].studentAnswers[index2].task"
                                  @input="updateInput(index, index2, $event)"
                                  @blur="getCaretPosition($refs[`studentAnswerTextField${index2}`][0].$el.children[0].children[0].children[0].children[1])"
                                  @focus="lastSection.sectionId = index2"></v-textarea>
                              </v-card-text>
                              <v-card-text class="original-output">
                                <h3>Output: {{ currentResults[index].studentAnswers[index2].result }}</h3>
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
          <v-btn color="primary" @click="prevStep(n)">Prev</v-btn>
          <v-btn color="primary" @click="nextStep(n)">Next</v-btn>
        </v-flex>
      </v-stepper-content>
    </v-stepper>
  </div>
</template>


<script>
import Vue from 'vue';
import Graphics from './graphics/Graphics.vue';
import Tips from './tips/Tips.vue';
import { prepareTask, setCaretPosition, getCaretPosition } from '../../../../utils/utils';

export default {
  data() {
    return {
      lastSection: {
        sectionId: 0,
        cursorIndex: 0,
      },
      exercise: 1
    };
  },
  computed: {
    task() {
      return this.$store.getters.task;
    },
    steps() {
      return this.task ? this.task.exercises.length : 10;
    },
    currentResults() {
      return this.$store.getters.currentResults;
    },
    fullAnswers() {
      return this.$store.getters.fullAnswers;
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
      const currentRes = this.currentResults;
      const { sections } = this.$store.getters;
      const newSection = sections[exerciseId] + 1;
      sections[exerciseId] = newSection;
      if (currentRes[exerciseId].studentAnswers.length === 0) {
        currentRes[exerciseId].studentAnswers.push({
          task: '', latex: '<p>No result yet</p>', isLatex: false, result: '', sectionId: newSection,
        });
      } else if (typeof sectionId === 'undefined' || sectionId === null) {
        currentRes[exerciseId].studentAnswers.splice(0, 0, {
          task: '', latex: '<p>No result yet</p>', isLatex: false, result: '', sectionId: newSection,
        });
      } else {
        currentRes[exerciseId].studentAnswers.splice(sectionId, 0, {
          task: '', latex: '<p>No result yet</p>', isLatex: false, result: '', sectionId: newSection,
        });
      }
      this.$store.commit('SET_CURRENT_RESULT', currentRes);
      this.$store.commit('SET_SECTIONS', sections);
    },
    deleteInputById(exerciseId, sectionId) {
      const currentRes = this.currentResults;
      currentRes[exerciseId].studentAnswers.splice(sectionId, 1);
      this.$store.commit('SET_CURRENT_RESULT', currentRes);
    },
    updateInput(exerciseId, sectionId, newVal) {
      const currentRes = this.currentResults;
      currentRes[exerciseId].studentAnswers[sectionId].task = newVal;
      this.$store.commit('SET_CURRENT_RESULT', currentRes);
    },

    execute(exerciseId, section) {
      let task;
      let sectionId;
      if (typeof section === 'undefined' || section === null) {
        sectionId = 0;
        // eslint-disable-next-line prefer-destructuring
        task = this.currentResults[exerciseId].exerciseText.task;
      } else {
        // eslint-disable-next-line prefer-destructuring
        task = this.currentResults[exerciseId].studentAnswers[section].task;
        // eslint-disable-next-line prefer-destructuring
        sectionId = this.currentResults[exerciseId].studentAnswers[section].sectionId;
      }

      this.$store.dispatch('calc', { sectionId, task })
        .then((res) => {
          if (res.body.status === 'OK') {
            const latexArr = res.body.latex.split('\n');
            // eslint-disable-next-line no-shadow
            const latex = latexArr.reduce((latex, latexArrEl) => {
              if (latexArrEl !== '') {
                return `${latex}<div>${latexArrEl}</div>`;
              }
              return latex;
            }, '');
            if (typeof section === 'undefined' || section === null) {
              Vue.set(this.currentResults[exerciseId].exerciseText, 'latex', latex);
              Vue.set(this.currentResults[exerciseId].exerciseText, 'result', res.body.result);
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
      if (typeof section === 'undefined' || section === null) {
        Vue.set(this.currentResults[exerciseId].exerciseText, 'isLatex', !this.currentResults[exerciseId].exerciseText.isLatex);
      } else {
        Vue.set(this.currentResults[exerciseId].studentAnswers[section], 'isLatex', !this.currentResults[exerciseId].studentAnswers[section].isLatex);
      }
      this.$nextTick(() => {
        window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub]);
      });
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
              exerciseText: {
                task: this.task.exercises[i].text,
                latex: '<p>No result yet</p>',
                isLatex: false,
                result: '',
                sectionId: i,
              },
              studentAnswers: [],
            });
            sections.push(0);
          }
          this.$store.commit('SET_CURRENT_RESULT', currentRes);
          this.$store.commit('SET_SECTIONS', sections);
          for (let i = 0; i < this.steps; ++i) {
            this.fullAnswers
              .find(({ exerciseId }) => (exerciseId === this.task.exercises[i]._id)).exerciseAnswers
              .forEach((fullAnswer, index) => {
                this.addInputBelow(i, index);
                this.updateInput(i, index, fullAnswer);
              });
          }
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
    this.initialize();
    setTimeout(() => {
      this.$nextTick(() => {
        window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub]);
        // start first exercise
        this.execute(0);
      });
    }, 2000);
  },
  beforeRouteUpdate(to, from, next) {
    console.log(1);
    next(false);
  },
  components: {
    appTips: Tips,
    appGraphics: Graphics,
  },
};
</script>

<style scoped>
</style>
