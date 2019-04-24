<template>
  <v-card>
    <v-card-title>
      <span class="headline primary--text">{{ $t('headTeacher.createStudent.newStudent') }}</span>
    </v-card-title>
    <v-form @submit.prevent="createStudent">
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 sm6 md4>
              <v-text-field
                v-model="user.lastName"
                :label="$t('utils.labels.lastName')"
                required></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field
                v-model="user.firstName"
                :label="$t('utils.labels.firstName')"
                required></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md4>
              <v-text-field
                v-model="user.middleName"
                :label="$t('utils.labels.midName')"
                required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-select
                v-model="user.gender"
                :label="$t('utils.labels.gender')"
                :items="['Male', 'Female']"
              ></v-select>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                v-model="user.email"
                :label="$t('utils.labels.email')"
                required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                v-model="user.password"
                :label="$t('utils.labels.password')"
                type="password"
                required></v-text-field>
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
                  :label="$t('utils.labels.birthday')"
                  v-model="user.birthday"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                <v-date-picker v-model="user.birthday" scrollable>
                  <v-spacer></v-spacer>
                  <v-btn
                    flat
                    color="error"
                    @click="modal = false">
                    {{ $t('utils.button.cancel') }}
                  </v-btn>
                  <v-btn
                    flat
                    color="success"
                    @click="$refs.dialog.save(user.birthday)">
                    {{ $t('utils.button.ok') }}
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-flex>
            <v-flex xs6>
              <v-select
                v-model="student.classId"
                autocomplete
                :label="$t('utils.labels.class')"
                :items="classes"
                item-text="name"
                item-value="_id"
              ></v-select>
            </v-flex>
            <v-flex xs6>
              <v-select
                v-model="student.groupId"
                autocomplete
                :label="$t('utils.labels.group')"
                :items="groups"
                item-text="group.name"
                item-value="group._id"
              ></v-select>
            </v-flex>
          </v-layout>
        </v-container>
        <small>{{ $t('utils.hint.indicatesRequiredField') }}</small>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          type="submit"
          color="success"
          flat>
          {{ $t('utils.button.create') }}
        </v-btn>
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
        // ,
        // image: {
        //     type: String,
        //     required: false
        // }
      },
      student: {
        groupId: '',
        classId: '',
      },
      classes: [],
      groups: [],
      studentBirthday: null,
      menu: false,
      modal: false
    };
  },
  methods: {
    createStudent() {
      this.$store.dispatch('createStudents', { user: this.user, groupId: this.student.groupId, classId: this.student.classId })
        .then(() => {
          this.$alertify.success(this.$t('utils.action.success'));
        })
        .catch(() => {
          this.$alertify.error(this.$t('utils.action.errorTryAgainLater'));
        });
    },
  },
  created() {
    console.log('schoolID: ', this.$auth.user().clients[0].client.schoolId._id);
    this.$http.get(`school/${this.$auth.user().clients[0].client.schoolId._id}/classes`)
      .then((data) => { this.classes = data.body; });
    this.$http.get(`school/${this.$auth.user().clients[0].client.schoolId._id}/groups`)
      .then((data) => { this.groups = data.body.groups; });
  },
};
</script>
