<template>
  <v-card>
    <v-card-text>
      <v-dialog v-model="createTaskDialog" max-width="1800px">
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
                    <v-select
                      v-model="task.subjectId"
                      label="Subject"
                      autocomplete
                      :items="subjects"
                      item-text="name"
                      item-value="_id"
                    ></v-select>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field v-model="task.name" label="Task Name" required></v-text-field>
                  </v-flex>
                  <v-flex md12 lg6>
                    <v-radio-group v-model="task.isTest" row>
                      <v-radio label="Sr" :value="true"></v-radio>
                      <v-radio label="Kr" :value="false"></v-radio>
                    </v-radio-group>
                  </v-flex>
                  <v-flex xs12>
                    <v-layout wrap>
                      <v-flex xs12 v-for="(n, index) in exercisesCount" :key="index">
                        <v-card class="mt-1">
                          <v-card-title>
                            <span class="headline primary--text">Exercise №{{ n }}</span>
                          </v-card-title>
                          <v-card-text>
                            <v-text-field v-model="task.exercises[index].text" multi-line label="Task Text" required></v-text-field>
                            <v-text-field v-model="task.exercises[index].fullSolution" multi-line label="Full Solution" required></v-text-field>
                            <v-text-field v-model="task.exercises[index].answer" label="Answer" required></v-text-field>
                            <v-text-field v-model="task.exercises[index].description" multi-line label="Description"></v-text-field>
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
              <v-btn color="error" flat @click.native="createTaskDialog = false">Close</v-btn>
              <v-btn type="submit" color="success" flat @click.native="createTaskDialog = false">Save</v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
      <appTasksTable></appTasksTable>
    </v-card-text>
  </v-card>
</template>

<script>
  import TasksTable from './TasksTable.vue';

  export default {
    data() {
      return {
        task: {
          subjectId: '',
          name: '',
          isTest: true,
          exercises: []
        },
        subjects: [],
        exercisesCount: 10,
        createTaskDialog: false
      };
    },
    methods: {
      createTask() {
        this.$store.dispatch('createTask', this.task);
      }
    },
    created() {
      this.$http.get(`subjects`)
        .then(data => { this.subjects = data.body; });
      for (let i = 0; i < this.exercisesCount; ++i) {
        this.task.exercises.push({
          text: '',
          fullSolution: '',
          answer: '',
          description: ''
          // images: {
          //   type: [String],
          //   required: false
          // }
        });
      }
    },
    components: {
      appTasksTable: TasksTable
    }
  };
</script>

<style scoped>
  .title {
    font-size: 22px;
    font-weight: 400;
  }
</style>
