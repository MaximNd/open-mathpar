<template>
  <v-layout wrap>
    <v-flex d-flex sm12 md5 lg4>
      <v-card>
        <v-card-media src="https://randomuser.me/api/portraits/women/72.jpg" height="450px">
        </v-card-media>
        <v-card-actions>
          <v-btn block flat color="blue" @click="changeHeadTeacherDataDialog = !changeHeadTeacherDataDialog">Edit profile</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex d-flex sm12 md7 lg8>
      <v-card>
        <v-card-title primary-title>
          <div>
            <div class="headline">Your account data:</div>
          </div>
        </v-card-title>
        <v-data-table :items="items" hide-actions hide-headers>
          <template slot="items" scope="props">
            <td class="text-xs-left title">{{ props.item.title }}</td>
            <td class="text-xs-left text">{{ props.item.text }}</td>
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
    <v-layout row justify-center>
      <appHeadTeacherProfileChangeData @closeDialog="changeHeadTeacherDataDialog = false" :changeHeadTeacherDataDialog="changeHeadTeacherDataDialog"></appHeadTeacherProfileChangeData>
    </v-layout>
  </v-layout>
</template>


<script>
import HeadTeacherProfileChangeData from './HeadTeacherProfileChangeData.vue';

export default {
  data() {
    return {
      changeHeadTeacherDataDialog: false,
      items: [
        { title: 'Full name', text: 'Name LastName MidName' },
        { title: 'Role', text: 'Student' },
        { title: 'Email', text: 'email@mail.com' },
        { title: 'Birthday', text: '1995-10-01' },
        { title: 'Age', text: '22' },
        { title: 'School', text: 'School' },
      ],
    };
  },
  components: {
    appHeadTeacherProfileChangeData: HeadTeacherProfileChangeData,
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
