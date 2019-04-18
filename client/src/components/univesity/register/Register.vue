<template>
  <v-container fluid>
    <v-layout row wrap align-center justify-center>
      <v-flex sm12 md10 lg8 xl6>
        <v-card>
          <v-form @submit.prevent="registerUser" method="POST">
          <v-toolbar class="primary white--text title">
            <v-toolbar-title>
              <v-icon left>school</v-icon>
              Register University
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn flat class="grey--text text--lighten-4" :to="'/login'">
                <v-icon left class="mr-1">chevron_left</v-icon>
                <div class="x-padded">
                  Back to Login
                </div>
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>

          <v-card-text>

            <v-container grid-list-md>
              <div class="form-header">
                <v-icon left class="form-header-icon">assignment_ind</v-icon>
                <span class="form-header-text">Account Profile</span>
              </div>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="director.user.firstName" label="First name" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="director.user.lastName" label="Last name" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="director.user.middleName" label="Second name" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="director.user.email" label="Email" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="director.user.password" label="Password" type="password" required></v-text-field>
                </v-flex>
                <v-flex md4></v-flex>
                <v-flex  xs12 sm6 md4>
                  <v-dialog
                    ref="directorDialog"
                    persistent
                    v-model="modal"
                    lazy
                    full-width
                    width="290px"
                    :return-value.sync="director.user.birthday">
                    <v-text-field
                      slot="activator"
                      label="Birthday"
                      v-model="director.user.birthday"
                      prepend-icon="event"
                      readonly
                    ></v-text-field>
                    <v-date-picker v-model="director.user.birthday" scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="error" @click="modal = false">Cancel</v-btn>
                      <v-btn flat color="success" @click="$refs.directorDialog.save(director.user.birthday)">OK</v-btn>
                    </v-date-picker>
                  </v-dialog>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-radio-group row v-model="director.user.gender" class="justify-center">
                    <v-radio
                      v-for="n in ['Male', 'Female']"
                      :key="n"
                      :label="`${n}`"
                      :value="n"
                      class="radio-between"
                    ></v-radio>
                  </v-radio-group>
                </v-flex>
                <v-flex xs12 sm6 md4 class="avatar-button">
                  <v-btn raised block center color="info" @click="onPickFile('directorAvatar')">Upload Your Avatar</v-btn>
                  <input @change="onFilePicked($event, 'rector')" type="file" style="display:none;" ref="directorAvatar">
                </v-flex>
                <v-flex xs12 sm12 md12 class="x-flex">
                  <img ref="directorAvatarPreview" src="" height="140">
                </v-flex>
                
                <div class="form-header pt-4">
                  <v-icon left class="form-header-icon">school</v-icon>
                  <span class="form-header-text">University Profile</span>
                </div>
                <v-flex xs12 sm12 md12>
                  <v-text-field v-model="school.name" required label="Name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="school.country" required label="Country"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="school.region" required label="Region"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="school.city" required label="City"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="school.district" label="District"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md8>
                  <v-text-field v-model="school.address" required label="Address"></v-text-field>
                </v-flex>
                <!-- <v-flex xs12 v-if="authorityExist">
                  <v-select
                    v-bind:items="authorities"
                    v-model="authorityModel"
                    label="Select"
                    autocomplete
                  ></v-select>
                  <v-subheader>If you cannot find your authority you can create it.</v-subheader>
                  <v-btn @click="authorityExist = !authorityExist" raised color="info">Create authority</v-btn>
                </v-flex> -->
                <!-- <v-flex xs12 v-if="!authorityExist">
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
            ref="authorityDialog"
            persistent
            v-model="authorityModal"
            lazy
            full-width
            width="290px"
            :return-value.sync="authority.user.birthday"
          >
            <v-text-field
              slot="activator"
              label="Birthday"
              v-model="authority.user.birthday"
              prepend-icon="event"
              readonly
            ></v-text-field>
            <v-date-picker v-model="authority.user.birthday" scrollable>
              <v-spacer></v-spacer>
              <v-btn flat color="error" @click="modal = false">Cancel</v-btn>
              <v-btn flat color="success" @click="$refs.authorityDialog.save(authority.user.birthday)">OK</v-btn>
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
                        <img ref="authorityAvatarPreview" src="" height="140">
                      </v-flex>
                    </v-layout>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field v-model="authority.company" label="Company Name" required></v-text-field>
                  </v-flex>
                </v-flex> -->
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-flex md6 offset-md3>
              <v-btn block type="submit" color="primary" class='reg-but'>Submit Registration<v-icon right>send</v-icon></v-btn>
            </v-flex>
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
      testFormData: new FormData(),
      director: {
        user: {
          lastName: '',
          firstName: '',
          middleName: '',
          gender: '',
          email: '',
          password: '',
          birthday: null,
          role: 'rector',
          image: '',
        },
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
        address: '',
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
          image: '',
        },
        company: '',
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
        'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
      ],
      menu: false,
      modal: false,
      authorityModel: null,
      authorityModal: false,
      authorityExist: true,
    };
  },
  methods: {
    registerUser() {
      this.testFormData = new FormData();
      this.testFormData.append('rector', JSON.stringify(this.director));
      this.testFormData.append('university', JSON.stringify(this.school));
      //this.testFormData.append('authority', JSON.stringify(this.authority));
      // this.testFormData.append('obj', { test: 'value', test2: [1, 2, 3, 4], test3: { key: 1234 } });
      // console.log(this.testFormData);
      // this.$http.post('user/signup', this.testFormData).then(res => console.log(res));
      // this.$auth.register(this.testFormData);
      this.$auth.register({
        body: this.testFormData,
      });
    },
    onPickFile(who) {
      this.$refs[who].click();
    },
    onFilePicked(event, who) {
      this.testFormData.append(who, event.target.files[0]);
      // let fileReader = new FileReader();
      this.$refs[`${who}AvatarPreview`].setAttribute('src', URL.createObjectURL(event.target.files[0]));
      // fileReader.onload = (e) => {
      //     this.$refs[`${who}AvatarPreview`].setAttribute('src', e.target.result);
      // };
      // fileReader.readAsDataURL(event.target.files[0]);
    },
  },
  created() {
    console.log(this.$refs);
    // this.testFormData = new FormData(this.$refs.form);
  },
};
</script>


<style>
  .title {
    font-size: 22px;
    font-weight: 400;
  }
  .x-padded {
    padding-top: 2px;
  }
  .form-header {
    font-size: 2em;
  }
  .form-header-icon {
    font-size: 1.1em;
    color: rgba(0,0,0,0.75);
    padding-bottom: 1px;
  }
  .radio-between {
    padding-left: 15px;
  }
  .avatar-button {
    margin-top: 3px;
  }
  .x-flex {
    display: flex;
    justify-content: center;
  }
  .reg-but {
    height: 42px;
    font-size: 15px;
    margin-bottom: 12px!important;
  }
</style>
