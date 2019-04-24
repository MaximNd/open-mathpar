<template>
    <v-layout wrap>
        <v-flex d-flex xs12 sm6 md3 lg2 v-for="subject in subjects" :key="subject.id">
            <v-card hover>
                <v-toolbar card flat>
                    <v-toolbar-title>
                        <v-btn block flat>{{ subject.subject.name }}</v-btn>
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-title>
                        <v-btn v-if="subject.subject.plan == null" block flat>
                          {{ $t('student.subjects.planNotReady') }}
                        </v-btn>
                        <v-btn v-else block flat @click="showPlan(subject.subject.plan)">
                          {{ $t('student.subjects.showPlan') }}
                        </v-btn>
                    </v-toolbar-title>
                </v-toolbar>
                <v-card-text bolt>
                    <v-btn block flat :to="`/profile/${subject.subject.teacher.id}`">
                      {{ subject.subject.teacher.fullName }}
                    </v-btn>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>


<script>
export default {
  data() {
    return {
      subjects: [],
    };
  },
  created() {
    this.$http.get(`student/${this.$auth.user().clients.find(client => client.clientRole === 'student').client._id}/subjects`)
      .then((data) => { this.subjects = data.body; });
  },
  methods: {
    showPlan(plan) {
      this.$store.commit('SET_PLAN', plan);
    },
  },
};
</script>


<style>

</style>
