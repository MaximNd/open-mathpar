<template>
  <v-card>
    <v-card-title>
      <span class="headline primary--text">{{ $t('headTeacher.createTeacher.newTeacher') }}</span>
    </v-card-title>
    <v-form @submit.prevent="createTeacher">
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
                  @click="$refs.teacherDialog.save(user.birthday)">
                  {{ $t('utils.button.ok') }}
                </v-btn>
              </v-date-picker>
            </v-dialog>
            </v-flex>
            <v-flex xs12>
              <v-btn
                color="info"
                block
                @click="changeTeacherTimetableFields(1)">
                {{ $t('headTeacher.createTeacher.addField') }}
              </v-btn>
            </v-flex>
            <v-flex xs12 v-if="countTeacherTimetableFields > 0">
              <v-btn
                color="error"
                block
                @click="changeTeacherTimetableFields(-1)">
                {{ $t('headTeacher.createTeacher.deleteField') }}
              </v-btn>
            </v-flex>
            <v-flex xs12 v-for="(n, index) in countTeacherTimetableFields" :key="n">
              <v-layout wrap>
                <v-flex xs6>
                  <v-select
                    v-model="teacher.timetable[index].subjectId"
                    :label="$t('utils.labels.subject')"
                    autocomplete
                    :items="subjects"
                    item-text="name"
                    item-value="_id"
                  ></v-select>
                </v-flex>
                <v-flex xs6>
                  <v-select
                    v-model="teacher.timetable[index].groupId"
                    :label="$t('utils.labels.group')"
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
        role: 'teacher',
        // ,
        // image: {
        //     type: String,
        //     required: false
        // }
      },
      teacher: {
        timetable: [],
      },
      subjects: [],
      groups: [],
      countTeacherTimetableFields: 2,
      teacherBirthday: null,
      menu: false,
      modal: false
    };
  },
  watch: {
    countTeacherTimetableFields(val, oldVal) {
      if (val > oldVal) {
        this.teacher.timetable.push({ subjectId: '', groupId: '' });
      } else {
        this.teacher.timetable.pop();
      }
    },
  },
  methods: {
    changeTeacherTimetableFields(on) {
      if (this.countTeacherTimetableFields <= 0 && on < 0) return;
      this.countTeacherTimetableFields += on;
    },
    createTeacher() {
      this.$store.dispatch('createTeacher', { user: this.user, teacher: this.teacher })
        .then(() => {
          this.$alertify.success(this.$t('utils.action.success'));
        })
        .catch(() => {
          this.$alertify.error(this.$t('utils.action.errorTryAgainLater'));
        });
    },
  },
  created() {
    this.$http.get('subjects')
      .then((data) => { this.subjects = data.body; });
    this.$http.get(`school/${this.$auth.user().clients[0].client.schoolId._id}/groups`)
      .then((data) => { this.groups = data.body.groups; });
    for (let i = 0; i < this.countTeacherTimetableFields; ++i) {
      this.teacher.timetable.push({ subjectId: '', groupId: '' });
    }
  },
};
</script>
