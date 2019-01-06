<template>
  <v-dialog full-width lazy v-model="createLectureDialog">
    <v-btn color="success" dark slot="activator">Create Lecture</v-btn>
    <v-card>
      <v-card-title>
        <span class="headline primary--text">New Lecture</span>
      </v-card-title>
      <v-form @submit.prevent="createLecture">
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6>
                <v-text-field v-model="lecture.name" label="Lecture Name" required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6>
                <v-select
                  v-model="lecture.subjectId"
                  label="Subject"
                  autocomplete
                  :items="subjects"
                  item-text="name"
                  item-value="_id"
                ></v-select>
              </v-flex>
              <v-flex xs12>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-card>
                      <v-card-text>
                        <template v-if="lecture.text.length > 0">
                          <v-select
                            v-model="index"
                            label="Select TextField Number"
                            :items="textFieldsIndexes"
                            item-text="text"
                            item-value="value"
                          ></v-select>
                          <v-btn color="success" block @click="addTextField(index+1)">Add TextField afeter {{ index + 1 }}</v-btn>
                          <v-btn color="success" block @click="addTextField(index)">Add TextField before {{ index + 1 }}</v-btn>
                        </template>
                        <template v-else>
                          <v-btn color="success" block @click="addTextField(0)">Add One TextField Below</v-btn>
                        </template>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                  <v-flex xs12 v-for="(n, index) in lecture.text.length" :key="`lecture-text${index}`">
                    <v-card class="mb-1">
                      <v-card-title>
                        <span class="headline primary--text">TextField №{{ n }}</span>
                      </v-card-title>
                      <v-card-actions>
                        <v-container>
                          <v-layout>
                            <v-btn color="error" @click="deleteTextField(index)" >
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
                                  <v-btn color="primary" @click="execute(index)" >
                                    <v-icon left>play_arrow</v-icon>
                                    Execute
                                  </v-btn>
                                  <v-btn color="info" @click="swap(index)">
                                    <v-icon left>swap_horiz</v-icon>
                                    Swap
                                  </v-btn>
                                </v-flex>
                              </v-layout>
                            </v-container>
                          </v-card-actions>
                          <v-card-text class="original-input" v-show="!lecture.text[index].isLatex">
                            <v-textarea v-model="lecture.text[index].task" label="TextField" auto-grow ></v-textarea>
                          </v-card-text>
                          <v-card-text class="original-output" v-show="!lecture.text[index].isLatex">
                            <h3>Output: </h3>
                            <p>{{ lecture.text[index].result }}</p>
                          </v-card-text>
                          <v-card-text v-show="lecture.text[index].isLatex">
                            <div class="math-jax" id="latex_markup" v-html="lecture.text[index].latex">
                            </div>
                          </v-card-text>
                        </v-card>
                      </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" flat @click.native="createLectureDialog = false">Close</v-btn>
          <v-btn type="submit" color="success" flat @click.native="createLectureDialog = false">Save</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      lecture: {
        name: '',
        text: [],
        subjectId: undefined,
      },
      subjects: [],
      index: 0,
      textCount: 2,
      createLectureDialog: false,
    };
  },
  computed: {
    textFieldsIndexes() {
      return Array(...{ length: this.lecture.text.length }).map((_, index) => ({ value: Number(index), text: Number(index + 1) }));
    },
  },
  methods: {
    createLecture() {
      this.lecture.text = this.lecture.text.map(text => text.task);
      this.$store.dispatch('createLection', this.lecture)
        .then(() => {
          this.$alertify.success('Success');
        })
        .catch(() => {
          this.$alertify.error('Error! Try again later please.');
        });
    },
    execute(index) {
      this.$http.post('http://mathpar.ukma.edu.ua/api/calc', { task: this.lecture.text[index].task })
        .then(({ body }) => {
          if (body.status === 'OK') {
            const latexArr = body.latex.split('\n');
            const latex = latexArr.reduce((latex, latexArrEl) => {
              if (latexArrEl !== '') {
                latex += `<div>${latexArrEl}</div>`;
              }
              return latex;
            }, '');
            this.lecture.text[index].latex = latex;
            this.lecture.text[index].result = body.result;
            setTimeout(() => {
              this.$nextTick(() => {
                window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub]);
              });
            }, 0);
            if (!this.lecture.text[index].isLatex) {
              this.swap(index);
            }
          }
        });
    },
    swap(index) {
      this.lecture.text[index].isLatex = !this.lecture.text[index].isLatex;
    },
    addTextField(index) {
      this.lecture.text.splice(index, 0, {
        task: '',
        result: '',
        latex: '<p>No result yet</p>',
        isLatex: false,
      });
    },
    deleteTextField(index) {
      this.lecture.text.splice(index, 1);
    },
  },
  created() {
    this.$http.get('subjects')
      .then((data) => { this.subjects = data.body; });
    for (let i = 0; i < this.textCount; ++i) {
      this.lecture.text.push({
        task: '',
        result: '',
        latex: '<p>No result yet</p>',
        isLatex: false,
      });
    }
  },
};
</script>

<style>

</style>
