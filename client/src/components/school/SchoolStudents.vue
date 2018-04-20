<template>
  <v-container fluid fill-height>
    <v-layout row wrap>
      <v-flex d-flex xs12>
        <v-card>
          <v-card-title class="primary--text title">
            Students
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
                <router-link tag="img" :src="props.item.avatar" to="/student/1/profile"></router-link>
              </v-avatar></td>
              <td class="text-xs-right clickable"><router-link tag="span" to="/student/1/profile">{{ props.item.fullName }}</router-link></td>
              <td class="text-xs-right">{{ props.item.group }}</td>
              <td class="text-xs-right">{{ props.item.avgSRMark }}</td>
              <td class="text-xs-right">{{ props.item.avgKRMark }}</td>
              <td class="text-xs-right">{{ props.item.avgSRD }}</td>
              <td class="text-xs-right">{{ props.item.avgKRD }}</td>
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
          { text: 'Group', value: 'group' },
          { text: 'AVG SR Mark', value: 'avgSRMark' },
          { text: 'AVG KR Mark', value: 'avgKRMark' },
          { text: 'AVG SR Dispersion', value: 'avgSRD' },
          { text: 'AVG KR Dispersion', value: 'avgKRD' }
        ],
        items: [
          {
            value: false,
            avatar: 'https://randomuser.me/api/portraits/men/62.jpg',
            fullName: 'Name1 LastName1 MidName1',
            group: '1',
            avgSRMark: '12 | 12 | 1 | 2',
            avgKRMark: '12',
            avgSRD: '12 | 12 | 1 | 2',
            avgKRD: '45'
          },
          {
            value: false,
            avatar: 'https://randomuser.me/api/portraits/men/63.jpg',
            fullName: 'Name1 LastName1 MidName1',
            group: '2',
            avgSRMark: '12 | 12 | 1 | 2',
            avgKRMark: '78',
            avgSRD: '12 | 12 | 1 | 2',
            avgKRD: '12'
          },
          {
            value: false,
            avatar: 'https://randomuser.me/api/portraits/women/41.jpg',
            fullName: 'Name1 LastName1 MidName1',
            group: '3',
            avgSRMark: '12 | 12 | 1 | 2',
            avgKRMark: '98',
            avgSRD: '12 | 12 | 1 | 2',
            avgKRD: '100'
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
