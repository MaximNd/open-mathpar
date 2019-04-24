<template>
  <div>
    <v-stepper v-if="task !== null" v-model="exercise">
      <v-subheader class="mt-3 primary--text">
        <div class="pb-4">{{ task.name }}</div>
        <div class="ml-4">
          <v-select
            v-if="!task.isTest"
            :items="variants"
            label="Variant"
            v-model="currentVariant"
          ></v-select>
        </div>
        <v-spacer></v-spacer>
        <v-select
          :items="[{ text: 'Open access to the task', value: true }, { text: 'Close access to the task', value: false}]"
          label="Access"
          v-model="task.isAllow"
        ></v-select>
      </v-subheader>
      <v-stepper-header>
        <template v-for="(n, index) in steps">
          <v-stepper-step
            :key="`${index}-step`"
            :step="n"
            editable
          >
            Exercise {{ n }}
          </v-stepper-step>
          <v-divider v-if="n !== steps" :key="index"></v-divider>
        </template>
      </v-stepper-header>

      <!-- SETTINGS -->
      <v-card>
        <v-card-text>
          <v-container fluid grid-list-md>
            <v-layout>
              <v-flex xs6>
                <v-text-field v-model="task.name" label="Task Name" required></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-select :items="['Eazy', 'Middle', 'Hard']" v-model="task.difficultyLevel" label="Difficulty Level" required></v-select>
              </v-flex>
              <v-flex xs6>
              <v-select
                v-model="task.isTest"
                label="Type"
                :items="[{ name: 'SR', isTest: true }, { name: 'KR', isTest: false }]"
                item-text="name"
                item-value="isTest"
              ></v-select>
            </v-flex>
            <v-flex xs6>
              <v-text-field v-model="task.order" label="Task order" required></v-text-field>
            </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>

      <v-stepper-content
          :step="index + 1"
          v-for="(exercise, index) in currentExercises"
          :key="`${index}-content`"
        >
        <v-container fluid>
          <v-layout>
            <v-flex xs3>
              <v-card flat>
                <v-card-text>
                  <appTips
                    :exerciseId="index"
                    @tip:selected="insertTipsData(`${lastInputName}${index}`, $event)"></appTips>
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs9>
              <div :style="{ 'overflow-y': 'scroll', 'height': '100vh' }">
                <v-card flat class="mb-5">
                  <v-layout column>
                    <v-flex>
                      <v-card-text>
                        <v-card class="mb-2">
                          <v-card-actions>
                            <v-container fluid>
                              <v-layout justify-start>
                                <v-flex xs12 align-start>
                                  <v-btn color="primary" @click="execute(exercise, 'task')" >
                                    <v-icon left>play_arrow</v-icon>
                                    Execute
                                  </v-btn>
                                  <v-btn color="info" @click="swap(exercise, 'task')">
                                    <v-icon left>swap_horiz</v-icon>
                                    Swap
                                  </v-btn>
                                </v-flex>
                              </v-layout>
                            </v-container>
                          </v-card-actions>
                          <v-card-text class="original-input" v-show="!exercise.task.isLatex">
                            <v-textarea
                              v-model="exercise.task.task"
                              label="Exercise"
                              auto-grow
                              :ref="`task${index}`"
                              @blur="getCaretPosition($refs[`task${index}`][0].$el.children[0].children[0].children[0].children[1])"
                              @focus="onFocusInput('task')"></v-textarea>
                          </v-card-text>
                          <v-card-text class="original-output" v-show="!exercise.task.isLatex">
                            <h3>Output: </h3>
                            <p>{{ exercise.task.result }}</p>
                          </v-card-text>
                          <v-card-text v-show="exercise.task.isLatex">
                            <div class="math-jax" id="latex_markup" v-html="exercise.task.latex">
                            </div>
                          </v-card-text>
                        </v-card>
                        <!-- FOR TASK FULL SOLUTION -->
                        <v-card class="mt-1">
                          <v-card-actions>
                            <v-container fluid>
                              <v-layout justify-start>
                                <v-flex xs12 align-start>
                                  <v-btn color="primary" @click="execute(exercise, 'fullSolution')">
                                    <v-icon left>play_arrow</v-icon>
                                    Execute
                                  </v-btn>
                                  <v-btn color="info" @click="swap(exercise, 'fullSolution')">
                                    <v-icon left>swap_horiz</v-icon>
                                    Swap
                                  </v-btn>
                                </v-flex>
                              </v-layout>
                            </v-container>
                          </v-card-actions>
                          <v-card-text class="original-input" v-show="!exercise.fullSolution.isLatex">
                            <v-textarea
                              v-model="exercise.fullSolution.task"
                              label="Full Solution"
                              auto-grow
                              :ref="`fullSolution${index}`"
                              @blur="getCaretPosition($refs[`fullSolution${index}`][0].$el.children[0].children[0].children[0].children[1])"
                              @focus="onFocusInput('fullSolution')"></v-textarea>
                          </v-card-text>
                          <v-card-text class="original-output" v-show="!exercise.fullSolution.isLatex">
                            <h3>Output: </h3>
                            <p>{{ exercise.fullSolution.result }}</p>
                          </v-card-text>
                          <v-card-text v-show="exercise.fullSolution.isLatex">
                            <div class="math-jax" id="latex_markup" v-html="exercise.fullSolution.latex">
                            </div>
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
          <v-btn color="info" @click="update">Save Changes</v-btn>
        </v-flex>
      </v-stepper-content>
    </v-stepper>
  </div>
