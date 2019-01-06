<template>
  <div>
    <v-stepper v-if="task !== null" v-model="exercise">
      <v-subheader class="mt-3 primary--text">
        <div class="pb-4">{{ task.name }}</div>
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
          :step="n"
          v-for="(n, index) in steps"
          :key="`${index}-content`"
        >
        <v-container fluid>
          <v-layout>
            <v-flex xs3>
              Tips
            </v-flex>
            <v-flex xs9>
              <div :style="{ 'overflow-y': 'scroll', 'height': '100vh' }">
                <v-card class="mb-5 elevation-0">
                  <v-layout column>
                    <v-flex>
                      <v-card-text>
                        <v-card class="mb-2">
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
                            <v-textarea v-model="task.exercises[index].task.task" label="Exercise" auto-grow ></v-textarea>
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
                            <v-textarea v-model="task.exercises[index].fullSolution.task" label="Full Solution" auto-grow ></v-textarea>
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
export default {
  data() {
    return {
      exercise: 1,
      task: null,
    };
  },
  computed: {
    steps() {
      return this.task ? this.task.exercises.length : 10;
    },
  },
  methods: {
    execute(index, field) {
      this.$http.post('http://mathpar.ukma.edu.ua/api/calc', { task: this.task.exercises[index][field].task })
        .then(({ body }) => {
          if (body.status === 'OK') {
            const latexArr = body.latex.split('\n');
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
        });
    },
    swap(index, field) {
      this.task.exercises[index][field].isLatex = !this.task.exercises[index][field].isLatex;
    },
    update() {
      const exercises = this.task.exercises.map(exercise => ({ text: exercise.task.task, fullSolution: exercise.fullSolution.task, answer: exercise.fullSolution.result }));
      this.$http.put(`task/${this.$route.params.id}`, Object.assign({}, this.task, { exercises, class: this.task.classNumber }));
    },
  },
  created() {
    this.$http.get(`task/${this.$route.params.id}`)
      .then(({ body }) => {
        const exercises = body.exercises.map(exercise => ({
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
};
</script>
