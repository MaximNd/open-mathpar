<template>
  <v-container fluid>
    <v-layout raw wrap>
      <v-flex xs8 offset-xs2>
        <v-card>
          <v-card-title class="primary--text title">
            <span class="headline">New Dean</span>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="createDean">
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="user.firstName" label="First name" required></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="user.lastName" label="Last name" required></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="user.middleName" label="Second name" required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field v-model="user.email" label="Email" required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field v-model="user.password" label="Password" type="password" required></v-text-field>
                  </v-flex>
                  <v-flex  xs12 sm6 md8>
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
                  <v-flex xs12 sm6 md4>
                    <v-radio-group row v-model="user.gender" class="justify-center">
                      <v-radio
                        v-for="n in ['Male', 'Female']"
                        :key="n"
                        :label="`${n}`"
                        :value="n"
                        class="radio-between"
                      ></v-radio>
                    </v-radio-group>
                  </v-flex>
                </v-layout>
              </v-container>
              <small>*all fields are required to fill</small>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn type="submit" color="success" flat>Save</v-btn>
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
        role: 'dean'
      },
      menu: false,
      modal: false,
    };
  },
  methods: {
    createDean() {
      this.$store.dispatch('createDean', { user: this.user })
        .then(() => {
          this.user = {
            firstName: '',
            middleName: '',
            lastName: '',
            gender: '',
            birthday: null,
            email: '',
            password: '',
            role: 'dean'
          };
          this.$alertify.success('Success');
        })
        .catch(() => {
          this.$alertify.error('Error! Try again later please.');
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
