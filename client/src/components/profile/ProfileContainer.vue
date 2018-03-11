<template>
    <v-container v-if="updated" fluid grid-list-md>
        <v-layout row wrap>
            <v-flex xs12>
                <v-container fluid>
                    <appProfileData></appProfileData>
                </v-container>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import ProfileData from './ProfileData.vue';

    export default {
        data() {
          return {
            updated: true
          };
        },
        created() {
            this.$store.dispatch('checkIfCurrent', this.$route)
              .then(result => {
                if (!result) {
                  this.$store.dispatch('getUser', this.$route);
                }
              });
        },
        components: {
            appProfileData: ProfileData
        }
    };
</script>

<style scoped>

</style>
