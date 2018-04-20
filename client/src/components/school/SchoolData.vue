<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12>
  <v-card>
    <v-card-title class="primary--text title">Director</v-card-title>
    <v-card-text>
      <v-card>
        <v-card-text>
          <v-layout wrap align-center justify-space-beetween row spacer slot="header">
            <v-flex class="clickable" xs12 sm4 md4 lg2>
              <v-avatar size="100px" slot="activator">
                <router-link tag="img" :src="'https://randomuser.me/api/portraits/men/83.jpg'" to="/director/1/profile"></router-link>
              </v-avatar>
            </v-flex>
            <v-flex class="clickable" xs12 sm4 md4 lg4>
              <div class="title"><router-link tag="span" to="/director/1/profile">John Leider</router-link></div>
            </v-flex>
            <v-flex xs 12 sm4 md4 lg6
              class="grey--text"
              ellipsis
            >
              Thank you for joining us
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-card-text>
    <v-card-title class="primary--text title">
      School Data
    </v-card-title>
    <v-card-text>
      <v-data-table
        :items="items"
        class="elevation-2"
        hide-actions
        hide-headers
      >
        <template slot="items" slot-scope="props">
          <td style="width: 40%;" class="text-xs-left title">{{ props.item.name }}</td>
          <td class="text-xs-left">{{ props.item.val }}</td>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          {
            value: false,
            name: 'School',
            val: 159
          },
          {
            value: false,
            name: 'Address',
            val: 'asdf 112.fc'
          },
          {
            value: false,
            name: 'Number of Teachers',
            val: 100
          },
          {
            value: false,
            name: 'Number of Students',
            val: 262
          },
          {
            value: false,
            name: 'AVG SR Mark',
            val: 262
          },
          {
            value: false,
            name: 'AVG KR Mark',
            val: 262
          },
          {
            value: false,
            name: 'AVG SR Dispersion',
            val: 262
          },
          {
            value: false,
            name: 'AVG KR Dispersion',
            val: 262
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
