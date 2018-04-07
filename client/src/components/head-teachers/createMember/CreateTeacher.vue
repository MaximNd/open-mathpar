<template>
  <v-layout row>
    <v-dialog v-model="createTeacherDialog" max-width="900px">
      <v-btn color="primary" dark slot="activator">Create Teacher</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline primary--text">New Teacher</span>
        </v-card-title>
        <v-form @submit.prevent="createTeacher">
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="user.lastName" label="Last name" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="user.firstName" label="First name" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="user.middleName" label="Middle name" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-select
                    v-model="user.gender"
                    label="Gender"
                    :items="['Male', 'Female']"
                  ></v-select>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="user.email" label="Email" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="user.password" label="Password" type="password" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-dialog
            ref="teacherDialog"
            persistent
            v-model="modal"
            lazy
            full-width
            width="290px"
            :return-value.sync="user.birthday"
          >
            <v-text-field
              slot="activator"
              label="Birthday"
              v-model="user.birthday"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="user.birthday" scrollable>
              <v-spacer></v-spacer>
              <v-btn flat color="error" @click="modal = false">Cancel</v-btn>
              <v-btn flat color="success" @click="$refs.teacherDialog.save(user.birthday)">OK</v-btn>
            </v-date-picker>
          </v-dialog>
                </v-flex>
                <v-flex xs12>
                  <v-btn color="info" block @click="changeTeacherTimetableFields(1)">Add one field for teacher timetable</v-btn>
                </v-flex>
                <v-flex xs12 v-if="countTeacherTimetableFields > 0">
                  <v-btn color="error" block @click="changeTeacherTimetableFields(-1)">Delete one field from teacher timetable</v-btn>
                </v-flex>
                <v-flex xs12 v-for="(n, index) in countTeacherTimetableFields" :key="n">
                  <v-layout wrap>
                    <v-flex xs6>
                      <v-select
                        v-model="teacher.timetable[index].subjectId"
                        label="Subject"
                        autocomplete
                        :items="subjects"
                        item-text="name"
                        item-value="_id"
                      ></v-select>
                    </v-flex>
                    <v-flex xs6>
                      <v-select
                        v-model="teacher.timetable[index].groupId"
                        label="Group"
                        autocomplete
                        :items="groups"
                        item-text="group.name"
                        item-value="group._id"
                      ></v-select>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" flat @click.native="createTeacherDialog = false">Close</v-btn>
            <v-btn type="submit" color="success" flat @click.native="createTeacherDialog = false">Save</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        user: {
          firstName: '',
          middleName: '',
          lastName: '',
          gender: '',
          birthday: null,
          email: '',
          password: '',
          role: 'teacher'
          // ,
          // image: {
          //     type: String,
          //     required: false
          // }
        },
        teacher: {
          timetable: []
        },
        subjects: [],
        groups: [],
        countTeacherTimetableFields: 2,
        teacherBirthday: null,
        menu: false,
        modal: false,
        createTeacherDialog: false
      }
    },
    watch: {
      countTeacherTimetableFields(val, oldVal) {
        if (val > oldVal) {
          this.teacher.timetable.push({ subjectId: '', groupId: '' });
        } else {
          this.teacher.timetable.pop();
        }
      }
    },
    methods: {
      changeTeacherTimetableFields(on) {
        if (this.countTeacherTimetableFields <= 0 && on < 0) return;
        this.countTeacherTimetableFields += on;
      },
      createTeacher() {
        this.$store.dispatch('createTeacher', { user: this.user, teacher: this.teacher })
          .then(() => console.log('teacher was added'));
      }
    },
    created() {
      this.$http.get(`subjects`)
        .then(data => { this.subjects = data.body; });
      this.$http.get(`school/${this.$auth.user().clients[0].client.schoolId._id}/groups`)
        .then(data => { this.groups = data.body.groups; });
      for (let i = 0; i < this.countTeacherTimetableFields; ++i) {
        this.teacher.timetable.push({ subjectId: '', groupId: '' });
      }
    }
  }
</script>
