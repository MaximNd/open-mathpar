<template>
  <v-container fluid>
    <v-layout raw wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title class="primary--text title">
            <span class="headline">{{ $t('director.createClass.newClass') }}</span>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="creteClass">
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 md4>
                    <v-text-field
                      v-model="newClass.name"
                      :label="$t('utils.labels.name')"
                      required></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
              <v-btn type="submit" color="success" flat>{{ $t('utils.button.create') }}</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      snackbar: true,
      newClass: {
        name: '',
      },
    };
  },
  methods: {
    creteClass() {
      this.$store.dispatch('createClass', { class: this.newClass })
        .then(() => {
          this.$alertify.success(this.$t('utils.action.success'));
        })
        .catch(() => {
          this.$alertify.error(this.$t('utils.action.errorTryAgainLater'));
        });
    },
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
</style>