</template>

<script>
import Tips from './tips/Tips.vue';
import { prepareTask, setCaretPosition, getCaretPosition } from '../../../../utils/utils';

export default {
  data() {
    return {
      lastInputName: 'task',
      lastCursorIndex: 0,
      exercise: 1,
      task: null,
      currentVariant: 1
    };
  },
  computed: {
    variants() {
      const v = [];
      for (let i = 1; i <= this.task.countOfVariants; ++i) {
        v.push(i);
      }
      return v;
    },
    currentExercises() {
      return this.task
        ? this.task.exercises.filter(exercise => exercise.variant === this.currentVariant) : [];
    },
    steps() {
      return this.currentExercises.length;
    },
  },
  methods: {
    execute(exercise, field) {
      this.$http.post(`${process.env.VUE_APP_API}/api/calc`, { task: exercise[field].task })
        .then(({ body }) => {
          if (body.status === 'OK') {
            const latexArr = body.latex.split('\n');
            const latex = latexArr.reduce((latex, latexArrEl) => {
              if (latexArrEl !== '') {
                latex += `<div>${latexArrEl}</div>`;
              }
              return latex;
            }, '');
            exercise[field].latex = latex;
            exercise[field].result = body.result;
            setTimeout(() => {
              this.$nextTick(() => {
                window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub]);
              });
            }, 0);
            if (!exercise[field].isLatex) {
              this.swap(exercise, field);
            }
          }
        });
    },
    swap(exercise, field) {
      exercise[field].isLatex = !exercise[field].isLatex;
    },
    update() {
      const exercises = this.task.exercises.map(exercise => ({
        variant: exercise.variant,
        text: exercise.task.task,
        fullSolution: exercise.fullSolution.task,
        answer: exercise.fullSolution.result
      }));
      this.$http.put(`task/${this.$route.params.id}`, Object.assign({}, this.task, { exercises, class: this.task.classNumber }));
    },
    insertTipsData(ref, { exerciseId, dataToInsert, offset }) {
      const { task } = this.currentExercises[exerciseId].task;
      const newTask = prepareTask(task, this.lastCursorIndex, dataToInsert);
      this.$set(this.currentExercises[exerciseId].task, 'task', newTask);
      const input = this.$refs[ref][0].$el.children[0].children[0].children[0].children[1];
      setCaretPosition(input, this.lastCursorIndex + offset);
    },
    getCaretPosition(input) {
      this.lastCursorIndex = getCaretPosition(input);
    },
    onFocusInput(inputName) {
      this.lastInputName = inputName;
    }
  },
  created() {
    this.$http.get(`task/${this.$route.params.id}`)
      .then(({ body }) => {
        const exercises = body.exercises.map(exercise => ({
          variant: exercise.variant,
          task: {
            task: exercise.text,
            result: '',
            latex: '<p>No result yet</p>',
            isLatex: false,
          },
          fullSolution: {
            task: exercise.fullSolution,
            result: exercise.answer,
            latex: '<p>No result yet</p>',
            isLatex: false,
          },
        }));
        this.task = body;
        this.task.exercises = exercises;
      });
  },
  components: {
    appTips: Tips
  }
};
</script>
