<template>
  <v-card>
    <v-card-text>
       <v-container fluid grid-list-md>
        <v-data-iterator
          content-tag="v-layout"
          row
          wrap
          :items="subjects"
          :rows-per-page-items="rowsPerPageItems"
          :pagination.sync="pagination"
        >
          <v-flex
            slot="item"
            slot-scope="props"
            xs12
            sm6
            md4
            lg3
          >
            <v-card class="elevation-1">
              <v-card-title>
                <h4>{{ props.item.name }}</h4>
                <v-spacer></v-spacer>
                 <v-dialog v-model="addThemesDialogs[props.index]" max-width="800px">
                  <v-btn color="success" slot="activator">
                    {{ $t('schoolLearningStuff.subjectsAndThemes.addThemes') }}
                  </v-btn>
                  <v-card>
                    <v-card-title>
                      <span class="headline">
                        {{ $t('schoolLearningStuff.subjectsAndThemes.addThemesTo', [props.item.name]) }}
                      </span>
                    </v-card-title>
                    <v-card-text>
                      <v-container grid-list-md>
                        <v-card class="mb-1">
                          <v-card-text>
                            <v-btn @click="addThemeToList" color="success" block>
                              {{ $t('schoolLearningStuff.subjectsAndThemes.addOneTheme') }}
                            </v-btn>
                          </v-card-text>
                        </v-card>
                        <v-card v-for="(theme, themeIndex) in themesToAdd" :key="`themesToAdd${themeIndex}`">
                          <v-card-text>
                            <v-layout wrap>
                              <v-flex sm12 md4>
                                <v-text-field
                                  v-model="themesToAdd[themeIndex].name"
                                  :label="$t('utils.labels.themeName')"
                                  required></v-text-field>
                              </v-flex>
                              <v-flex sm12 md4>
                                <v-select
                                  v-model="themesToAdd[themeIndex].class"
                                  :label="$t(schoolModel === 'School' ? 'utils.labels.selectClass' : 'utils.labels.selectYear')"
                                  required
                                  :items="schoolModel === 'School' ? [1,2,3,4,5,6,7,8,9,10,11,12] : [1,2,3,4,5,6]"
                                ></v-select>
                              </v-flex>
                              <v-flex sm12 md4>
                                <v-text-field
                                  v-model="themesToAdd[themeIndex].order"
                                  :label="$t('utils.labels.themeOrder')"
                                  required></v-text-field>
                              </v-flex>
                            </v-layout>
                            <v-btn @click="deleteThemeFromList(themeIndex)" color="error" block>
                              {{ $t('utils.button.delete') }}
                            </v-btn>
                          </v-card-text>
                        </v-card>
                      </v-container>
                      <small>
                        {{ $t('utils.hint.indicatesRequiredField') }}
                      </small>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        color="error"
                        flat
                        @click.native="addThemesDialogs.splice(props.index, 1, false)">
                        {{ $t('utils.button.cancel') }}
                      </v-btn>
                      <v-btn
                        color="success"
                        flat
                        @click.native="addThemesToSubject(props.index, props.index)">
                        {{ $t('utils.button.create') }}
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-card-title>
              <v-divider></v-divider>
              <template>
                <v-data-table
                  class="scrollable-list"
                  :headers="themesHeaders"
                  :items="props.item.themes"
                  hide-actions
                  item-key="_id"
                >
                  <template slot="items" slot-scope="props">
                    <tr class="clickable" @click="props.expanded = !props.expanded">
                      <td class="text-xs-left">{{ props.item.name }}</td>
                      <td class="text-xs-right">{{ props.item.class }}</td>
                      <td class="text-xs-right">{{ props.item.order }}</td>
                    </tr>
                  </template>
                  <template slot="expand" slot-scope="props">
                    <v-card color="blue-grey lighten-4">
                      <v-card-text>
                        <v-layout wrap>
                          <v-flex sm12 md4>
                            <v-text-field
                              :label="$t('utils.labels.themeName')"
                              required></v-text-field>
                          </v-flex>
                          <v-flex sm12 md4>
                            <v-select
                              :label="$t(schoolModel === 'School' ? 'utils.labels.selectClass' : 'utils.labels.selectYear')"
                              required
                              :items="schoolModel === 'School' ? [1,2,3,4,5,6,7,8,9,10,11,12] : [1,2,3,4,5,6]"
                            ></v-select>
                          </v-flex>
                          <v-flex sm12 md4>
                            <v-text-field
                              :label="$t('utils.labels.themeOrder')"
                              required></v-text-field>
                          </v-flex>
                        </v-layout>
                        <v-btn
                          color="info"
                          block>
                          {{ $t('utils.button.update') }}
                        </v-btn>
                        <v-btn
                          color="error"
                          block>
                          {{ $t('utils.button.delete') }}
                        </v-btn>
                      </v-card-text>
                    </v-card>
                  </template>
                </v-data-table>
              </template>
              <!-- <v-list dense  class="scrollable-list">
                <template v-for="(theme, index) in props.item.themes">
                  <v-divider v-if="index !== 0" :key="`subject-${props.item._id}-theme-${props.item.themes[index]._id}-divider-${index}`"></v-divider>
                  <v-list-group no-action v-model="listGroup[props.index][index]" :key="`subject-${props.item._id}-theme-${props.item.themes[index]._id}`">
                    <v-list-tile slot="activator">
                      <v-list-tile-content>Name:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ theme.name }}</v-list-tile-content>
                      <v-list-tile-content>Class:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ theme.class }}</v-list-tile-content>
                      <v-list-tile-content>Order:</v-list-tile-content>
                      <v-list-tile-content class="align-end">{{ theme.order }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-action>
                          <v-card>
                            <v-card-text>
                              <v-layout wrap>
                                <v-flex sm12 md4>
                                  <v-text-field label="Theme name" required></v-text-field>
                                </v-flex>
                                <v-flex sm12 md4>
                                  <v-select
                                    label="Select Class"
                                    required
                                    :items="[1,2,3,4,5,6,7,8,9,10,11,12]"
                                  ></v-select>
                                </v-flex>
                                <v-flex sm12 md4>
                                  <v-text-field label="Theme order" required></v-text-field>
                                </v-flex>
                              </v-layout>
                              <v-btn color="error" block>Delete this</v-btn>
                            </v-card-text>
                          </v-card>
                        </v-list-tile-action>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list-group>
                </template>
                <v-list-tile class="evelation-1">
                  <v-list-tile-content>Name:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ theme.name }}</v-list-tile-content>
                  <v-list-tile-content>Name:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{ theme.name }}</v-list-tile-content>
                </v-list-tile>
              </v-list> -->
            </v-card>
          </v-flex>
        </v-data-iterator>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      themesToAdd: [
        {
          name: '',
          class: '',
          order: '',
        },
      ],
      rowsPerPageItems: [4, 8, 12],
      pagination: {
        rowsPerPage: 4,
      },
      subjects: [

      ],
      addThemesDialogs: [],
      listGroup: []
    };
  },
  watch: {
    subjects(newSubjects) {
      this.addThemesDialogs = this.subjects.map(() => false);
      newSubjects.forEach((subject) => {
        subject.themes.sort((a, b) => {
          if (a.order < b.order) {
            return -1;
          }
          if (a.order > b.order) {
            return 1;
          }
          return 0;
        });
        this.listGroup.push(subject.themes.map(() => false));
      });
    },
  },
  computed: {
    themesHeaders() {
      return [
        {
          text: this.$t('schoolLearningStuff.subjectsAndThemes.themesHeaders.name'),
          align: 'left',
          value: 'name',
          sortable: false,
        },
        {
          text: this.$t(this.schoolModel === 'School' ? 'schoolLearningStuff.subjectsAndThemes.themesHeaders.class' : 'schoolLearningStuff.subjectsAndThemes.themesHeaders.year'),
          align: 'right',
          value: 'class',
          sortable: false,
        },
        {
          text: this.$t('schoolLearningStuff.subjectsAndThemes.themesHeaders.order'),
          align: 'right',
          value: 'order',
        },
      ];
    }
  },
  methods: {
    addThemeToList() {
      this.themesToAdd.push({
        name: '',
        class: '',
        order: '',
      });
    },
    deleteThemeFromList(index) {
      this.themesToAdd.splice(index, 1);
    },
    addThemesToSubject(subjectIndex, dialogIndex) {
      const client = this.$auth.user().clients.find(client => client.clientRole === 'teacher').client;
      const teacherId = client._id;
      const schoolId = client.schoolId._id;
      const themes = this.themesToAdd.map(theme => ({ ...theme, teacher: teacherId, school: schoolId }));
      const subjectId = this.subjects[subjectIndex]._id;
      this.$http.put(`subject/${subjectId}/themes`, { themes })
        .then(({ body }) => {
          this.subjects[subjectIndex].themes.push(...body.themes);
          this.subjects[subjectIndex].themes.sort((a, b) => {
            if (a.order < b.order) {
              return -1;
            }
            if (a.order > b.order) {
              return 1;
            }
            return 0;
          });
          this.addThemesDialogs.splice(dialogIndex, 1, false);
          this.$alertify.success('Success');
        })
        .catch(() => {
          this.$alertify.error('Error! Try again later please.');
        });
    },
  },
  created() {
    this.$http.get('subjects')
      .then(({ body }) => {
        const subjects = body;

        subjects.forEach((subject) => {
          subject.themes.sort((a, b) => {
            if (a.order < b.order) {
              return -1;
            }
            if (a.order > b.order) {
              return 1;
            }
            return 0;
          });
        });
        this.subjects = subjects.map(subject => ({ ...subject, value: false }));
      });
  },
  props: ['schoolModel', 'isSchool'],
};
</script>

<style scoped>
  .scrollable-list {
    max-height: 300px;
    overflow-y: scroll;
  }

  .clickable {
    cursor: pointer;
  }
</style>
