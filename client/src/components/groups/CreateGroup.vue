<template>
  <v-layout class="mb-1" raw wrap>
    <v-flex xs12>
      <v-card>
        <v-card-text>
          <v-dialog v-model="dialog" max-width="500px">
            <v-btn color="primary" dark slot="activator">
              {{ $t('groups.createGroup.name') }}
            </v-btn>
            <v-card>
              <v-card-title>
                <span class="headline">
                  {{ $t('groups.createGroup.newGroup') }}
                </span>
              </v-card-title>
              <v-form @submit.prevent="createGroup">
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12 sm6>
                        <v-text-field
                          v-model="group.name"
                          :label="$t('groups.createGroup.groupName')"
                          required></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm6>
                        <v-text-field
                          v-model="group.course"
                          :label="$t('groups.createGroup.course')"
                          required></v-text-field>
                      </v-flex>
                    </v-layout>
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
                    @click.native="dialog = false">
                    {{ $t('utils.button.close') }}
                  </v-btn>
                  <v-btn
                    type="submit"
                    color="success"
                    flat
                    @click.native="dialog = false">
                    {{ $t('utils.button.create') }}
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      group: {
        name: '',
        course: '',
      },
      dialog: null,
    };
  },
  methods: {
    createGroup() {
      this.$store.dispatch('createGroup', this.group)
        .then(() => {
          this.$alertify.success(this.$t('utils.action.success'));
          this.$store.dispatch('getGroupsBySchoolId', { schoolId: this.$auth.user().clients[0].client.schoolId._id });
        })
        .catch(() => {
          this.$alertify.error(this.$t('utils.action.errorTryAgainLater'));
        });
    },
  },
};
</script>
