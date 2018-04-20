<template>
  <v-container fluid fill-height>
    <v-layout row wrap>
      <v-flex d-flex xs12>
  <v-card>
    <v-card-title class="primary--text title">
      Filials
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
        <td class="text-xs-left clickable"><router-link tag="span" to="/app/school/1">{{ props.item.schoolName }}</router-link></td>
        <td class="text-xs-right">{{ props.item.director }}</td>
        <td class="text-xs-right">{{ props.item.address }}</td>
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
          { text: 'School', align: 'left', value: 'schoolName' },
          { text: 'Director', value: 'director' },
          { text: 'Address', value: 'address' }
        ],
        items: [
          {
            value: false,
            schoolName: 'School 1',
            director: 'Director 1',
            address: 'Address 1 afrarfd.12,fc'
          },
          {
            value: false,
            schoolName: 'School 2',
            director: 'Director 2',
            address: 'Address 2 afrarfd.12,fc'
          },
          {
            value: false,
            schoolName: 'School 3',
            director: 'Director 3',
            address: 'Address 3 afrarfd.12,fc'
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
