<template>
    <v-layout wrap>
        <v-flex d-flex sm12 md5 lg4>
            <v-card>
                <template v-if="userAndClientsData.length !== 0">
                  <v-card-media :src="`http://mathpar.ukma.edu.ua/images/${$auth.user().image}`" height="450px">
                  </v-card-media>
                  <v-card-actions>
                    <v-btn block flat color="blue" @click="changeDataDialog = !changeDataDialog">Edit profile</v-btn>
                  </v-card-actions>
                </template>
            </v-card>
        </v-flex>
        <v-flex d-flex sm12 md7 lg8>
            <v-card>
                <v-card-title primary-title>
                    <div>
                        <div class="headline">Account data:</div>
                    </div>
                </v-card-title>
                <v-data-table
                  style="margin-top:-10px;"
                  :loading="userAndClientsData.length === 0"
                  :items="userAndClientsData"
                  hide-actions
                  :no-data-text="'Loading...'">
                    <template slot="items" slot-scope="props">
                        <td class="text-xs-left title">{{ props.item.title }}</td>
                        <td class="text-xs-left text">{{ props.item.text }}</td>
                    </template>
                </v-data-table>
            </v-card>
        </v-flex>
        <v-layout row justify-center>
            <appProfileChangeData @closeDialog="changeDataDialog = false" :changeDataDialog="changeDataDialog"></appProfileChangeData>
        </v-layout>
    </v-layout>
</template>


<script>
import ProfileChangeData from './ProfileChangeData.vue';

export default {
  data() {
    return {
      changeDataDialog: false,
    };
  },
  computed: {
    userData() {
      if (this.$store.getters.isLoggedInUser) {
        return this.userTableData(this.$auth.user());
      }
      return this.userTableData(this.$store.getters.otherUser);
    },
    clientsData() {
      if (this.$store.getters.isLoggedInUser) {
        return this.clientsTableData(this.$auth.user());
      }
      return this.clientsTableData(this.$store.getters.otherUser);
    },
    userAndClientsData() {
      return this.userData.concat(this.clientsData);
    },
  },
  methods: {
    userTableData(currentUser) {
      if (typeof currentUser === 'undefined') return [];
      const user = [
        { title: 'Full name', text: currentUser.fullName },
        { title: 'Gender', text: currentUser.gender },

        { title: 'Role', text: currentUser.role.map(role => `${role.charAt(0).toUpperCase()}${role.substring(1, role.length)}`).join(', ') },
        { title: 'Email', text: currentUser.email },
        { title: 'Birthday', text: new Date(currentUser.birthday).toDateString() },
        { title: 'Age', text: currentUser.age },
        // { title: 'School', text: 'School' },
        // { title: 'Group', text: 'Group' },
        // { title: 'Subjects', text: 'Subjects' }
      ];
      return user;
    },
    clientsTableData(currentUser) {
      if (typeof currentUser === 'undefined') return [];
      const res = [];
      currentUser.clients.forEach((client) => {
        if (client.clientRole === 'director' || client.clientRole === 'headTeacher') {
          res.push({ title: 'School', text: client.client.schoolId.name });
        } else if (client.clientRole === 'rector' || client.clientRole === 'dean') {
          res.push({ title: 'University', text: client.client.universityId.name });
        } else if (client.clientRole === 'teacher') {
          res.push({
            title: 'Subjects',
            text: client.client.timetable.map(lesson => lesson.subjectId.name).filter((subject, index, subjects) => subjects.indexOf(subject) === index).join(', '),
          });
        } else if (client.clientRole === 'student') {
          res.push({ title: 'AVG SR Mark', text: `${client.client.avgMarks.avgAllSR.avgAll.firstNumber} | ${client.client.avgMarks.avgAllSR.avgAll.secondNumber} | ${client.client.avgMarks.avgAllSR.avgAll.thirdNumber} | ${client.client.avgMarks.avgAllSR.avgAll.fourthNumber}` });
          res.push({ title: 'AVG KR Mark', text: client.client.avgMarks.avgAllKR == null ? 'No data yet' : client.client.avgMarks.avgAllKR });
          res.push({ title: 'AVG SR Dispersion', text: `${client.client.avgDispercion.allSr.firstNumber || 'No data yet'} | ${client.client.avgDispercion.allSr.secondNumber || 'No data yet'} | ${client.client.avgDispercion.allSr.thirdNumber || 'No data yet'} | ${client.client.avgDispercion.allSr.fourthNumber || 'No data yet'}` });
          res.push({ title: 'AVG KR Dispersion', text: client.client.avgDispercion.allKr == null ? 'No data yet' : client.client.avgDispercion.allKr });
          res.push({ title: 'School', text: client.client.schoolId.name });
        }
      });
      return res;
    },
  },
  components: {
    appProfileChangeData: ProfileChangeData,
  },
  created() {
    console.log(this.$auth.user());
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
