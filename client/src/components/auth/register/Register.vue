<template>
  <v-container fluid>
    <v-layout row wrap align-center justify-center>
      <v-flex sm12 md10 lg8 xl6>
        <v-card>
          <v-form @submit.prevent="registerUser" method="POST">
          <v-card-title class="primary white--text title">
            Register
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="director.user.lastName" label="Last name" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="director.user.firstName" label="First name" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="director.user.middleName" label="Middle name" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-select
                    v-model="director.user.gender"
                    label="Gender"
                    :items="['Man', 'Women']"
                  ></v-select>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="director.user.email" label="Email" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="director.user.password" label="Password" type="password" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-dialog
                    persistent
                    v-model="modal"
                    lazy
                    full-width
                  >
                    <v-text-field
                      slot="activator"
                      label="Birthday"
                      v-model="director.user.birthday"
                      prepend-icon="event"
                      readonly
                      required
                    ></v-text-field>
                    <v-date-picker v-model="director.user.birthday" scrollable actions>
                      <template slot-scope="{ save, cancel }">
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                          <v-btn flat color="primary" @click="save">OK</v-btn>
                        </v-card-actions>
                      </template>
                    </v-date-picker>
                  </v-dialog>
                </v-flex>
                <v-flex xs12>
                  <v-layout row>
                    <v-flex xs6>
                      <v-btn raised color="info" @click="onPickFile('directorAvatar')">Upload Your Avatar</v-btn>
                      <input @change="onFilePicked($event, 'director')" type="file" style="display:none;" ref="directorAvatar">
                    </v-flex>
                    <v-flex xs6>
                      <img :src="director.user.image.data" height="140">
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="school.name" required label="School name"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="school.number" label="School number"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="school.country" required label="Country"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="school.region" required label="Region"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="school.city" required label="City"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="school.district" label="District"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="school.address" required label="School address"></v-text-field>
                </v-flex>
                <v-flex xs12 v-if="authorityExist">
                  <v-select
                    v-bind:items="authorities"
                    v-model="authorityModel"
                    label="Select"
                    autocomplete
                  ></v-select>
                  <v-subheader>If you cannot find your authority you can create it.</v-subheader>
                  <v-btn @click="authorityExist = !authorityExist" raised color="info">Create authority</v-btn>
                </v-flex>
                <v-flex xs12 v-if="!authorityExist">
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="authority.user.lastName" label="Last name" required></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="authority.user.firstName" label="First name" required></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md4>
                    <v-text-field v-model="authority.user.middleName" label="Middle name" required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-select
                      v-model="authority.user.gender"
                      label="Gender"
                      :items="['Man', 'Women']"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field v-model="authority.user.email" label="Email" required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field v-model="authority.user.password" label="Password" type="password" required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-dialog
                      persistent
                      v-model="authorityModal"
                      lazy
                      full-width
                    >
                      <v-text-field
                        slot="activator"
                        label="Birthday"
                        v-model="authority.user.birthday"
                        prepend-icon="event"
                        readonly
                        required
                      ></v-text-field>
                      <v-date-picker v-model="authority.user.birthday" scrollable actions>
                        <template slot-scope="{ save, cancel }">
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                            <v-btn flat color="primary" @click="save">OK</v-btn>
                          </v-card-actions>
                        </template>
                      </v-date-picker>
                    </v-dialog>
                  </v-flex>
                  <v-flex xs12>
                    <v-layout row>
                      <v-flex xs6>
                        <v-btn raised color="info" @click="onPickFile('authorityAvatar')">Upload Authority Avatar</v-btn>
                        <input @change="onFilePicked($event, 'authority')" type="file" style="display:none;" ref="authorityAvatar">
                      </v-flex>
                      <v-flex xs6>
                        <img :src="authority.user.image.data" height="140">
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field v-model="authority.company" label="Company Name" required></v-text-field>
                  </v-flex>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions class="pl-3 pb-4">
            <v-btn type="submit" color="primary">Register<v-icon right>send</v-icon></v-btn>
          </v-card-actions>
          </v-form>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
  export default {
    data() {
      return {
        director: {
          user: {
            lastName: '',
            firstName: '',
            middleName: '',
            gender: '',
            email: '',
            password: '',
            birthday: null,
            role: 'director',
            image: {
              data: '',
              name: ''
            }
          }
          // ,
          // isMainDirector: true,
          // access: false
        },
        school: {
          name: '',
          number: '',
          isPhilial: false,
          country: '',
          region: '',
          city: '',
          district: '',
          address: ''
        },
        authority: {
          user: {
            lastName: '',
            firstName: '',
            middleName: '',
            gender: '',
            email: '',
            password: '',
            birthday: null,
            role: 'admin',
            image: {
              data: '',
              name: ''
            }
          },
          company: ''
        },
        authorities: [
          'Alabama', 'Alaska', 'American Samoa', 'Arizona',
          'Arkansas', 'California', 'Colorado', 'Connecticut',
          'Delaware', 'District of Columbia', 'Federated States of Micronesia',
          'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho',
          'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
          'Louisiana', 'Maine', 'Marshall Islands', 'Maryland',
          'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
          'Missouri', 'Montana', 'Nebraska', 'Nevada',
          'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
          'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio',
          'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
          'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
          'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia',
          'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
        ],
        menu: false,
        modal: false,
        authorityModel: null,
        authorityModal: false,
        authorityExist: true
      };
    },
    methods: {
      registerUser() {
        // this.$http.post('user/signup', this.data).then(res => console.log(res));
        this.$auth.register({
          body: { director: this.director, school: this.school, authority: this.authority }
        });
      },
      onPickFile(who) {
        this.$refs[who].click();
      },
      onFilePicked(event, who) {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(event.target.files[0]);

        fileReader.onload = (e) => {
            this[who].user.image.data = e.target.result;
            this[who].user.image.name = event.target.files[0].name;
        };
      }
    }
  };
</script>


<style>
  .title {
    font-size: 22px;
    font-weight: 400;
  }
</style>
