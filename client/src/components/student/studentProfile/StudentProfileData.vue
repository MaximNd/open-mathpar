<template>
    <v-layout wrap>
            <v-flex d-flex sm12 md5 lg4>
                <v-card>
                    <v-card-media src="https://randomuser.me/api/portraits/men/85.jpg" height="450px">
                    </v-card-media>
                    <v-card-actions>
                        <v-btn block flat color="blue" @click="changeStudentDataDialog = !changeStudentDataDialog">Edit profile</v-btn>
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
                    <v-data-table :items="items" hide-actions hide-headers>
                        <template slot="items" scope="props">
                            <td class="text-xs-left title">{{ props.item.title }}</td>
                            <td class="text-xs-left text">{{ props.item.text }}</td>
                        </template>
                    </v-data-table>
                </v-card>
            </v-flex>
            <v-layout row justify-center>
                <appStudentProfileChangeData @closeDialog="changeStudentDataDialog = false" :changeStudentDataDialog="changeStudentDataDialog"></appStudentProfileChangeData>
            </v-layout>
        </v-layout>
</template>


<script>
    import StudentProfileChangeData from './StudentProfileChangeData.vue';

    export default {
        data () {
            return {
                changeStudentDataDialog: false,
                items: [
                    { title: 'Full name', text: 'Nedashkivsky Maxim Valentinovich' },
                    { title: 'Role', text: 'Student' },
                    { title: 'Email', text: 'email@mail.com' },
                    { title: 'AVG SR Mark', text: '50 | 50 | 1 | 2' },
                    { title: 'AVG KR Mark', text: '70' },
                    { title: 'AVG SR Dispersion', text: '10 | 12 | 1 | 1' },
                    { title: 'AVG KR Dispersion', text: '12' },
                    { title: 'Birthday', text: '1997-11-18' },
                    { title: 'Age', text: '22' },
                    { title: 'School', text: 'School' },
                    { title: 'Group', text: 'Group' },
                    { title: 'Subjects', text: 'Subjects' }
                ]
            };
        },
        components: {
            appStudentProfileChangeData: StudentProfileChangeData
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

