<template>
  <v-container fluid>
    <v-layout raw wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title class="primary--text title">
            <span class="headline">{{ $t('director.createHeadTeacher.newHeadTeacher') }}</span>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="createHeadTeacher">
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
                </v-layout>
              </v-container>
              <small>{{ $t('utils.hint.indicatesRequiredField') }}</small>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn type="submit" color="success" flat>{{ $t('utils.button.save') }}</v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
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
        role: 'headTeacher',
        // ,
        // image: {
        //     type: String,
        //     required: false
        // }
      },
      menu: false,
      modal: false,
    };
  },
  computed: {
    success() {
      return this.$t('utils.action.success');
    },
    error() {
      return this.$t('utils.action.errorTryAgainLater');
    }
  },
  methods: {
    createHeadTeacher() {
      this.$store.dispatch('createHeadTeacher', { user: this.user })
        .then(() => {
          this.$alertify.success(this.success);
        })
        .catch(() => {
          this.$alertify.error(this.error);
        });
    },
  },
};
</script>

<style scoped>
  .title {
    font-size: 22px;
    font-weight: 400;
  }
  .text {
    font-size: 18px;
  }
</style>
