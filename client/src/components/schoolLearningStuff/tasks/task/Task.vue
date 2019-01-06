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
                              <v-chip class="mb-3" :key="subItemIndx" @click="insertTipsData(index, subItem.dataInsert, subItem.offset)">
                                <span>{{ subItem.title }}</span>
                              </v-chip>
                            </template>
                            <template v-else>
                              <v-expansion-panel :key="subItemIndx">
                                <v-expansion-panel-content>
                                  <div slot="header">{{ subItem.title }}</div>
                                  <template v-for="(subItem2, subItemIndx2) in subItem.items">
                                    <v-chip  @click="insertTipsData(index, subItem2.dataInsert, subItem2.offset)" :class="{ 'mb-3': true, 'ml-4': subItemIndx2 === 0, 'mr-4': subItemIndx2 === subItem.items.length-1 }" :key="subItemIndx2">
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
                                <v-btn :color="currentResults[index].active ? 'warning' : 'primary'" @click="execute(index)" :disabled="currentResults[index].passed || taskFinished">
                                  <v-icon left>play_arrow</v-icon>
                                  {{ currentResults[index].active ? 'Active Task' : 'Start Task' }}
                                </v-btn>
                                <v-btn color="info" @click="swap(index)" :disabled="!currentResults[index].active">
                                  <v-icon left>swap_horiz</v-icon>
                                  Swap
                                </v-btn>
                                <v-btn color="success" @click="addInputBelow(index)" :disabled="!currentResults[index].active || currentResults[index].passed || taskFinished">
                                  <v-icon left>add</v-icon>
                                  Add one input below
                                </v-btn>
                              </v-flex>
                            </v-layout>
                          </v-container>
                        </v-card-actions>
                        <v-card-text>
                          <v-card class="original">
                            <template v-if="!currentResults[index].active">
                              <v-card-text class="original-input">
                                You have not started this exercise yet
                              </v-card-text>
                            </template>
                            <template v-else-if="!currentResults[index].exerciseText.isLatex">
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
                                <v-btn color="primary" @click="execute(index, index2)" :disabled="currentResults[index].giveUp ? index2 !== 0 : (!currentResults[index].active || currentResults[index].passed || taskFinished)">
                                  <v-icon left>play_arrow</v-icon>
                                  Execute
                                </v-btn>
                                <v-btn color="info" @click="swap(index, index2)" :disabled="currentResults[index].giveUp ? index2 !== 0 : (currentResults[index].passed || taskFinished || !currentResults[index].active)">
                                  <v-icon left>swap_horiz</v-icon>
                                  Swap
                                </v-btn>
                                <v-btn color="success" @click="addInputBelow(index, index2+1)" :disabled="!currentResults[index].active || currentResults[index].passed || taskFinished">
                                  <v-icon left>add</v-icon>
                                  Add one input below
                                </v-btn>
                                <v-btn color="error" @click="deleteInputById(index, index2)" :disabled="!currentResults[index].active || currentResults[index].passed || taskFinished">
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
                                <v-textarea :ref='`studentAnswerTextField${index2}`' :value="currentResults[index].studentAnswers[index2].task" @input="updateInput(index, index2, $event)" label="Your answer" auto-grow @blur="getCaretPosition(index2)" @focus="lastSection.sectionId = index2"></v-textarea>
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
          <template v-if="task.isTest" >
            <v-btn @click="check(index)" :disabled="!currentResults[index].active || currentResults[index].passed || taskFinished" color="success">Check</v-btn>
            <v-btn @click="giveUp(index)" :disabled="!currentResults[index].active || currentResults[index].passed || taskFinished" color="warning">Give up</v-btn>
          </template>
        </v-flex>
        <v-flex xs12>
          <v-btn @click="finish" :disabled="taskFinished" color="error">Finish</v-btn>
          <!-- <v-btn v-else @click="submitForReview" color="error">Submit for review</v-btn> -->
        </v-flex>
      </v-stepper-content>
    </v-stepper>
  </div>
</template>


<script>
import Vue from 'vue';
import moment from 'moment';
import Graphics from './graphics/Graphics.vue';
// import MathJax from 'mathjax';

