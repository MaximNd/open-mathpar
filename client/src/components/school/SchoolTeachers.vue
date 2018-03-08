<template>
  <v-container fluid fill-height>
    <v-layout row wrap>
      <v-flex d-flex xs12>
        <v-card>
          <v-card-title class="primary--text title">
            Teachers
            <v-spacer></v-spacer>
            <v-text-field
              append-icon="search"
              label="Search"
              single-line
              hide-details
              v-model="search"
            ></v-text-field>
          </v-card-title>
          <v-data-table
            v-bind:headers="headers"
            v-bind:items="items"
            v-bind:search="search"
          >
            <template slot="items" slot-scope="props">
              <td class="text-xs-left clickable"><v-avatar size="44px" slot="activator">
                <router-link tag="img" :src="props.item.avatar" to="/teacher/1/profile"></router-link>
              </v-avatar></td>
              <td class="text-xs-right clickable"><router-link tag="span" to="/teacher/1/profile">{{ props.item.fullName }}</router-link></td>
              <td class="text-xs-right">{{ props.item.subjects }}</td>
            </template>
            <template slot="pageText" slot-scope="{ pageStart, pageStop }">
              From {{ pageStart }} to {{ pageStop }}
            </template>
          </v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
  export default {
    data () {
      return {
        max25chars: (v) => v.length <= 25 || 'Input too long!',
        tmp: '',
        search: '',
        pagination: {},
        headers: [
          { text: 'Avatar', align: 'left', value: 'avatar' },
          { text: 'Full Name', value: 'fullName' },
          { text: 'Subjects', value: 'subjects' }
        ],
        items: [
          {
            value: false,
            avatar: 'https://randomuser.me/api/portraits/women/83.jpg',
            fullName: 'Name1 LastName1 MidName1',
            subjects: 'Subject1'
          },
          {
            value: false,
            avatar: 'https://randomuser.me/api/portraits/men/82.jpg',
            fullName: 'Name2 LastName2 MidName2',
            subjects: 'Subject1, Subject2, Subject3'
          },
          {
            value: false,
            avatar: 'https://randomuser.me/api/portraits/women/81.jpg',
            fullName: 'Name3 LastName3 MidName3',
            subjects: 'Subject1, Subject2'
          }
        ]
      }
    }
  }
</script>


<style scoped>
  .title {
    font-size: 22px;
    font-weight: bold;
  }
  .clickable {
    cursor: pointer;
  }
</style>
