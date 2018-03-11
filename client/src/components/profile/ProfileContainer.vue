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

    import { store } from './../../store/store';

    export default {
        data() {
          return {
            updated: true
          };
        },
        created() {
            console.log(0);
            // console.log(to);
            store.dispatch('checkIfCurrent', this.$route)
              .then(result => {
                if (!result) {
                  store.dispatch('getUser', this.$route);
                }
              });
            //

            // store.dispatch('getUser', to)
            //     .then(() => {
            //         console.log(1);
            //         next();
            //     });
        },
        // created() {
        //     console.log(2);
        // },
        components: {
            appProfileData: ProfileData
        }
    };
</script>

<style scoped>

</style>