export default {
  data() {
    return {
      lastSection: {
        sectionId: 0,
        cursorIndex: 0,
      },
      tips: [
        {
          title: 'Space',
          items: [
            { title: '$\\mathbb{Z}$', dataInsert: 'SPACE = Z[];', offset: 10 },
            { title: '$\\mathbb{Z}p$', dataInsert: 'SPACE = Zp[];', offset: 11 },
            { title: '$\\mathbb{Z}p32$', dataInsert: 'SPACE = Zp32[];', offset: 13 },
            { title: '$\\mathbb{Z}64$', dataInsert: 'SPACE = Z64[];', offset: 12 },
            { title: '$\\mathbb{Q}$', dataInsert: 'SPACE = Q[];', offset: 10 },
            { title: '$\\mathbb{R}$', dataInsert: 'SPACE = R[];', offset: 10 },
            { title: '$\\mathbb{R}64$', dataInsert: 'SPACE = R64[];', offset: 13 },
            { title: '$\\mathbb{R}128$', dataInsert: 'SPACE = R128[];', offset: 13 },
            { title: '$\\mathbb{C}$', dataInsert: 'SPACE = C[];', offset: 10 },
            { title: '$\\mathbb{C}64$', dataInsert: 'SPACE = C64[];', offset: 12 },
            { title: '$\\mathbb{C}128$', dataInsert: 'SPACE = C128[];', offset: 13 },
            { title: '$\\mathbb{CZ}$', dataInsert: 'SPACE = CZ[];', offset: 11 },
            { title: '$\\mathbb{CZ}p$', dataInsert: 'SPACE = CZp[];', offset: 12 },
            { title: '$\\mathbb{CZ}p32$', dataInsert: 'SPACE = CZp32[];', offset: 14 },
            { title: '$\\mathbb{CZ}64$', dataInsert: 'SPACE = CZ64[];', offset: 13 },
            { title: '$\\mathbb{CQ}$', dataInsert: 'SPACE = CQ[];', offset: 11 },
            {
              title: 'Constants',
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
                { title: 'TIMEOUT', dataInsert: 'TIMEOUT = ;' },
              ],
            },
          ],
        },
        {
          title: 'Symbols',
          items: [
            {
              title: 'Numbers, sets, intequality',
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
                { title: '$\\neg$', dataInsert: '\\neg' },
              ],
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
                { title: '$[$', dataInsert: '\\systemOR(,)' },
              ],
            },
          ],
        },
        {
          title: 'Graphics and tables',
          items: [
            {
              title: '2D plots and tables',
              items: [
                { title: 'plot', dataInsert: '\\set2D(-5,5,-4,6); f=3\\arctg(x+1); \\plot([f,-x+5, 3x+5]);', offset: 57 },
                { title: 'paramPlot', dataInsert: '\\set2D(-20, 20, -20, 20);\\newline g = x\\sin(x); k = x\\cos(x);\\newline f = \\paramPlot([g, k], [0, 5\\pi]);', offset: 104 },
                { title: 'tablePlot', dataInsert: '\\set2D( 0, 10,  -5, 30);\\newline \\tablePlot([[0, 1, 2, 3, 4, 5],[0, 1, 4, 9, 16, 25],[0, -1, -2, -3, -4, -5],[0, 4, 8, 12, 16, 20]]);', offset: 133 },
                { title: 'showPlots', dataInsert: '\\set2D(-5, 5, -5, 5);\\newline f1 = \\plot(\\tg(x));\\newline f2 = \\tablePlot([[0, 1, 4, 9, 16, 25], [0, 1, 2, 3, 4, 5]]);\\newline f3 = \\paramPlot([\\sin(x), \\cos(x)], [-10, 10]);\\newline f4=\\tablePlot([[0, 1, 4, 9, 16, 25], [0, -1, -2, -3, -4, -5]]);\\newline \\showPlots([f1, f2, f3, f4]);', offset: 284 },
                { title: 'approximation', dataInsert: 'SPACE=R64[x];\\set2D(0, 5, -5, 10);\\newline A=[[0, 1, 2, 3,  4, 5],[3, 0, 4, 10, 5, 10]];\\newline  t=\\table(A);\\newline p=\\approximation(t,4);\\newline P=\\plot(p );\\newline T=\\tablePlot(t);\\showPlots([P,T]);\\print(p);', offset: 215 },
                { title: 'tableFromFile', dataInsert: '=\\tableFromFile(\'\');', offset: 17 },
                { title: 'table', dataInsert: '=\\table();', offset: 8 },
              ],
            },
          ],
        },
      ],
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
      if (this.currentResults[exerciseId].giveUp ? section !== 0 : (this.currentResults[exerciseId].passed || this.taskFinished)) return;
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
        // If the student decide to didn't do the exercise, then the answer is an empty string('')
        studentResult = this.currentResults.map(result => (result.studentAnswers.length > 0 ? result.studentAnswers[result.studentAnswers.length - 1].result : ''));
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
            exerciseIndex: exerciseResult.exercise,
            hours: exerciseResult.time.totalDuration.hours(),
            minutes: exerciseResult.time.totalDuration.minutes(),
            seconds: exerciseResult.time.totalDuration.seconds(),
          };
        } else {
          time = {
            exerciseIndex: exerciseResult.exercise,
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
      this.$store.dispatch('getTaskById', this.$route.params.id)
        .then((res) => {
          const currentRes = [];
          const sections = [];
          for (let i = 0; i < this.steps; ++i) {
            currentRes.push({
              exercise: i,
              active: false,
              exerciseText: {
                task: this.task.exercises[i].text,
                latex: '<p>No result yet</p>',
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
    check(exercise) {
      if (!this.currentResults[exercise].active || this.currentResults[exercise].passed || this.taskFinished) return;
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
            this.offOldTimer();
            this.setInactiveOldTask();
            this.$alertify.success('Success');
          } else {
            this.$alertify.error('Wrong');
          }
        });
    },
    giveUp(exercise) {
      if (!this.currentResults[exercise].active || this.currentResults[exercise].passed || this.taskFinished) return;
      this.$store.dispatch('giveUp', { id: this.$route.params.id, exercise })
        .then(({ body }) => {
          this.currentResults[exercise].mark = this.marks.bigLetters.find(el => el.number === this.currentResults[exercise].countTry).mark;
          this.addInputBelow(exercise);
          this.currentResults[exercise].studentAnswers[0].task = body.solution;
          this.currentResults[exercise].passed = true;
          this.currentResults[exercise].giveUp = true;

          this.offOldTimer();
          this.setInactiveOldTask();
        });
    },
    insertTipsData(exerciseId, dataToInsert, offset) {
      if (this.currentResults[exerciseId].studentAnswers.length === 0) return;
      const task = this.currentResults[exerciseId].studentAnswers[this.lastSection.sectionId].task.split('');
      task.splice(this.lastSection.cursorIndex, 0, dataToInsert.replace(/\\newline/g, '\n'));
      const newTask = task.join('');
      Vue.set(this.currentResults[exerciseId].studentAnswers[this.lastSection.sectionId], 'task', newTask);
      this.setCaretPosition(this.lastSection.cursorIndex + offset);
    },
    getCaretPosition(sectionId) {
      // console.log(this.$refs[`studentAnswerTextField${sectionId}`][0].$el.children[1].children[0].value)
      const textarea = this.$refs[`studentAnswerTextField${sectionId}`][0].$el.children[1].children[0];
      if (document.selection) {
        textarea.focus();
        const range = document.selection.createRange();
        const rangelen = range.text.length;
        range.moveStart('character', -textarea.value.length);
        const start = range.text.length - rangelen;
        this.lastSection.cursorIndex = start;
        // return { 'start': start, 'end': start + rangelen };
      } else if (textarea.selectionStart || textarea.selectionStart === '0') {
        this.lastSection.cursorIndex = textarea.selectionStart;
        // return { 'start': textarea.selectionStart, 'end': textarea.selectionEnd };
      } else {
        this.lastSection.cursorIndex = 0;
        // return {'start': 0, 'end': 0};
      }
    },
    setCaretPosition(position) {
      const start = position;
      const end = position;
      const textarea = this.$refs[`studentAnswerTextField${this.lastSection.sectionId}`][0].$el.children[1].children[0];
      setTimeout(() => {
        if (textarea.setSelectionRange) {
          textarea.focus();
          textarea.setSelectionRange(start, end);
        } else if (textarea.createTextRange) {
          const range = textarea.createTextRange();
          range.collapse(true);
          range.moveEnd('character', end);
          range.moveStart('character', start);
          range.select();
        }
      }, 0);
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
    setTimeout(() => {
      this.$nextTick(() => {
        window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub]);
        // start first exercise
        this.execute(0);
      });
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
