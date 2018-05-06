<template>
  <v-card>
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
        :loading="plans.length === 0"
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
              <appPlan></appPlan>
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
  import Plan from './../../teachers/TeacherTimetableAndPlan/TeacherPlan.vue';

  export default {
    data() {
      return {
        search: '',
        pagination: {},
        headers: [
          { text: 'Plan', align: 'left', value: 'name', sortable: false, width: '20px' },
          { text: 'Subject', align: 'right', value: 'subjectId.name', sortable: false, width: '20px' },
          { text: 'Teacher', align: 'right', value: 'teacherId.userId.fullName', sortable: false, width: '20px' },
          { text: 'School', align: 'right', value: 'teacherId.schoolId.name', sortable: false, width: '20px' }
        ]
      };
    },
    computed: {
      plans() {
        return this.$store.getters.plans;
      }
    },
    methods: {
      setExpandedPlan(props, plan) {
        props.expanded = !props.expanded;
        this.$store.commit('SET_PLAN', plan);
      }
    },
    components: {
      appPlan: Plan
    },
    created() {
      this.$store.dispatch('getFilteredPlans');
    }
  }
</script>


<style>
  .clickable {
    cursor: pointer;
  }
</style>
