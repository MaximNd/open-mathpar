<template>
  <v-card v-if="!task.isTest">
    <v-card-title>
      <h4 class="headline">
        Task: {{ task.name }}
      </h4>
    </v-card-title>
    <v-card-text>
      <v-container fluid grid-list-md>
        <v-data-iterator
          content-tag="v-layout"
          row
          wrap
          :items="variants"
          :rows-per-page-items="rowsPerPageItems"
          :pagination.sync="pagination"
        >
          <v-flex
            slot="item"
            slot-scope="props"
            xs12
            sm6
            md4
            lg3
          >
            <v-card class="elevation-1">
              <v-card-title>
                <h4>Variant №{{ props.item.variantNumber }}</h4>
                <v-spacer></v-spacer>
                <v-dialog v-model="addStudentsDialogs[props.index]" max-width="400px">
                  <v-btn color="success" slot="activator">Add Students</v-btn>
                  <v-card>
                    <v-card-title>
                      <span
                        class="headline">
                        Add Students to Variant №{{ props.item.variantNumber }}
                      </span>
                    </v-card-title>
                    <v-card-text>
                      <v-list>
                        <v-list-tile
                          v-for="availableStudent in availableStudents"
                          :key="`available-student-${availableStudent.id}`">
                          <v-list-tile-action>
                            <v-checkbox
                              v-model="selectedStudents"
                              :value="availableStudent"
                              return-object></v-checkbox>
                          </v-list-tile-action>

                          <v-list-tile-content>
                            <v-list-tile-title>
                              {{ availableStudent.userId.fullName }}
                            </v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </v-list>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="error"
                        flat
                        @click.native="clearSelectedStudents(props.index)">
                        Close
                      </v-btn>
                      <v-btn
                        color="success"
                        flat
                        @click.native="addStudentsToVariant(props.item.variantNumber, props.index)">
                        Add Students
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-card-title>
              <v-divider></v-divider>

              <v-list dense  class="scrollable-list">
                <v-list-tile
                  v-for="student in studentsByVariant[props.item.variantNumber]"
                  :key="`student-with-variant-${student.id}`">

                  <v-list-tile-content>
                    <v-list-tile-title>
                      <router-link
                        :to="`/profile/${student.userId.id}`">
                        {{ student.userId.fullName }}
                      </router-link>
                    </v-list-tile-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-btn
                      small
                      color="error"
                      @click="removeStudentFromVariant(student, props.item.variantNumber)">
                      Remove
                    </v-btn>
                  </v-list-tile-action>

                </v-list-tile>
              </v-list>
            </v-card>
          </v-flex>
        </v-data-iterator>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      required: true
    },
    task: {
      type: Object,
      required: true
    },
    students: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      rowsPerPageItems: [-1],
      pagination: {
        rowsPerPage: -1,
      },
      addStudentsDialogs: [],
      selectedStudents: [],
      studentsVariants: []
    };
  },
  watch: {
    // eslint-disable-next-line object-shorthand
    'task._id'() {
      this.reset();
      this.init();
    }
  },
  computed: {
    variants() {
      const variants = [];
      for (let i = 0; i < this.task.countOfVariants; ++i) {
        variants.push({ variantNumber: i + 1 });
      }
      return variants;
    },
    availableStudents() {
      return this.students.filter(
        student => this.studentsVariants.every(
          ({ studentId }) => (studentId !== student.id)
        )
      );
    },
    studentsByVariant() {
      return this.studentsVariants.reduce((studentsByVariant, { studentId, variant }) => {
        // eslint-disable-next-line no-shadow
        const student = this.students.find(student => student.id === studentId);
        if (studentsByVariant[variant]) {
          studentsByVariant[variant].push(student);
        } else {
          // eslint-disable-next-line no-param-reassign
          studentsByVariant[variant] = [student];
        }
        return studentsByVariant;
      }, {});
    },
  },
  methods: {
    init() {
      if (this.task.isTest) {
        this.selectedStudents = this.students.slice();
        this.addStudentsToVariant(1, 0);
      } else {
        for (let i = 0; i < this.task.countOfVariants; ++i) {
          this.addStudentsDialogs.push(false);
        }
      }
    },
    reset() {
      this.addStudentsDialogs = [];
      this.selectedStudents = [];
      this.studentsVariants = [];
    },
    addStudentToSelected(student) {
      this.selectedStudents.push(student);
    },
    clearSelectedStudents(index) {
      this.selectedStudents = [];
      this.addStudentsDialogs.splice(index, 1, false);
    },
    removeStudentFromVariant(student, variantNumber) {
      const indexToDelete = this.studentsVariants.findIndex(
        ({ studentId, variant }) => (variantNumber === variant && studentId === student.id)
      );
      if (indexToDelete >= 0) {
        this.studentsVariants.splice(indexToDelete, 1);
        this.$emit('input', this.studentsVariants);
      }
    },
    addStudentsToVariant(variantNumber, index) {
      this.selectedStudents.forEach((selectedStudent) => {
        this.studentsVariants.push({
          studentId: selectedStudent.id,
          variant: variantNumber
        });
      });
      if (index) {
        this.clearSelectedStudents(index);
      }
      this.$emit('input', this.studentsVariants);
    },
    groupStudentsByVariants() {
      const countOfSlices = Math.floor(this.students.length / this.task.countOfVariants) || 1;

      for (let i = 0; i < this.students.length; ++i) {
        this.selectedStudents = [this.students[i]];
        this.addStudentsToVariant((i % countOfSlices) + 1);
      }
    }
  },
  created() {
    this.init();
    this.groupStudentsByVariants();
  }
};
</script>

<style>

</style>
