<template>
    <v-layout row wrap>
        <v-flex d-flex xs12>
            <v-card>
                <v-card-title class="primary--text title">
                  {{ $t('groups.groupsTable.name') }}
                  <v-spacer></v-spacer>
                  <v-text-field
                    append-icon="search"
                    :label="$t('utils.labels.search')"
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
                    <td class="text-xs-left">
                      <router-link :to="`/group/${props.item.group.id}`">{{ props.item.group.name }}
                    </router-link></td>
                    <td class="text-xs-right">{{ props.item.studentsCount }}</td>
                    <td class="text-xs-right">{{ props.item.teachersCount }}</td>
                    <td class="text-xs-right">
                      {{ props.item.groupAVGMarks.avgSR.firstNumber || $t('utils.data.noDataYet') }} |
                      {{ props.item.groupAVGMarks.avgSR.secondNumber || $t('utils.data.noDataYet') }} |
                      {{ props.item.groupAVGMarks.avgSR.thirdNumber || $t('utils.data.noDataYet') }} |
                      {{ props.item.groupAVGMarks.avgSR.fourthNumber || $t('utils.data.noDataYet') }}
                    </td>
                    <td class="text-xs-right">
                      {{ props.item.groupAVGMarks.avgKR || $t('utils.data.noDataYet') }}
                    </td>
                    <td class="text-xs-right">
                      {{ props.item.groupAVGDispersion.avgSR.firstNumber || $t('utils.data.noDataYet') }} |
                      {{ props.item.groupAVGDispersion.avgSR.secondNumber || $t('utils.data.noDataYet') }} |
                      {{ props.item.groupAVGDispersion.avgSR.thirdNumber || $t('utils.data.noDataYet') }} |
                      {{ props.item.groupAVGDispersion.avgSR.fourthNumber || $t('utils.data.noDataYet') }}
                    </td>
                    <td class="text-xs-right">{{ props.item.groupAVGDispersion.avgKR || $t('utils.data.noDataYet') }}</td>
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
      pagination: {}
    };
  },
  computed: {
    headers() {
      return [
        { text: this.$t('groups.groupsTable.groupName'), align: 'left' },
        { text: this.$t('groups.groupsTable.numberOfStudents'), align: 'right', value: 'studentsCount' },
        { text: this.$t('groups.groupsTable.numberOfTeachers'), align: 'right', value: 'teachersCount' },
        { text: this.$t('groups.groupsTable.AVGSRMark'), align: 'right', value: 'groupAVGMarks.avgSR' },
        { text: this.$t('groups.groupsTable.AVGKRMark'), align: 'right', value: 'groupAVGMarks.avgKR' },
        { text: this.$t('groups.groupsTable.AVGSRDispersion'), align: 'right', value: 'groupAVGDispersion.avgSR' },
        { text: this.$t('groups.groupsTable.AVGKRDispersion'), align: 'right', value: 'groupAVGDispersion.avgKR' }
      ];
    },
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
