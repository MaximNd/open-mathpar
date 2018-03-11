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
              <v-card class="elevation-0">
                <v-card-text>
                  <v-expansion-panel>
                    <v-expansion-panel-content v-for="(item, itemIndx) in tips" :key="itemIndx">
                      <div slot="header">{{ item.title }}</div>
                      <v-card>
                        <v-card-text>
                          <template v-for="(subItem, subItemIndx) in item.items">
                            <template v-if="!subItem.items">
                              <v-chip class="mb-3" :key="subItemIndx">
                                <span>{{ subItem.title }}</span>
                              </v-chip>
                            </template>
                            <template v-else>
                              <v-expansion-panel :key="subItemIndx">
                                <v-expansion-panel-content>
                                  <div slot="header">{{ subItem.title }}</div>
                                  <template v-for="(subItem2, subItemIndx2) in subItem.items">
                                    <v-chip :class="{ 'mb-3': true, 'ml-4': subItemIndx2 === 0, 'mr-4': subItemIndx2 === subItem.items.length-1 }" :key="subItemIndx2">
                                      <span>{{ subItem2.title }}</span>
                                    </v-chip>
                                  </template>
                                </v-expansion-panel-content>
                              </v-expansion-panel>
                            </template>
                          </template>
                        </v-card-text>
                      </v-card>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
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
                                <v-btn color="primary" @click="execute(index)">
                                  <v-icon left>play_arrow</v-icon>
                                  Execute
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
                                <v-text-field :value="currentResults[index].exerciseText.task" label="Exercise" multi-line auto-grow ></v-text-field>
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
                                <v-text-field :value="currentResults[index].studentAnswers[index2].task" @input="updateInput(index, index2, $event)" label="Your answer" multi-line auto-grow ></v-text-field>
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
          <template v-if="task.isTest" >
            <v-btn @click="check(index)" :disabled="currentResults[index].passed" color="success">Check</v-btn>
            <v-btn @click="giveUp(index)" :disabled="currentResults[index].passed" color="warning">Give up</v-btn>
          </template>
        </v-flex>
        <v-flex xs12>
          <v-btn @click="finish" color="error">Finish</v-btn>
          <!-- <v-btn v-else @click="submitForReview" color="error">Submit for review</v-btn> -->
        </v-flex>
      </v-stepper-content>
    </v-stepper>
  </div>
</template>


