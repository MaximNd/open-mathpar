<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-flex xs12 class="text-xs-center"><h3 class="info--text">SR's</h3></v-flex>
      <v-expansion-panel popout>
        <v-expansion-panel-content v-for="(subject, i) in subjectsGrades" :key="i" class="elevation-1">
          <div slot="header" class="secondary--text">{{ subject.subject }}</div>
          <v-card>
            <v-card-title class="ml-1 title success--text">AVG values:</v-card-title>
            <v-card-text>
              <v-data-table :headers="[{text: 'Avarage marks', align: 'left', sortable: false, value: 'avg_marks'}, { text: 'Dispersion',align: 'left',sortable: false,value: 'dispersion'}]"
                :items="subject.avg"
                class="elevation-1"
                hide-actions
              >
                <template slot="items" slot-scope="props">
                  <td>
                    <v-data-table
                      hide-headers
                      :items="props.item.avgSrs"
                      hide-actions
                      >
                      <template slot="items" slot-scope="props">
                        <td class="text-xs-left title">{{ props.item.name }}</td>
                        <td class="text-xs-left text">{{ props.item.value }}</td>
                      </template>
                    </v-data-table>
                  </td>
                  <td>
                    <v-data-table
                      hide-headers
                      :items="props.item.dispersionSrs"
                      hide-actions
                      >
                      <template slot="items" slot-scope="props">
                          <td class="text-xs-left title">{{ props.item.name }}</td>
                          <td class="text-xs-left text">{{ props.item.value }}</td>
                      </template>
                    </v-data-table>
                  </td>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
          <v-card>
            <v-card-title class="ml-1 title success--text">Marks:</v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="subject.srs"
                class="elevation-1"
                hide-actions
                >
                <template slot="items" slot-scope="props">
                    <td class="text-xs-left text"><h4>{{ props.item.name }}</h4></td>
                    <td>
                      <v-data-table
                        hide-headers
                        :items="props.item.results"
                        hide-actions
                        >
                        <template slot="items" slot-scope="props">
                          <td class="text-xs-left text">{{ props.item }}</td>
                        </template>
                      </v-data-table>
                    </td>
                    <td>
                      <v-data-table
                        hide-headers
                        :items="props.item.avgFirst"
                        hide-actions
                        >
                        <template slot="items" slot-scope="props">
                          <td class="text-xs-left title">{{ props.item.name }}</td>
                          <td class="text-xs-left text">{{ props.item.value }}</td>
                        </template>
                      </v-data-table>
                    </td>
                    <td>
                      <v-data-table
                        hide-headers
                        :items="props.item.avgLast"
                        hide-actions
                        >
                        <template slot="items" slot-scope="props">
                          <td class="text-xs-left title">{{ props.item.name }}</td>
                          <td class="text-xs-left text">{{ props.item.value }}</td>
                        </template>
                      </v-data-table>
                    </td>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-flex xs12 class="text-xs-center"><h3 class="info--text">KR's</h3></v-flex>
      <v-expansion-panel popout>
          <v-expansion-panel-content v-for="(subject, i) in subjectsGrades" :key="i" class="elevation-1">
              <div slot="header" class="secondary--text">{{ subject.subject }}</div>
              <v-card>
                  <v-card-title class="ml-1 title success--text">AVG values:</v-card-title>
                  <v-card-text>
                      <v-data-table :headers="[{text: 'Avarage marks', align: 'left', sortable: false, value: 'avg_marks'}, { text: 'Dispersion',align: 'left',sortable: false,value: 'dispersion'}]"
                          :items="subject.avg"
                          class="elevation-1"
                          hide-actions
                      >
                          <template slot="items" slot-scope="props">
                              <td class="text-xs-left text">{{ props.item.avgKrs }}</td>
                              <td class="text-xs-left text">{{ props.item.dispersionKrs }}</td>
                          </template>
                      </v-data-table>
                  </v-card-text>
              </v-card>
              <v-card>
                  <v-card-title class="ml-1 title success--text">Marks:</v-card-title>
                  <v-card-text>
                      <v-data-table
                          :headers="[{text: 'Kr name', align: 'left', sortable: false, value: 'kr_name'}, {text: 'Mark', align: 'left', sortable: false, value: 'kr_mark'}]"
                          :items="subject.krs"
                          class="elevation-1"
                          hide-actions
                          >
                          <template slot="items" slot-scope="props">
                              <td class="text-xs-left text">{{ props.item.name }}</td>
                              <td class="text-xs-left text">{{ props.item.result }}</td>
                          </template>
                      </v-data-table>
                  </v-card-text>
              </v-card>
          </v-expansion-panel-content>
      </v-expansion-panel>
    </v-flex>
  </v-layout>
</template>


