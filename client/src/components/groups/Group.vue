<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-card>
        <v-card-title class="primary--text title">
          <v-layout row >
            <v-flex xs12 sm6>
              Group: {{ group.group.name }}
            </v-flex>
          </v-layout>
        </v-card-title>
      </v-card>
      <v-card class="mt-1">
        <v-card-title class="primary--text title">
          <v-layout row justify-space-between>
            <v-flex xs12 sm6>
              AVG SR Marks
            </v-flex>
            <v-flex xs12 sm6 class="text-xs-right">
              AVG SR Dispersion
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-card-text>
          <v-layout row justify-space-between>
            <v-flex xs12 sm6>
              {{ group.groupAVGMarks.avgSR.firstNumber == null ? 'No data yet' : group.groupAVGMarks.avgSR.firstNumber }} |
              {{ group.groupAVGMarks.avgSR.secondNumber == null ? 'No data yet' : group.groupAVGMarks.avgSR.secondNumber }} |
              {{ group.groupAVGMarks.avgSR.thirdNumber == null ? 'No data yet' : group.groupAVGMarks.avgSR.thirdNumber }} |
              {{ group.groupAVGMarks.avgSR.fourthNumber == null ? 'No data yet' : group.groupAVGMarks.avgSR.fourthNumber }}
            </v-flex>
            <v-flex xs12 sm6 class="text-xs-right">
              {{ group.groupAVGDispersion.avgSR.firstNumber == null ? 'No data yet' : group.groupAVGDispersion.avgSR.firstNumber }} |
              {{ group.groupAVGDispersion.avgSR.secondNumber == null ? 'No data yet' : group.groupAVGDispersion.avgSR.secondNumber }} |
              {{ group.groupAVGDispersion.avgSR.thirdNumber == null ? 'No data yet' : group.groupAVGDispersion.avgSR.thirdNumber }} |
              {{ group.groupAVGDispersion.avgSR.fourthNumber == null ? 'No data yet' : group.groupAVGDispersion.avgSR.fourthNumber }}
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
      <v-card class="mt-1">
        <v-card-title class="primary--text title">
          <v-layout row>
            <v-flex xs12 sm6>
              AVG KR Marks
            </v-flex>
            <v-flex xs12 sm6 class="text-xs-right">
              AVG KR Dispersion
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-card-text>
          <v-layout row>
            <v-flex xs12 sm6>
              {{ group.groupAVGMarks.avgKR == null ? 'No data yet' : group.groupAVGMarks.avgKR }}
            </v-flex>
            <v-flex xs12 sm6 class="text-xs-right">
              {{ group.groupAVGDispersion.avgKR == null ? 'No data yet' : group.groupAVGDispersion.avgKR }}
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
      <v-card class="mt-1">
        <v-card-title class="primary--text title">
          Students
          <v-spacer></v-spacer>
          <v-text-field
            append-icon="search"
            label="Search"
            single-line
            hide-details
            v-model="seachStudent"
          ></v-text-field>
        </v-card-title>
        <v-data-table
          v-bind:headers="studentHeaders"
          v-bind:items="group.members[0].students"
          v-bind:search="seachStudent"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left clickable"><router-link tag="span" :to="`/profile/${props.item.user.id}`">{{ props.item.user.fullName }}</router-link></td>
            <td class="text-xs-right">{{ props.item.user.age }}</td>
            <td class="text-xs-right">
              {{ props.item.clients.find(client => client.clientRole === 'student').client.avgMarks.avgAllSR.avgAll.firstNumber == null ? 'No data yet' : props.item.clients.find(client => client.clientRole === 'student').client.avgMarks.avgAllSR.avgAll.firstNumber }} |
              {{ props.item.clients.find(client => client.clientRole === 'student').client.avgMarks.avgAllSR.avgAll.secondNumber == null ? 'No data yet' : props.item.clients.find(client => client.clientRole === 'student').client.avgMarks.avgAllSR.avgAll.secondNumber }} |
              {{ props.item.clients.find(client => client.clientRole === 'student').client.avgMarks.avgAllSR.avgAll.thirdNumber == null ? 'No data yet' : props.item.clients.find(client => client.clientRole === 'student').client.avgMarks.avgAllSR.avgAll.thirdNumber }} |
              {{ props.item.clients.find(client => client.clientRole === 'student').client.avgMarks.avgAllSR.avgAll.fourthNumber == null ? 'No data yet' : props.item.clients.find(client => client.clientRole === 'student').client.avgMarks.avgAllSR.avgAll.fourthNumber }}
            </td>
            <td class="text-xs-right">{{ props.item.clients.find(client => client.clientRole === 'student').client.avgMarks.avgAllKR || 'No data yet' }}</td>
            <td class="text-xs-right">
              {{ props.item.clients.find(client => client.clientRole === 'student').client.avgDispercion.allSr.firstNumber == null ? 'No data yet' : props.item.clients.find(client => client.clientRole === 'student').client.avgDispercion.allSr.firstNumber }} |
              {{ props.item.clients.find(client => client.clientRole === 'student').client.avgDispercion.allSr.secondNumber == null ? 'No data yet' : props.item.clients.find(client => client.clientRole === 'student').client.avgDispercion.allSr.secondNumber }} |
              {{ props.item.clients.find(client => client.clientRole === 'student').client.avgDispercion.allSr.thirdNumber == null ? 'No data yet' : props.item.clients.find(client => client.clientRole === 'student').client.avgDispercion.allSr.thirdNumber }} |
              {{ props.item.clients.find(client => client.clientRole === 'student').client.avgDispercion.allSr.fourthNumber == null ? 'No data yet' : props.item.clients.find(client => client.clientRole === 'student').client.avgDispercion.allSr.fourthNumber }}
            </td>
            <td class="text-xs-right">{{ props.item.clients.find(client => client.clientRole === 'student').client.avgDispercion.allKr || 'No data yet' }}</td>
          </template>
          <template slot="pageText" slot-scope="{ pageStart, pageStop }">
            From {{ pageStart }} to {{ pageStop }}
          </template>
        </v-data-table>
      </v-card>

      <v-card class="mt-1">
        <v-card-title class="primary--text title">
          Teachers
          <v-spacer></v-spacer>
          <v-text-field
            append-icon="search"
            label="Search"
            single-line
            hide-details
            v-model="seachTeacher"
          ></v-text-field>
        </v-card-title>
        <v-data-table
          v-bind:headers="teacherHeaders"
          v-bind:items="group.members[1].teachers"
          v-bind:search="seachTeacher"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left clickable"><router-link tag="span" :to="`/profile/${props.item.user.id}`">{{ props.item.user.fullName }}</router-link></td>
            <td class="text-xs-left">{{ props.item.user.email }}</td>
          </template>
          <template slot="pageText" slot-scope="{ pageStart, pageStop }">
            From {{ pageStart }} to {{ pageStop }}
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data () {
      return {
        max25chars: (v) => v.length <= 25 || 'Input too long!',
        tmp: '',
        seachStudent: '',
        seachTeacher: '',
        pagination: {},
        studentHeaders: [
          { text: 'Full Name', align: 'left', value: 'user.fullName' },
          { text: 'Age', value: 'user.age' },
          { text: 'AVG SR Mark' },
          { text: 'AVG KR Mark' },
          { text: 'AVG SR Dispersion' },
          { text: 'AVG KR Dispersion' }
        ],
        teacherHeaders: [
          { text: 'Full Name', align: 'left', value: 'name' },
          { text: 'Email', align: 'left', value: 'age' }
        ],
        items: [
          {
            value: false,
            name: 'Frozen Yogurt',
            age: 159,
            carbs: 24,
            protein: 4.0,
            sodium: 87,
            calcium: '14%'
          },
          {
            value: false,
            name: 'Ice cream sandwich',
            age: 237,
            carbs: 37,
            protein: 4.3,
            sodium: 129,
            calcium: '8%'
          },
          {
            value: false,
            name: 'Eclair',
            age: 262,
            carbs: 23,
            protein: 6.0,
            sodium: 337,
            calcium: '6%'
          },
          {
            value: false,
            name: 'Cupcake',
            age: 305,
            carbs: 67,
            protein: 4.3,
            sodium: 413,
            calcium: '3%'
          },
          {
            value: false,
            name: 'Gingerbread',
            age: 356,
            carbs: 49,
            protein: 3.9,
            sodium: 327,
            calcium: '7%'
          },
          {
            value: false,
            name: 'Jelly bean',
            age: 375,
            carbs: 94,
            protein: 0.0,
            sodium: 50,
            calcium: '0%'
          },
          {
            value: false,
            name: 'Lollipop',
            age: 392,
            carbs: 98,
            protein: 0,
            sodium: 38,
            calcium: '0%'
          },
          {
            value: false,
            name: 'Honeycomb',
            age: 408,
            carbs: 87,
            protein: 6.5,
            sodium: 562,
            calcium: '0%'
          },
          {
            value: false,
            name: 'Donut',
            age: 452,
            carbs: 51,
            protein: 4.9,
            sodium: 326,
            calcium: '2%'
          },
          {
            value: false,
            name: 'KitKat',
            age: 518,
            carbs: 65,
            protein: 7,
            sodium: 54,
            calcium: '12%'
          }
        ]
      }
    },
    computed: {
      group() {
        return this.$store.getters.group;
      }
    },
    created() {
      this.$store.dispatch('getGroupById', { groupId: this.$route.params.id });
    }
  }
</script>


<style>
  .title {
    font-size: 22px;
    font-weight: 400;
  }
  .clickable {
    cursor: pointer;
  }
</style>
