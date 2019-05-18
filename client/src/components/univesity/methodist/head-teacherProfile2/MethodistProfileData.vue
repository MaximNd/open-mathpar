<template>
  <v-layout wrap>
    <v-flex d-flex sm12 md5 lg4>
      <v-card>
        <v-card-media src="https://randomuser.me/api/portraits/women/72.jpg" height="450px">
        </v-card-media>
        <v-card-actions>
          <v-btn block flat color="blue" @click="changeMethodistDataDialog = !changeMethodistDataDialog">Edit profile</v-btn>
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
      <appMethodistProfileChangeData @closeDialog="changeMethodistDataDialog = false" :changeMethodistDataDialog="changeMethodistDataDialog"></appMethodistProfileChangeData>
    </v-layout>
  </v-layout>
</template>


<script>
import MethodistProfileChangeData from './MethodistProfileChangeData.vue';

export default {
  data() {
    return {
      changeMethodistDataDialog: false,
      items: [
        { title: 'Full name', text: 'Name LastName MidName' },
        { title: 'Role', text: 'Methodist' },
        { title: 'Email', text: 'email@mail.com' },
        { title: 'Birthday', text: '1995-10-01' },
        { title: 'Age', text: '22' },
        { title: 'University', text: 'University' },
      ],
    };
  },
  components: {
    appMethodistProfileChangeData: MethodistProfileChangeData,
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
