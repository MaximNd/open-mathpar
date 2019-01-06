<template>
  <v-layout wrap>
    <v-flex d-flex sm12 md5 lg4>
      <v-card>
        <v-card-media src="https://randomuser.me/api/portraits/men/83.jpg" height="450px">
        </v-card-media>
        <v-card-actions>
          <v-btn block flat color="blue" @click="changeDirectorDataDialog = !changeDirectorDataDialog">Edit profile</v-btn>
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
      <appDirectorProfileChangeData @closeDialog="changeDirectorDataDialog = false" :changeDirectorDataDialog="changeDirectorDataDialog"></appDirectorProfileChangeData>
    </v-layout>
  </v-layout>
</template>


<script>
import DirectorProfileChangeData from './DirectorProfileChangeData.vue';

export default {
  data() {
    return {
      changeDirectorDataDialog: false,
      items: [
        { title: 'Full name', text: 'Nedashkivsky Maxim Valentinovich' },
        { title: 'Role', text: 'Director' },
        { title: 'Email', text: 'email@mail.com' },
        { title: 'Birthday', text: '1977-05-06' },
        { title: 'Age', text: '40' },
        { title: 'School', text: 'School' },
      ],
    };
  },
  components: {
    appDirectorProfileChangeData: DirectorProfileChangeData,
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
