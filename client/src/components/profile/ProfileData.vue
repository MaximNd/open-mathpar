<template>
    <v-layout wrap>
        <v-flex d-flex sm12 md5 lg4>
            <v-card>
                <v-card-media src="https://randomuser.me/api/portraits/men/85.jpg" height="450px">
                </v-card-media>
                <v-card-actions>
                    <v-btn block flat color="blue" @click="changeDataDialog = !changeDataDialog">Edit profile</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
        <v-flex d-flex sm12 md7 lg8>
            <v-card>
                <v-card-title primary-title>
                    <div>
                        <div class="headline">Your account data:</div>
                    </div>
                </v-card-title>
                <v-data-table :items="userData.concat(clientsData)" hide-actions hide-headers>
                    <template slot="items" slot-scope="props">
                        <td class="text-xs-left title">{{ props.item.title }}</td>
                        <td class="text-xs-left text">{{ props.item.text }}</td>
                    </template>
                </v-data-table>
            </v-card>
        </v-flex>
        <v-layout row justify-center>
            <appProfileChangeData @closeDialog="changeDataDialog = false" :changeDataDialog="changeDataDialog"></appProfileChangeData>
        </v-layout>
    </v-layout>
</template>


<script>
    import ProfileChangeData from './ProfileChangeData.vue';

    export default {
        data () {
            return {
                changeDataDialog: false
            };
        },
        computed: {
            userData() {
                return this.$store.getters.userTableData;
            },
            clientsData() {
                // console.log(['a'].concat(...this.$store.getters.clientsTableData));
                return this.$store.getters.clientsTableData;
            }
        },
        components: {
            appProfileChangeData: ProfileChangeData
        }
    }
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