<script>
export default {
  data() {
    return {
      headers: [
        {
          text: 'Sr name',
          align: 'left',
          sortable: false,
          value: 'sr_name',
        },
        {
          text: 'marks',
          align: 'left',
          sortable: false,
          value: 'marks',
        },
        {
          text: 'First AVG result',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Last AVG result',
          align: 'left',
          sortable: false,
          value: 'name',
        },
      ],
      subjectsGrades: [
        {
          subject: 'Subject 1',
          srs: [
            {
              name: 'sr1',
              results: ['AAAAAAAAAA', '11111A1111', '123A4C4221'],
              avgFirst: [{ name: 'a', value: 60 }, { name: 'b', value: 40 }, { name: 'b', value: 1 }, { name: 'b', value: 2 }],
              avgLast: [{ name: 'a', value: 100 }, { name: 'b', value: 0 }, { name: 'b', value: 0 }, { name: 'b', value: 0 }],
            },
            {
              name: 'sr2',
              results: ['AAAAAAAAAA', '11111A1111', '123A4C4221'],
              avgFirst: [{ name: 'a', value: 60 }, { name: 'b', value: 40 }, { name: 'b', value: 1 }, { name: 'b', value: 2 }],
              avgLast: [{ name: 'a', value: 100 }, { name: 'b', value: 0 }, { name: 'b', value: 0 }, { name: 'b', value: 0 }],
            },
            {
              name: 'sr3',
              results: ['AAAAAAAAAA', '11111A1111', '123A4C4221'],
              avgFirst: [{ name: 'a', value: 60 }, { name: 'b', value: 40 }, { name: 'b', value: 1 }, { name: 'b', value: 2 }],
              avgLast: [{ name: 'a', value: 100 }, { name: 'b', value: 0 }, { name: 'b', value: 0 }, { name: 'b', value: 0 }],
            },
            {
              name: 'sr4',
              results: ['AAAAAAAAAA', '11111A1111', '123A4C4221'],
              avgFirst: [{ name: 'a', value: 60 }, { name: 'b', value: 40 }, { name: 'b', value: 1 }, { name: 'b', value: 2 }],
              avgLast: [{ name: 'a', value: 100 }, { name: 'b', value: 0 }, { name: 'b', value: 0 }, { name: 'b', value: 0 }],
            },
          ],
          krs: [
            {
              name: 'kr1',
              result: 100,
            },
            {
              name: 'kr2',
              result: 90,
            },
          ],
          avg: [{
            avgSrs: [{ name: 'a', value: 100 }, { name: 'b', value: 0 }, { name: 'b', value: 0 }, { name: 'b', value: 0 }],
            dispersionSrs: [{ name: 'a', value: 100 }, { name: 'b', value: 0 }, { name: 'b', value: 0 }, { name: 'b', value: 0 }],
            avgKrs: 90,
            dispersionKrs: 12,
          }],
        },
        {
          subject: 'Subject 2',
          srs: [
            {
              name: 'sr1',
              results: ['AAAAAAAAAA', '11111A1111', '123A4C4221'],
              avgFirst: [{ name: 'a', value: 60 }, { name: 'b', value: 40 }, { name: 'b', value: 1 }, { name: 'b', value: 2 }],
              avgLast: [{ name: 'a', value: 100 }, { name: 'b', value: 0 }, { name: 'b', value: 0 }, { name: 'b', value: 0 }],
            },
            {
              name: 'sr2',
              results: ['AAAAAAAAAA', '11111A1111', '123A4C4221'],
              avgFirst: [{ name: 'a', value: 60 }, { name: 'b', value: 40 }, { name: 'b', value: 1 }, { name: 'b', value: 2 }],
              avgLast: [{ name: 'a', value: 100 }, { name: 'b', value: 0 }, { name: 'b', value: 0 }, { name: 'b', value: 0 }],
            },
            {
              name: 'sr3',
              results: ['AAAAAAAAAA', '11111A1111', '123A4C4221'],
              avgFirst: [{ name: 'a', value: 60 }, { name: 'b', value: 40 }, { name: 'b', value: 1 }, { name: 'b', value: 2 }],
              avgLast: [{ name: 'a', value: 100 }, { name: 'b', value: 0 }, { name: 'b', value: 0 }, { name: 'b', value: 0 }],
            },
            {
              name: 'sr4',
              results: ['AAAAAAAAAA', '11111A1111', '123A4C4221'],
              avgFirst: [{ name: 'a', value: 60 }, { name: 'b', value: 40 }, { name: 'b', value: 1 }, { name: 'b', value: 2 }],
              avgLast: [{ name: 'a', value: 100 }, { name: 'b', value: 0 }, { name: 'b', value: 0 }, { name: 'b', value: 0 }],
            },
          ],
          krs: [
            {
              name: 'kr1',
              result: 100,
            },
            {
              name: 'kr2',
              result: 90,
            },
          ],
          avg: [{
            avgSrs: [{ name: 'a', value: 100 }, { name: 'b', value: 0 }, { name: 'b', value: 0 }, { name: 'b', value: 0 }],
            dispersionSrs: [{ name: 'a', value: 100 }, { name: 'b', value: 0 }, { name: 'b', value: 0 }, { name: 'b', value: 0 }],
            avgKrs: 80,
            dispersionKrs: 10,
          }],
        },
      ],
    };
  },
};
</script>


<style scoped>
    .title {
        font-size: 22px;
        font-weight: 400;
    }
    .text {
        font-size: 18px;
    }
    .clickable {
        cursor: pointer;
    }
    .gr {
        color: #00FF00;
    }
</style>
