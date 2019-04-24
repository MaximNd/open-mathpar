<template>
  <v-card>
    <v-card-title>
      <span class="headline primary--text">New Student</span>
    </v-card-title>
    <v-form @submit.prevent="createStudent">
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
        ref="dialog"
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
          <v-btn flat color="success" @click="$refs.dialog.save(user.birthday)">OK</v-btn>
        </v-date-picker>
      </v-dialog>
            </v-flex>
            <v-flex xs6>
              <v-select
                v-model="student.classId"
                autocomplete
                label="Specialty"
                :items="classes"
                item-text="name"
                item-value="_id"
              ></v-select>
            </v-flex>
            <v-flex xs6>
              <v-select
                v-model="student.groupId"
                autocomplete
                label="Group"
                :items="groups"
                item-text="group.name"
                item-value="group._id"
              ></v-select>
            </v-flex>
          </v-layout>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn type="submit" color="success" button @click.native="createStudentDialog = false">Save</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      user: {
        firstName: '',
        middleName: '',
        lastName: '',
        gender: '',
        birthday: null,
        email: '',
        password: '',
        role: 'student',
      },
      student: {
        groupId: '',
        classId: '',
      },
      classes: [],
      groups: [],
      studentBirthday: null,
      menu: false,
      modal: false,
      createStudentDialog: false,
    };
  },
  methods: {
    createStudent() {
      this.$store.dispatch('createStudentsU', { user: this.user, groupId: this.student.groupId, classId: this.student.classId })
        .then(() => {
          this.$alertify.success('Success');
          this.user = {
            firstName: '',
            middleName: '',
            lastName: '',
            gender: '',
            birthday: null,
            email: '',
            password: '',
            role: 'student',
          };
          this.student = {
            groupId: '',
            classId: '',
          };
        })
        .catch(() => {
          this.$alertify.error('Error! Try again later please.');
        });
    },
  },
  created() {
    const id = this.$auth.user().clients[0].client.universityId._id
    console.log('schoolID: ', id);
    this.$http.get(`school/${id}/classes`)
      .then((data) => { this.classes = data.body; });
    this.$http.get(`school/${id}/groups`)
      .then((data) => { this.groups = data.body.groups; });
  },
};
</script>
