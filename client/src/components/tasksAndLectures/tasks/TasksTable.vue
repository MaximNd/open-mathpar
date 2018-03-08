<template>
  <v-card>
    <v-card-title class="title info--text">
      All Tasks | Your Tasks | ...
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
        <td class="text-xs-left clickable"><router-link to="/task/1" tag="span">{{ props.item.taskName}}</router-link></td>
        <td class="text-xs-right">{{ props.item.subject }}</td>
        <td class="text-xs-right">{{ props.item.taskType }}</td>
        <td class="text-xs-right">{{ props.item.teacher }}</td>
      </template>
      <template slot="pageText" slot-scope="{ pageStart, pageStop }">
        From {{ pageStart }} to {{ pageStop }}
      </template>
    </v-data-table>
  </v-card>
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
          { text: 'Task', align: 'left', value: 'taskName' },
          { text: 'Subject', value: 'subject' },
          { text: 'Type', value: 'taskType' },
          { text: 'Teacher', value: 'teacher' }
        ],
        items: [
          {
            value: false,
            taskName: 'Task1',
            subject: 'Subject 1',
            taskType: 'KR',
            teacher: 'Teacher 1'
          },
          {
            value: false,
            taskName: 'Task2',
            subject: 'Subject 2',
            taskType: 'SR',
            teacher: 'Teacher 2'
          },
          {
            value: false,
            taskName: 'Task3',
            subject: 'Subject 3',
            taskType: 'SR',
            teacher: 'Teacher 3'
          },
          {
            value: false,
            taskName: 'Task4',
            subject: 'Subject 4',
            taskType: 'KR',
            teacher: 'Teacher 4'
          },
          {
            value: false,
            taskName: 'Task5',
            subject: 'Subject 5',
            taskType: 'SR',
            teacher: 'Teacher 5'
          },
          {
            value: false,
            taskName: 'Task6',
            subject: 'Subject 4',
            taskType: 'KR',
            teacher: 'Teacher 2'
          },
          {
            value: false,
            taskName: 'Task7',
            subject: 'Subject 1',
            taskType: 'SR',
            teacher: 'Teacher 2'
          },
          {
            value: false,
            taskName: 'Task8',
            subject: 'Subject 2',
            taskType: 'SR',
            teacher: 'Teacher 3'
          },
          {
            value: false,
            taskName: 'Task9',
            subject: 'Subject 2',
            taskType: 'SR',
            teacher: 'Teacher 6'
          },
          {
            value: false,
            taskName: 'Task10',
            subject: 'Subject 1',
            taskType: 'KR',
            teacher: 'Teacher 1'
          }
        ]
      }
    }
  }
</script>


<style scoped>
  .title {
    font-size: 22px;
    font-weight: 400;
  }
  .clickable {
    cursor: pointer;
  }
</style>
