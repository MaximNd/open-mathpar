<template>
  <v-card>
    <v-card-text>
      <v-card class="elevation-1">
        <v-card-title>
          <p class="headline primary--text">Filters</p>
        </v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-layout row justify-space-between wrap>
              <v-flex xs3>
                <v-select
                  :items="[{ text: 'Find in this ' + schoolModel.toLowerCase(), value: true }, { text: 'Find in all schools', value: false }]"
                  item-text="text"
                  item-value="value"
                  v-model="filterData.thisSchool"
                  label="Select "
                  single-line
                ></v-select>
              </v-flex>
              <v-flex xs4>
                <v-select
                  :items="filterData.fetchTypes"
                  v-model="filterData.fetchType"
                  label="Select type"
                  single-line
                ></v-select>
              </v-flex>
              <v-flex v-if="!subjectId" xs3>
                <v-select
                  :items="filterData.subjects"
                  v-model="filterData.subjectId"
                  item-text="name"
                  item-value="_id"
                  label="Select subject"
                  single-line
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-text>
          <v-layout justify-end>
            <v-btn color="primary" @click="filterPlans">Filter plans</v-btn>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-card-text>
    <v-card-title class="title info--text">
      <v-spacer></v-spacer>
      <v-text-field
        append-icon="search"
        label="Search"
        single-line
        hide-details
        v-model="search"
      ></v-text-field>
    </v-card-title>

    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="plans"
        :search="search"
        item-key="_id"
        :loading="plansLoading"
        :no-data-text="plansNoDataText"
      >
        <template slot="items" slot-scope="props">
          <tr class="clickable" @click="setExpandedPlan(props, props.item)">
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.subjectId.name }}</td>
            <td class="text-xs-right"><router-link :to="`/profile/${props.item.teacherId.userId._id}`">{{ props.item.teacherId.userId.fullName }}</router-link></td>
            <td class="text-xs-right"><router-link :to="`/school/${props.item.teacherId.schoolId._id}`">{{ `№${props.item.teacherId.schoolId.number} ${props.item.teacherId.schoolId.name}` }}</router-link></td>
          </tr>
        </template>
        <template slot="expand" slot-scope="props">
          <v-card>
            <v-card-text>
              <appPlan @clicked-choose="emitPlanChoosed($event)" :planKey="'planInTable'" :chooseMode="chooseMode"></appPlan>
            </v-card-text>
          </v-card>
        </template>
        <template slot="pageText" slot-scope="{ pageStart, pageStop }">
          From {{ pageStart }} to {{ pageStop }}
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>


<script>
import Plan from '../../teachers/TeacherTimetableAndPlan/TeacherPlan.vue';

export default {
  props: {
    chooseMode: {
      type: Boolean,
      required: true,
    },
    subjectId: {
      type: String,
      required: false,
    },
    schoolModel: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      plansLoading: true,
      plansNoDataText: 'Loading...',
      filterData: {
        thisSchool: true,
        fetchTypes: ['allPlans', 'allYourPlans'],
        fetchType: undefined,
        subjects: [],
        subjectId: undefined,
      },
      search: '',
      pagination: {},
      headers: [
        {
          text: 'Plan', align: 'left', value: 'name', sortable: false, width: '20px',
        },
        {
          text: 'Subject', align: 'right', value: 'subjectId.name', sortable: false, width: '20px',
        },
        {
          text: 'Teacher', align: 'right', value: 'teacherId.userId.fullName', sortable: false, width: '20px',
        },
        {
          text: this.schoolModel, align: 'right', value: 'teacherId.schoolId.name', sortable: false, width: '20px',
        },
      ],
    };
  },
  computed: {
    plans() {
      return this.$store.getters.plans;
    },
  },
  methods: {
    filterPlans() {
      console.log('filter2');
      this.plansLoading = true;
      this.plansNoDataText = 'Loading...';
      this.$store.commit('SET_PLANS', undefined);
      const filter = {};
      if (this.filterData.thisSchool) {
        filter.schoolId = this.$auth.user().clients.find(client => client.clientRole !== 'admin').client.schoolId._id;
      } else {
        filter.schoolId = undefined;
      }
      if (this.filterData.fetchType && this.filterData.fetchType === 'allYourPlans') {
        filter.teacherId = this.$auth.user().clients.find(client => client.clientRole === 'teacher').client._id;
      }
      filter.fetchType = this.filterData.fetchType;
      if (this.subjectId) {
        filter.subjectId = this.subjectId;
      } else {
        filter.subjectId = this.filterData.subjectId;
      }
      this.$store.dispatch('getFilteredPlans', filter)
        .then(() => {
          this.plansLoading = false;
          this.plansNoDataText = 'No data available';
        });
    },
    setExpandedPlan(props, plan) {
      props.expanded = !props.expanded;
      this.$store.commit('SET_PLAN_IN_TABLE', plan);
    },
    emitPlanChoosed(planId) {
      this.$emit('plan-choosed', planId);
    },
  },
  components: {
    appPlan: Plan,
  },
  created() {
    this.$http.get('subjects')
      .then(({ body }) => {
        this.filterData.subjects = body;
        this.filterPlans();
      });
  },
};
</script>


<style>
  .clickable {
    cursor: pointer;
  }
</style>
