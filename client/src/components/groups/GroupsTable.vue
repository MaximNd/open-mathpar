<template>
    <v-layout row wrap>
        <v-flex d-flex xs12>
            <v-card>
                <v-card-title class="primary--text title">
                  Groups
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
                    v-bind:items="groups"
                    v-bind:search="search"
                  >
                  <template slot="items" slot-scope="props">
                    <td class="text-xs-left"><router-link :to="`/group/${props.item.group.id}`">{{ props.item.group.name }}</router-link></td>
                    <td class="text-xs-right">{{ props.item.studentsCount }}</td>
                    <td class="text-xs-right">{{ props.item.teachersCount }}</td>
                    <td class="text-xs-right">
                      {{ props.item.groupAVGMarks.avgSR.firstNumber || 'No data yet' }} |
                      {{ props.item.groupAVGMarks.avgSR.secondNumber || 'No data yet' }} |
                      {{ props.item.groupAVGMarks.avgSR.thirdNumber || 'No data yet' }} |
                      {{ props.item.groupAVGMarks.avgSR.fourthNumber || 'No data yet' }}
                    </td>
                    <td class="text-xs-right">
                      {{ props.item.groupAVGMarks.avgKR || 'No data yet' }}
                    </td>
                    <td class="text-xs-right">
                      {{ props.item.groupAVGDispersion.avgSR.firstNumber || 'No data yet' }} |
                      {{ props.item.groupAVGDispersion.avgSR.secondNumber || 'No data yet' }} |
                      {{ props.item.groupAVGDispersion.avgSR.thirdNumber || 'No data yet' }} |
                      {{ props.item.groupAVGDispersion.avgSR.fourthNumber || 'No data yet' }}
                    </td>
                    <td class="text-xs-right">{{ props.item.groupAVGDispersion.avgKR || 'No data yet' }}</td>
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
  data() {
    return {
      max25chars: v => v.length <= 25 || 'Input too long!',
      tmp: '',
      search: '',
      pagination: {},
      headers: [
        { text: 'Group name', align: 'left' },
        { text: 'Number of students\n', value: 'studentsCount' },
        { text: 'Number of teachers\n', value: 'teachersCount' },
        { text: 'AVG SR Mark', value: 'groupAVGMarks.avgSR' },
        { text: 'AVG KR Mark', value: 'groupAVGMarks.avgKR' },
        { text: 'AVG SR Dispersion', value: 'groupAVGDispersion.avgSR' },
        { text: 'AVG KR Dispersion', value: 'groupAVGDispersion.avgKR' },
      ],
    };
  },
  computed: {
    groups() {
      return this.$store.getters.groups;
    },
  },
  created() {
    const id = this.$auth.user().role.indexOf('methodist') !== -1
      ? this.$auth.user().clients[0].client.universityId._id
      : this.$auth.user().clients[0].client.schoolId._id
    this.$store.dispatch('getGroupsBySchoolId', { schoolId: id });
  },
};
</script>


<style scoped>
  .title {
    font-size: 22px;
    font-weight: bold;
  }
</style>
