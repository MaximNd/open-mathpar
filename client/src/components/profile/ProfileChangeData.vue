<template>
    <v-dialog v-model="changeDataDialog" persistent width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ $t('profile.changeProfile.userProfile') }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  :label="$t('utils.labels.firstName')"
                  required></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  :label="$t('utils.labels.midName')"
                  required>
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md4>
                <v-text-field
                  :label="$t('utils.labels.lastName')"
                  persistent-hint
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  :label="$t('utils.labels.email')"
                  required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  :label="$t('utils.labels.password')"
                  type="password"
                  required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>{{ $t('utils.hint.indicatesRequiredField') }}</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" flat @click="close">{{ $t('utils.button.close') }}</v-btn>
          <v-btn color="success" flat @click="close">{{ $t('utils.button.save') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>


<script>
export default {
  props: ['changeDataDialog'],
  methods: {
    close() {
      this.$emit('closeDialog');
    },
  },
};
</script>


<style>

</style>
