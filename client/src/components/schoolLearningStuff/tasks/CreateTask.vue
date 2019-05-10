<template>
  <v-dialog full-width lazy v-model="createTaskDialog">
    <v-btn color="success" dark slot="activator">
      {{ $t('schoolLearningStuff.tasks.createTask.name') }}
    </v-btn>
    <v-card>
      <v-card-title>
        <span class="headline primary--text">
          {{ $t('schoolLearningStuff.tasks.createTask.newTask') }}
        </span>
      </v-card-title>
      <v-form @submit.prevent="createTask">
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs6>
                <v-text-field
                  v-model="task.name"
                  :label="$t('schoolLearningStuff.tasks.createTask.taskName')"
                  required></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-select
                  :items="['Eazy', 'Middle', 'Hard']"
                  v-model="task.difficultyLevel"
                  :label="$t('schoolLearningStuff.tasks.createTask.difficultyLevel')"
                  required></v-select>
              </v-flex>
              <v-flex xs4>
                <v-autocomplete
                  v-model="task.subjectId"
                  :label="$t('utils.labels.subject')"
                  :items="subjects"
                  item-text="name"
                  item-value="_id"
                ></v-autocomplete>
              </v-flex>
              <v-flex xs4>
                <v-autocomplete
                  v-model="task.classNumber"
                  :label="$t('utils.labels.class')"
                  :items="classes"
                  item-text="name"
                  item-value="_id"
                ></v-autocomplete>
              </v-flex>
              <v-flex xs4>
                <v-autocomplete
                  v-model="task.theme"
                  :label="$t('utils.labels.theme')"
                  :items="themes"
                  item-text="name"
                  item-value="_id"
                ></v-autocomplete>
              </v-flex>
              <v-flex md12 :lg4="!isTest" :lg6="isTest">
                <v-select
                  v-model="task.isTest"
                  :label="$t('utils.labels.type')"
                  :items="[{ name: 'SR', isTest: true }, { name: 'KR', isTest: false }]"
                  item-text="name"
                  item-value="isTest"
                ></v-select>
              </v-flex>
              <v-flex v-if="!isTest" md12 lg4>
                <v-text-field
                  v-model="task.countOfVariants"
                  :label="$t('utils.labels.countOfVariants')"
                  type="number"
                  min="1"
                  required></v-text-field>
              </v-flex>
              <v-flex md12 :lg4="!isTest" :lg6="isTest">
                <v-text-field
                  v-model="task.order"
                  :label="$t('utils.labels.taskOrder')"
                  required></v-text-field>
              </v-flex>
              <v-flex v-if="!isTest" xs12>
                <v-select
                  v-model="currentVariant"
                  :items="variantsNumberList">
                </v-select>
              </v-flex>
              <v-flex xs12>
                <v-btn color="info" @click="triggerFileInput">
                  {{ $t('utils.button.uploadText') }}
                </v-btn>
                <input @change="uploadText" type="file" ref="text_file" hidden>
                <v-btn color="info" @click="saveText">
                  {{ $t('utils.button.saveText') }}
                </v-btn>
                <v-btn color="info" @click="savePDFAndTex">
                  {{ $t('utils.button.savePDF') }}
                </v-btn>
              </v-flex>
              <v-flex xs12>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-card>
                      <v-card-text>
                        <template v-if="currentExercises && currentExercises.length > 0">
                          <v-select
                            v-model="index"
                            :label="$t('schoolLearningStuff.tasks.createTask.selectExerciseNumber')"
                            :items="currentExercisesIndexes"
                            item-text="text"
                            item-value="value"
                          ></v-select>
                          <v-btn
                            color="success"
                            block
                            @click="createExercise(index+1)">
                            {{ $t('schoolLearningStuff.tasks.createTask.addExerciseAfter', [index + 1]) }}
                          </v-btn>
                          <v-btn
                            color="success"
                            block
                            @click="createExercise(index)">
                            {{ $t('schoolLearningStuff.tasks.createTask.addExerciseBefore', [index + 1]) }}
                          </v-btn>
                        </template>
                        <template v-else>
                          <v-btn
                            color="success"
                            block
                            @click="createExercise(0)">
                            {{ $t('schoolLearningStuff.tasks.createTask.addOneExerciseBelow') }}
                          </v-btn>
                        </template>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex xs3>
                    <appTips
                      @tip:selected="insertTipsData($event)"></appTips>
                  </v-flex>
                  <v-flex xs9 :style="{ 'overflow-y': 'scroll', height: '600px' }">
                    <v-flex xs12 v-for="(exercise, index) in currentExercises" :key="`task-${index}`">
                      <v-card class="mb-1">
                        <v-card-title>
                          <span class="headline primary--text">
                            {{ $t('schoolLearningStuff.tasks.createTask.exerciseNumber', [index + 1]) }}
                          </span>
                        </v-card-title>
                        <v-card-actions>
                          <v-container>
                            <v-layout>
                              <v-btn color="error" @click="deleteExercise(index)">
                                <v-icon left>close</v-icon>
                                {{ $t('utils.button.delete') }}
                              </v-btn>
                            </v-layout>
                          </v-container>
                        </v-card-actions>
                        <v-card-text>
                          <!-- FOR TASK TEXT -->
                          <v-card>
                            <v-card-actions>
                              <v-container fluid>
                                <v-layout justify-start>
                                  <v-flex xs12 align-start>
                                    <v-btn color="primary" @click="execute(index, 'task')" >
                                      <v-icon left>play_arrow</v-icon>
                                      {{ $t('utils.button.execute') }}
                                    </v-btn>
                                    <v-btn color="info" @click="swap(index, 'task')">
                                      <v-icon left>swap_horiz</v-icon>
                                      {{ $t('utils.button.swap') }}
                                    </v-btn>
                                  </v-flex>
                                </v-layout>
                              </v-container>
                            </v-card-actions>
                            <v-card-text class="original-input" v-show="!exercise.task.isLatex">
                              <v-textarea
                                :ref="`task${index}`"
                                v-model="exercise.task.task"
                                :label="$t('utils.labels.exercise')"
                                auto-grow
                                @blur="getCaretPosition($refs[`task${index}`][0].$el.children[0].children[0].children[0].children[1])"
                                @focus="setCurrentInput('task', index)"></v-textarea>
                            </v-card-text>
                            <v-card-text class="original-output" v-show="!exercise.task.isLatex">
                              <h3>
                                {{ $t('utils.text.output') }}
                              </h3>
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
                                    <v-btn color="primary" @click="execute(index, 'fullSolution')">
                                      <v-icon left>play_arrow</v-icon>
                                      {{ $t('utils.button.execute') }}
                                    </v-btn>
                                    <v-btn color="info" @click="swap(index, 'fullSolution')">
                                      <v-icon left>swap_horiz</v-icon>
                                      {{ $t('utils.button.swap') }}
                                    </v-btn>
                                  </v-flex>
                                </v-layout>
                              </v-container>
                            </v-card-actions>
                            <v-card-text class="original-input" v-show="!exercise.fullSolution.isLatex">
                              <v-textarea
                                :ref="`fullSolution${index}`"
                                v-model="exercise.fullSolution.task"
                                :label="$t('utils.labels.fullSolution')"
                                auto-grow
                                @blur="getCaretPosition($refs[`fullSolution${index}`][0].$el.children[0].children[0].children[0].children[1])"
                                @focus="setCurrentInput('fullSolution', index)"></v-textarea>
                            </v-card-text>
                            <v-card-text class="original-output" v-show="!exercise.fullSolution.isLatex">
                              <h3>
                                {{ $t('utils.text.output') }}
                              </h3>
                              <p>{{ exercise.fullSolution.result }}</p>
                            </v-card-text>
                            <v-card-text v-show="exercise.fullSolution.isLatex">
                              <div class="math-jax" id="latex_markup" v-html="exercise.fullSolution.latex">
                              </div>
                            </v-card-text>
                          </v-card>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-container>
          <small>
            {{ $t('utils.hint.indicatesRequiredField') }}
          </small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            flat
            @click.native="createTaskDialog = false">
            {{ $t('utils.button.cancel') }}
          </v-btn>
          <v-btn
            type="submit"
            color="success"
            flat
            @click.native="createTaskDialog = false">
            {{ $t('utils.button.create') }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import Tips from './task/tips/Tips.vue';
import { prepareTask, setCaretPosition, getCaretPosition } from '../../../utils/utils';

export default {
  data() {
    return {
      currentInputName: 'task',
      currentInputIndex: 0,
      lastCursorIndex: 0,
      task: {
        schoolId: '',
        teacherId: '',
        name: '',
        difficultyLevel: undefined,
        subjectId: undefined,
        classNumber: undefined,
        theme: undefined,
        isTest: true,
        isAllow: undefined,
        order: undefined,
        countOfVariants: 1,
        exercises: [[]],
      },
      index: 0,
      currentVariant: 1,
      subjects: [],
      classes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      themes: [],
      exercisesCount: 2,
      createTaskDialog: false,
    };
  },
  computed: {
    currentExercises() {
      return this.task.exercises[this.currentVariant - 1];
    },
    variantsNumberList() {
      let variants = [];
      for (let i = 0; i < this.task.countOfVariants; ++i) {
        const variantNumber = i + 1;
        variants.push({ text: `Variant №${variantNumber}`, value: variantNumber });
      }
      return variants;
    },
    currentExercisesIndexes() {
      let indexes = [];
      if (this.currentExercises) {
        for (let i = 0; i < this.currentExercises.length; ++i) {
          indexes.push({ value: i, text: i + 1 });
        }
      }
      return indexes;
    },
    isTest() {
      return this.task.isTest;
    },
  },
  watch: {
    'task.subjectId': function (newSubjectId) {
      let allThemes = this.subjects.find(subject => subject._id === newSubjectId).themes;
      if (typeof this.task.classNumber !== 'undefined') {
        allThemes = allThemes.filter(theme => theme.class === this.task.classNumber);
      }
      this.themes = allThemes;
    },
    'task.classNumber': function (newClassNumber) {
      if (typeof this.task.subjectId !== 'undefined') {
        this.themes = this.subjects.find(subject => subject._id === this.task.subjectId).themes.filter(theme => theme.class === newClassNumber);
      }
    },
    'task.isTest'(newIsTestValue) {
      if (newIsTestValue) {
        this.task.countOfVariants = 1;
        this.currentVariant = 1;
      }
    }
  },
  methods: {
    init() {
      this.$http.get('subjects')
        .then((data) => {
          this.subjects = data.body;
        });
      const client = this.$auth.user().clients.find(client => client.clientRole === 'teacher').client;
      this.task.schoolId = client.schoolId._id;
      this.task.teacherId = client._id;
      for (let i = 0; i < 2; ++i) {
        this.createExercise(i);
      }
    },
    triggerFileInput() {
      this.$refs.text_file.click();
    },
    uploadText(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          /** @type {String} */
          const content = reader.result;
          const lines = content.split(/[\r\n]+/g);
          const exercises = [];

          let isTaskParsing = false;

          let isTextParsing = true;
          let isSolutionParsing = false;

          let isWriteToText = true;
          const taskRegExp = /TASK\s+[\d]{2}/;
          const endTextSeparatorRegExp = /---/;
          const endTaskBodySeparator = /===/;

          lines.forEach((line) => {
            console.log(isTaskParsing);
            if (!isTaskParsing && taskRegExp.test(line)) {
              isTaskParsing = true;
              isTextParsing = true;
              console.log(1);
              exercises.push({
                task: {
                  task: line,
                  result: '',
                  latex: '<p>No result yet</p>',
                  isLatex: false,
                },
                fullSolution: {
                  task: '',
                  result: '',
                  latex: '<p>No result yet</p>',
                  isLatex: false,
                },
                variant: this.currentVariant
              });
            } else if (isTaskParsing && isTextParsing) {
              if (endTextSeparatorRegExp.test(line)) {
                isWriteToText = false;
              } else if (endTaskBodySeparator.test(line)) {
                isSolutionParsing = true;
                isTextParsing = false;
                isWriteToText = true;
              } else if (isWriteToText) {
                exercises[exercises.length - 1].task.task += (`${line}\r\n`);
              } else {
                exercises[exercises.length - 1].task.result += (`${line}\r\n`);
              }
            } else if (isTaskParsing && isSolutionParsing) {
              if (endTextSeparatorRegExp.test(line)) {
                isWriteToText = false;
              } else if (endTaskBodySeparator.test(line)) {
                isTaskParsing = false;
                isSolutionParsing = false;
                isWriteToText = true;
              } else if (isWriteToText) {
                exercises[exercises.length - 1].fullSolution.task += (`${line}\r\n`);
              } else {
                exercises[exercises.length - 1].fullSolution.result += (`${line}\r\n`);
              }
            }
          });
          console.log(exercises);
          this.task.exercises.splice(this.currentVariant - 1, 1, exercises);
          this.task.exercises[this.currentVariant - 1].forEach((exercise, i) => {
            this.execute(i, 'task');
            this.execute(i, 'fullSolution');
          });
        };
        reader.readAsText(file);
      } else {
        // TODO Handle if no file
      }
    },
    saveText() {
      const text = this.task.name + this.task.exercises[this.currentVariant - 1].reduce((text, { task, fullSolution }) => {
        text += (`${task.task}\r\n"---"\r\n${task.result}\r\n"==="\r\n${fullSolution.task}\r\n"---"\r\n${fullSolution.result}\r\n"==="\r\n`);
        return text;
      }, '');
      const blob = new Blob([text], { type: 'text/plain' });
      const anchor = document.createElement('a');
      const objURL = window.URL.createObjectURL(blob);
      anchor.download = this.task.name || 'TASK';
      anchor.href = objURL;
      anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
      anchor.click();
      // clean
      window.URL.revokeObjectURL(objURL);
    },
    savePDFAndTex() {
      // this.$http.post('http://localhost:8080/api/export', formData)
      //   .then(({ body }) => {
      //     // window.open('http://localhost:8081/#/');
      //     window.open(`http://localhost:8080/api/export?format=tex&filename=${body.filename.replace(/\.pdf$/, '.tex')}`);
      //     console.log(body);
      //   });
    },
    createTask() {
      this.task.isAllow = this.task.isTest;
      const exercises = this.task.exercises
        .reduce((allExercises, exercises) => {
          return [...allExercises, ...exercises.map(exercise => ({
            text: exercise.task.task,
            fullSolution: exercise.fullSolution.task,
            answer: exercise.fullSolution.result,
            variant: exercise.variant
          }))];
        }, []);
      this.$store.dispatch('createTask', Object.assign({}, this.task, { exercises, class: this.task.classNumber }))
        .then(() => {
          this.$alertify.success('Success');
        })
        .catch(() => {
          this.$alertify.error('Error! Try again later please.');
        });
    },
    execute(index, field) {
      this.$http.post('http://localhost:8080/api/calc', { task: this.currentExercises[index][field].task })
        .then(({ body }) => {
          if (body.status === 'OK') {
            const latexArr = body.latex.split('\n');
            const latex = latexArr.reduce((latex, latexArrEl) => {
              if (latexArrEl !== '') {
                latex += `<div>${latexArrEl}</div>`;
              }
              return latex;
            }, '');
            this.$set(this.task.exercises[this.currentVariant - 1][index][field], 'latex', latex);
            this.$set(this.task.exercises[this.currentVariant - 1][index][field], 'result', body.result);
            setTimeout(() => {
              this.$nextTick(() => {
                window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub]);
              });
            }, 0);
            if (!this.task.exercises[this.currentVariant - 1][index][field].isLatex) {
              this.swap(index, field);
            }
          }
        });
    },
    swap(index, field) {
      this.task.exercises[this.currentVariant - 1][index][field].isLatex = !this.task.exercises[this.currentVariant - 1][index][field].isLatex;
    },
    createExercise(index) {
      if (!this.task.exercises[this.currentVariant - 1]) {
        this.$set(this.task.exercises, this.currentVariant - 1, []);
      }
      this.task.exercises[this.currentVariant - 1].splice(index, 0, {
        task: {
          task: '',
          result: '',
          latex: '<p>No result yet</p>',
          isLatex: false,
        },
        fullSolution: {
          task: '',
          result: '',
          latex: '<p>No result yet</p>',
          isLatex: false,
        },
        variant: this.currentVariant,
      });
    },
    deleteExercise(index) {
      this.task.exercises[this.currentVariant - 1].splice(index, 1);
    },
    setCurrentInput(inputName, inputIndex) {
      this.currentInputName = inputName;
      this.currentInputIndex = inputIndex;
    },
    insertTipsData({ dataToInsert, offset }) {
      const { task } = this.task.exercises[this.currentVariant - 1][this.currentInputIndex][this.currentInputName];
      const newTask = prepareTask(task, this.lastCursorIndex, dataToInsert);
      this.$set(this.task.exercises[this.currentVariant - 1][this.currentInputIndex][this.currentInputName], 'task', newTask);
      const input = this.$refs[`${this.currentInputName}${this.currentInputIndex}`][0].$el.children[0].children[0].children[0].children[1];
      setCaretPosition(input, this.lastCursorIndex + offset);
    },
    getCaretPosition(input) {
      this.lastCursorIndex = getCaretPosition(input);
    },
  },
  created() {
    this.init();
  },
  components: {
    appTips: Tips
  }
};
</script>

<style scoped>

</style>
