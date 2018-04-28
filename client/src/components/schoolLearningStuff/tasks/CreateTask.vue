<template>
  <v-dialog full-width lazy v-model="createTaskDialog">
    <v-btn color="success" dark slot="activator">Create Task</v-btn>
    <v-card>
      <v-card-title>
        <span class="headline primary--text">New Task</span>
      </v-card-title>
      <v-form @submit.prevent="createTask">
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs6>
                <v-text-field v-model="task.name" label="Task Name" required></v-text-field>
              </v-flex>
              <v-flex xs6>
                <v-select :items="['Eazy', 'Middle', 'Hard']" v-model="task.difficultyLevel" label="Difficulty Level" required></v-select>
              </v-flex>
              <v-flex xs4>
                <v-select
                  v-model="task.subjectId"
                  label="Subject"
                  autocomplete
                  :items="subjects"
                  item-text="name"
                  item-value="_id"
                ></v-select>
              </v-flex>
              <v-flex xs4>
                <v-select
                  v-model="task.classNumber"
                  label="Class"
                  autocomplete
                  :items="classes"
                  item-text="name"
                  item-value="_id"
                ></v-select>
              </v-flex>
              <v-flex xs4>
                <v-select
                  v-model="task.theme"
                  label="Theme"
                  autocomplete
                  :items="themes"
                  item-text="name"
                  item-value="_id"
                ></v-select>
              </v-flex>
              <v-flex md12 lg6>
                <v-select
                  v-model="task.isTest"
                  label="Type"
                  :items="[{ name: 'SR', isTest: true }, { name: 'KR', isTest: false }]"
                  item-text="name"
                  item-value="isTest"
                ></v-select>
              </v-flex>
              <v-flex md12 lg6>
                <v-text-field v-model="task.order" label="Task order" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-card>
                      <v-card-text>
                        <template v-if="task.exercises.length > 0">
                          <v-select
                            v-model="index"
                            label="Select Exercise Number"
                            :items="exercisesIndexes"
                            item-text="text"
                            item-value="value"
                          ></v-select>
                          <v-btn color="success" block @click="createExercise(index+1)">Add Exercise afeter {{ this.index + 1 }}</v-btn>
                          <v-btn color="success" block @click="createExercise(index)">Add Exercise before {{ this.index + 1 }}</v-btn>
                        </template>
                        <template v-else>
                          <v-btn color="success" block @click="createExercise(0)">Add One Exercise Below</v-btn>
                        </template>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex xs12 v-for="(n, index) in task.exercises.length" :key="index">
                    <v-card class="mb-1">
                      <v-card-title>
                        <span class="headline primary--text">Exercise №{{ n }}</span>
                      </v-card-title>
                      <v-card-actions>
                        <v-container>
                          <v-layout>
                            <v-btn color="error" @click="deleteExercise(index)" >
                              <v-icon left>close</v-icon>
                              Delete
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
                                    Execute
                                  </v-btn>
                                  <v-btn color="info" @click="swap(index, 'task')">
                                    <v-icon left>swap_horiz</v-icon>
                                    Swap
                                  </v-btn>
                                </v-flex>
                              </v-layout>
                            </v-container>
                          </v-card-actions>
                          <v-card-text class="original-input" v-show="!task.exercises[index].task.isLatex">
                            <v-text-field v-model="task.exercises[index].task.task" label="Exercise" multi-line auto-grow ></v-text-field>
                          </v-card-text>
                          <v-card-text class="original-output" v-show="!task.exercises[index].task.isLatex">
                            <h3>Output: </h3>
                            <p>{{ task.exercises[index].task.result }}</p>
                          </v-card-text>
                          <v-card-text v-show="task.exercises[index].task.isLatex">
                            <div class="math-jax" id="latex_markup" v-html="task.exercises[index].task.latex">
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
                                    Execute
                                  </v-btn>
                                  <v-btn color="info" @click="swap(index, 'fullSolution')">
                                    <v-icon left>swap_horiz</v-icon>
                                    Swap
                                  </v-btn>
                                </v-flex>
                              </v-layout>
                            </v-container>
                          </v-card-actions>
                          <v-card-text class="original-input" v-show="!task.exercises[index].fullSolution.isLatex">
                            <v-text-field v-model="task.exercises[index].fullSolution.task" label="Full Solution" multi-line auto-grow ></v-text-field>
                          </v-card-text>
                          <v-card-text class="original-output" v-show="!task.exercises[index].fullSolution.isLatex">
                            <h3>Output: </h3>
                            <p>{{ task.exercises[index].fullSolution.result }}</p>
                          </v-card-text>
                          <v-card-text v-show="task.exercises[index].fullSolution.isLatex">
                            <div class="math-jax" id="latex_markup" v-html="task.exercises[index].fullSolution.latex">
                            </div>
                          </v-card-text>
                        </v-card>
                      </v-card-text>
                    </v-card>
                    <!-- <v-card class="mt-1">
                      <v-card-title>
                        <span class="headline primary--text">Exercise №{{ n }}</span>
                      </v-card-title>
                      <v-card-text>
                        <v-text-field v-model="task.exercises[index].text" multi-line label="Task Text" required></v-text-field>
                        <v-text-field v-model="task.exercises[index].fullSolution" multi-line label="Full Solution" required></v-text-field>
                        <v-text-field v-model="task.exercises[index].answer" label="Answer" required></v-text-field>
                      </v-card-text>
                    </v-card> -->
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" flat @click.native="createTaskDialog = false">Close</v-btn>
          <v-btn type="submit" color="success" flat @click.native="createTaskDialog = false">Save</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    data() {
      return {
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
          exercises: []
        },
        index: 0,
        subjects: [],
        classes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        themes: [],
        exercisesCount: 2,
        createTaskDialog: false
      };
    },
    computed: {
      exercisesIndexes() {
        return Array.apply(null, { length: this.task.exercises.length }).map((_, index) => ({value: Number(index), text: Number(index + 1)}));
      }
    },
    watch: {
      'task.subjectId'(newSubjectId) {
        let allThemes = this.subjects.find(subject => subject._id === newSubjectId).themes;
        if (typeof this.task.classNumber !== 'undefined') {
          allThemes = allThemes.filter(theme => theme.class === this.task.classNumber);
        }
        this.themes = allThemes;
      },
      'task.classNumber'(newClassNumber) {
        if (typeof this.task.subjectId !== 'undefined') {
          this.themes = this.subjects.find(subject => subject._id === this.task.subjectId).themes.filter(theme => theme.class === newClassNumber);
        }
      }
    },
    methods: {
      createTask() {
        this.task.isAllow = this.task.isTest;
        const exercises = this.task.exercises.map(exercise => ({ text: exercise.task.task, fullSolution: exercise.fullSolution.task, answer: exercise.fullSolution.result }));
        this.$store.dispatch('createTask', Object.assign({}, this.task, { exercises, class: this.task.classNumber }));
      },
      execute(index, field) {
        this.$http.post('http://mathpar.ukma.edu.ua/api/calc', { task: this.task.exercises[index][field].task })
          .then(({ body }) => {
            if (body.status === 'OK') {
              let latexArr = body.latex.split('\n');
              const latex = latexArr.reduce((latex, latexArrEl) => {
                if (latexArrEl !== '') {
                  latex += `<div>${latexArrEl}</div>`;
                }
                return latex;
              }, '');
              this.task.exercises[index][field].latex = latex;
              this.task.exercises[index][field].result = body.result;
              setTimeout(() => {
                this.$nextTick(() => {
                  window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub]);
                });
              }, 0);
              if (!this.task.exercises[index][field].isLatex) {
                this.swap(index, field);
              }
            }
          })
      },
      swap(index, field) {
        this.task.exercises[index][field].isLatex = !this.task.exercises[index][field].isLatex;
      },
      createExercise(index) {
        this.task.exercises.splice(index, 0, {
          task: {
            task: '',
            result: '',
            latex: '<p>No result yet</p>',
            isLatex: false
          },
          fullSolution: {
            task: '',
            result: '',
            latex: '<p>No result yet</p>',
            isLatex: false
          }
          // images: {
          //   type: [String],
          //   required: false
          // }
        });
      },
      deleteExercise(index) {
        this.task.exercises.splice(index, 1);
      }
    },
    created() {
      this.$http.get(`subjects`)
        .then(data => { this.subjects = data.body; });
      const client = this.$auth.user().clients.find(client => client.clientRole === 'teacher').client;
      this.task.schoolId = client.schoolId._id;
      this.task.teacherId = client._id;
      for (let i = 0; i < this.exercisesCount; ++i) {
        this.task.exercises.push({
          task: {
            task: '',
            result: '',
            latex: '<p>No result yet</p>',
            isLatex: false
          },
          fullSolution: {
            task: '',
            result: '',
            latex: '<p>No result yet</p>',
            isLatex: false
          }
          // images: {
          //   type: [String],
          //   required: false
          // }
        });
      }
    }
  }
</script>

<style scoped>

</style>