<script>
  import Vue from 'vue';
  // import MathJax from 'mathjax';

  export default {
    data () {
      return {
        tips: [
          {
            title: 'Space',
            items: [
              { title: '$\\mathbb{Z}$', dataInsert: 'SPACE = Z[];' },
              { title: '$\\mathbb{Z}p$', dataInsert: 'SPACE = Zp[];' },
              { title: '$\\mathbb{Z}p32$', dataInsert: 'SPACE = Zp32[];' },
              { title: '$\\mathbb{Z}64$', dataInsert: 'SPACE = Z64[];' },
              { title: '$\\mathbb{Q}$', dataInsert: 'SPACE = Q[];' },
              { title: '$\\mathbb{R}$', dataInsert: 'SPACE = R[];' },
              { title: '$\\mathbb{R}64$', dataInsert: 'SPACE = R64[];' },
              { title: '$\\mathbb{R}128$', dataInsert: 'SPACE = R128[];' },
              { title: '$\\mathbb{C}$', dataInsert: 'SPACE = C[];' },
              { title: '$\\mathbb{C}64$', dataInsert: 'SPACE = C64[];' },
              { title: '$\\mathbb{C}128$', dataInsert: 'SPACE = C128[];' },
              { title: '$\\mathbb{CZ}$', dataInsert: 'SPACE = CZ[];' },
              { title: '$\\mathbb{CZ}p$', dataInsert: 'SPACE = CZp[];' },
              { title: '$\\mathbb{CZ}p32$', dataInsert: 'SPACE = CZp32[];' },
              { title: '$\\mathbb{CZ}64$', dataInsert: 'SPACE = CZ64[];' },
              { title: '$\\mathbb{CQ}$', dataInsert: 'SPACE = CQ[];' },
              { title: 'Constants',
                items: [
                  { title: 'FLOATPOS', dataInsert: 'FLOATPOS = ;' },
                  { title: 'MachineEpsilonR64', dataInsert: 'MachineEpsilonR64 = ;' },
                  { title: 'MachineEpsilonR', dataInsert: 'MachineEpsilonR = ;' },
                  { title: 'MachineEpsilonR/Accuracy', dataInsert: 'MachineEpsilonR = / ;' },
                  { title: 'MOD', dataInsert: 'MOD = ;' },
                  { title: 'MOD32', dataInsert: 'MOD32 = ;' },
                  { title: 'RADIAN', dataInsert: 'RADIAN = ;' },
                  { title: 'STEPBYSTEP', dataInsert: 'STEPBYSTEP = ;' },
                  { title: 'EXPAND', dataInsert: 'EXPAND = ;' },
                  { title: 'SUBSTITUTION', dataInsert: 'SUBSTITUTION = ;' },
                  { title: 'TIMEOUT', dataInsert: 'TIMEOUT = ;' }
                ]
              }
            ]
          },
          {
            title: 'Symbols',
            items: [
              { title: 'Numbers, sets, intequality',
                items: [
                  { title: '$i$', dataInsert: '\\i' },
                  { title: '$e$', dataInsert: '\\e' },
                  { title: '$\\pi$', dataInsert: '\\pi' },
                  { title: '$\\infty$', dataInsert: '\\infty' },
                  { title: '$\\emptyset$', dataInsert: '\\emptyset' },
                  { title: '$\\cup$', dataInsert: '\\cup' },
                  { title: '$\\setminus$', dataInsert: '\\setminus' },
                  { title: '$\\triangle$', dataInsert: '\\triangle' },
                  { title: '$\'$', dataInsert: '\'' },
                  { title: '$\\cap$', dataInsert: '\\cap' },
                  { title: '$(a,b)$', dataInsert: '\\(,\\)' },
                  { title: '$[a,b]$', dataInsert: '\\[,\\]' },
                  { title: '$(a,b]$', dataInsert: '\\(,\\]' },
                  { title: '$[a,b)$', dataInsert: '\\[,\\)' },
                  { title: '$\\ge$', dataInsert: '\\ge' },
                  { title: '$\\ne$', dataInsert: '\\ne' },
                  { title: '$=$', dataInsert: '==' },
                  { title: '$\\le$', dataInsert: '\\le' },
                  { title: '$\\lor$', dataInsert: '\\lor' },
                  { title: '$\\&$', dataInsert: '\\&' },
                  { title: '$\\neg$', dataInsert: '\\neg' }
                ]
              },
              {
                title: 'Other symbols',
                items: [
                  { title: '$\\circ$', dataInsert: '\\circ' },
                  { title: '$\\partial$', dataInsert: '\\partial' },
                  { title: '$\\nabla$', dataInsert: '\\nabla' },
                  { title: '$\\hbar$', dataInsert: '\\hbar' },
                  { title: '$\\to$', dataInsert: '\\to' },
                  { title: '$\\perp$', dataInsert: '\\perp' },
                  { title: '$\\parallel$', dataInsert: '\\parallel' },
                  { title: '$\\angle$', dataInsert: '\\angle' },
                  { title: '$\\smile$', dataInsert: '\\smile' },
                  { title: '$\\equiv$', dataInsert: '\\equiv' },
                  { title: '$\\square$', dataInsert: '\\square' },
                  { title: '$\\blacksquare$', dataInsert: '\\blacksquare' },
                  { title: '$\\approx$', dataInsert: '\\approx' },
                  { title: '$\\sim$', dataInsert: '\\sim' },
                  { title: '$\\in$', dataInsert: '\\in' },
                  { title: '$\\notin$', dataInsert: '\\notin' },
                  { title: '$\\owns$', dataInsert: '\\owns' },
                  { title: '$\\subset$', dataInsert: '\\subset' },
                  { title: '$\\subseteq$', dataInsert: '\\subseteq' },
                  { title: '$\\supset$', dataInsert: '\\supset' },
                  { title: '$\\supseteq$', dataInsert: '\\supseteq' },
                  { title: '$\\exists$', dataInsert: '\\exists' },
                  { title: '$\\nexists$', dataInsert: '\\nexists' },
                  { title: '$\\forall$', dataInsert: '\\forall' },
                  { title: '$\\neg$', dataInsert: '\\neg' },
                  { title: '$\\vee$', dataInsert: '\\vee' },
                  { title: '$\\wedge$', dataInsert: '\\wedge' },
                  { title: '$\\oplus$', dataInsert: '\\oplus' },
                  { title: '$\\otimes$', dataInsert: '\\otimes' },
                  { title: '$\\hat a$', dataInsert: '\\hat' },
                  { title: '$\\bar a$', dataInsert: '\\bar' },
                  { title: '$\\tilde a$', dataInsert: '\\tilde' },
                  { title: '$\\vec a$', dataInsert: '\\vec ' },
                  { title: '$\\dot a$', dataInsert: '\\dot ' },
                  { title: '$\\ddot a$', dataInsert: '\\ddot' },
                  { title: '$\\widetilde{az}$', dataInsert: '\\widetilde{}' },
                  { title: '$\\widehat{az}$', dataInsert: '\\widehat{}' },
                  { title: '$\\overline{az}$', dataInsert: '\\overline{}' },
                  { title: '$\\overrightarrow{az}$', dataInsert: '\\overrightarrow{}' },
                  { title: '$\\underbrace{az}$', dataInsert: '\\underbrace{}' },
                  { title: '$\\overbrace{az}$', dataInsert: '\\overbrace{}' },
                  { title: '$\\frac{a}{b}$', dataInsert: '\\frac{}{}' },
                  { title: '$\\{$', dataInsert: '\\system(,)' },
                  { title: '$[$', dataInsert: '\\systemOR(,)' }
                ]
              }
            ]
          }
        ],
        marks: {
          numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          smallLetters: [
            {number: 1, mark: 'a'}, {number: 2, mark: 'b'}, {number: 3, mark: 'c'}, {number: 4, mark: 'd'}, {number: 5, mark: 'e'}, {number: 6, mark: 'f'}, {number: 7, mark: 'g'}, {number: 8, mark: 'h'}, {number: 9, mark: 'i'}
          ],
          bigLetters: [
            {number: 0, mark: 'A'}, {number: 1, mark: 'B'}, {number: 2, mark: 'C'}, {number: 3, mark: 'D'}, {number: 4, mark: 'E'}, {number: 5, mark: 'F'}, {number: 6, mark: 'G'}, {number: 7, mark: 'H'}, {number: 8, mark: 'I'}, {number: 9, mark: 'J'}
          ]
        },
        exercise: 1
      }
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
      height() {
        return this.currentResults[this.exercise - 1].studentAnswers.length > 0 ? '100vh' : '60vh';
      }
    },
    watch: {
      steps (val) {
        if (this.exercise > val) {
          this.exercise = val
        }
      }
    },
    methods: {
      addInputBelow(exerciseId, sectionId) {
        let currentRes = this.currentResults;
        let sections = this.$store.getters.sections;
        const newSection = sections[exerciseId] + 1;
        sections[exerciseId] = newSection;
        if (currentRes[exerciseId].studentAnswers.length === 0) {
            currentRes[exerciseId].studentAnswers.push({ task: '', latex: '<p>No result yet</p>', isLatex: false, result: '', sectionId: newSection });
        } else if (typeof sectionId === 'undefined' || sectionId === null) {
          currentRes[exerciseId].studentAnswers.splice(0, 0, { task: '', latex: '<p>No result yet</p>', isLatex: false, result: '', sectionId: newSection });
        } else {
          currentRes[exerciseId].studentAnswers.splice(sectionId, 0, { task: '', latex: '<p>No result yet</p>', isLatex: false, result: '', sectionId: newSection });
        }
        this.$store.commit('SET_CURRENT_RESULT', currentRes);
        this.$store.commit('SET_SECTIONS', sections);
      },
      deleteInputById(exerciseId, sectionId) {
        let currentRes = this.currentResults;

        currentRes[exerciseId].studentAnswers.splice(sectionId, 1);
        this.$store.commit('SET_CURRENT_RESULT', currentRes);
      },
      updateInput(exerciseId, sectionId, newVal) {
        let currentRes = this.currentResults;
        currentRes[exerciseId].studentAnswers[sectionId].task = newVal;

        this.$store.commit('SET_CURRENT_RESULT', currentRes);
      },
      execute(exerciseId, section) {
        let task;
        let sectionId;
        if (typeof section === 'undefined' || section === null) {
          sectionId = 0;
          task = this.currentResults[exerciseId].exerciseText.task;
        } else {
          task = this.currentResults[exerciseId].studentAnswers[section].task;
          sectionId = this.currentResults[exerciseId].studentAnswers[section].sectionId;
        }

        this.$store.dispatch('calc', { sectionId, task })
          .then(res => {
            if (res.body.status === 'OK') {
              let latexArr = res.body.latex.split('\n');
              const latex = latexArr.reduce((latex, latexArrEl) => {
                if (latexArrEl !== '') {
                  latex += `<div>${latexArrEl}</div>`;
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
        this.$nextTick(function() {
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
        let finalMark = '';
        finalMark = this.currentResults.reduce((mark, exerciseResult) => {
          if (exerciseResult.countTry === 0) return (mark + exerciseResult.mark);
          if (!exerciseResult.passed && !exerciseResult.giveUp) return (mark + this.marks.smallLetters.find(el => el.number === exerciseResult.countTry).mark);
          if (exerciseResult.passed) return (mark + exerciseResult.mark);
        }, finalMark);
        const taksResult = {
          taskId: this.$route.params.id,
          mark: finalMark
        }
        console.log(taksResult);
        // this.$http.put('student/set-mark', { taksResult });
      },
      initialize() {
        this.$store.dispatch('getTaskById', this.$route.params.id)
          .then(res => {
            let currentRes = [];
            let sections = [];
            for (let i = 0; i < this.steps; ++i) {
              currentRes.push({
                exercise: i,
                exerciseText: {
                  task: this.task.exercises[i].text,
                  latex: '<p>No result yet</p>',
                  isLatex: false,
                  result: '',
                  sectionId: i
                },
                studentAnswers: [],
                mark: 0,
                countTry: 0,
                giveUp: false,
                passed: false
              });
              sections.push(0);
            }
            this.$store.commit('SET_CURRENT_RESULT', currentRes);
            this.$store.commit('SET_SECTIONS', sections);
          });
      },
      check(exercise) {
        if (this.currentResults[exercise].passed) return;
        const lastIndexOfStudentAnswers = this.currentResults[exercise].studentAnswers.length - 1;
        const studentAnswers = this.currentResults[exercise].studentAnswers[lastIndexOfStudentAnswers].result;
        if (studentAnswers === '') return;
        this.$store.dispatch('check', { id: this.$route.params.id, exercise, studentAnswers })
          .then(({ body }) => {
            if (this.currentResults[exercise].countTry !== 9) {
              ++this.currentResults[exercise].countTry;
              ++this.currentResults[exercise].mark;
            }
            if (body.correct) {
              this.currentResults[exercise].passed = true;
            }
          });
      },
      giveUp(exercise) {
        if (this.currentResults[exercise].passed) return;
        this.$store.dispatch('giveUp', { id: this.$route.params.id, exercise: exercise })
          .then(({ body }) => {
            this.currentResults[exercise].passed = true;
            this.currentResults[exercise].giveUp = true;
            this.currentResults[exercise].mark = this.marks.bigLetters.find(el => el.number === this.currentResults[exercise].countTry).mark;
            this.addInputBelow(exercise);
            this.currentResults[exercise].studentAnswers[0].task = body.solution;
          });
      },
      nextStep (n) {
        if (n === this.steps) {
          this.exercise = 1
        } else {
          this.exercise = n + 1
        }
      },
      prevStep (n) {
        if (n === 1) {
          this.exercise = this.steps
        } else {
          this.exercise = n - 1
        }
      }
    },
    created() {
      // this.$http.get(`task/${this.$route.params.id}`)
      //   .then(res => { this.task = res.body; });
      this.initialize();
      // this.$store.dispatch('calc');
      // console.log(window)
      // this.$http.get('task/1/check-answer/1/1');
      setTimeout(() => {
        this.$nextTick(function() {
          window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub]);
        });
      }, 2000);
    }
  }
</script>

<style scoped>
  .pos_abs {
    position: absolute;
  }
</style>

