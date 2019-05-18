<template>
    <div v-if="$auth.ready()">
        <v-navigation-drawer temporary v-model="sideNav" light absolute>
            <v-list class="pa-1">
                <v-list-tile avatar>
                    <v-list-tile-avatar>
                        <img src="https://randomuser.me/api/portraits/men/85.jpg" />
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                        <v-list-tile-title>John Leider</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>

            <v-list class="pt-0" dense>
                <v-divider></v-divider>
                <v-list-tile v-for="(item, index) in menuItems" :key="index" :to="item.link">
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="logout">
                    <v-list-tile-action>
                        <v-icon left>exit_to_app</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Log out</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>

        <v-toolbar class="info" dark>
            <v-toolbar-side-icon class="hidden-lg-and-up" @click="sideNav = !sideNav"></v-toolbar-side-icon>
            <v-toolbar-title>
                MathPartner
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-md-and-down">
                <v-btn v-for="(item, index) in menuItems" flat :key="index" :to="item.link">
                  <v-icon left>{{ item.icon }}</v-icon>
                  {{ item.title }}
                </v-btn>
                <v-menu
                  transition="slide-y-transition"
                  bottom>
                  <template slot="activator">
                    <v-btn flat>
                      {{ $t('navbar.locale') }}: {{ $i18n.locale }}
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-tile
                      v-for="(locale, i) in locales"
                      :key="i"
                      @click="changeLocale(locale)"
                    >
                      <v-list-tile-title>{{ locale }}</v-list-tile-title>
                    </v-list-tile>
                  </v-list>
                </v-menu>
                <v-btn
                  flat
                  :key="'logout'"
                  @click="logout">
                  <v-icon left>exit_to_app</v-icon>{{ $t('navbar.logOut') }}
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>
    </div>
</template>

<script>
export default {
  data() {
    return {
      sideNav: false,
      locales: [
        'eng',
        'rus',
        'ukr',
        'heb'
      ]
    };
  },
  computed: {
    menuItems() {
      const schoolModel = this.$auth.user().clients[0].client.schoolModel === 'School' ? 'School' : 'University';
      const schoolModelLowerCase = schoolModel.toLowerCase();
      if (this.$auth.user().role.indexOf('admin') !== -1) {
        return [];
      }
      if (this.$auth.user().role.indexOf('director') !== -1) {
        return [
          { title: this.$t('navbar.profile'), icon: 'perm_identity', link: `/profile/${this.$auth.user().id}` },
          { title: this.$t('navbar.createHeadTeacher'), icon: 'person_add', link: `/director/${this.$auth.user().id}/create-head-teacher` },
          { title: this.$t('navbar.createClass'), icon: 'group_add', link: `/director/${this.$auth.user().id}/create-class` },
          { title: this.$t('navbar.groups'), icon: 'people', link: '/groups' },
          { title: this.$t('navbar.school', ['№445']), icon: 'school', link: `/school/${this.$auth.user().clients[0].client.schoolId._id}` },
        ];
      }
      if (this.$auth.user().role.indexOf('headTeacher') !== -1) {
        return [
          { title: this.$t('navbar.profile'), icon: 'perm_identity', link: `/profile/${this.$auth.user().id}` },
          { title: this.$t('navbar.createMember'), icon: 'person_add', link: `/head-teacher/${this.$auth.user().id}/create-member` },
          { title: this.$t('navbar.groups'), icon: 'people', link: '/groups' },
          { title: this.$t('navbar.school', ['№445']), icon: 'school', link: `/school/${this.$auth.user().clients[0].client.schoolId._id}` },
        ];
      }
      if (this.$auth.user().role.indexOf('teacher') !== -1) {
        return [
          { title: this.$t('navbar.profile'), icon: 'perm_identity', link: `/profile/${this.$auth.user().id}` },
          { title: this.$t('navbar.timetableAndPlan'), icon: 'subtitles', link: `/teacher/${this.$auth.user().id}/timetable_plan` },
          { title: this.$t('navbar.' + schoolModelLowerCase + 'LearningStuff'), icon: 'import_contacts', link: '/school_learning_stuff' },
          { title: this.$t('navbar.groups'), icon: 'people', link: '/groups' },
          { title: this.$t('navbar.' + schoolModelLowerCase, ['№445']), icon: 'school', link: `/school/${this.$auth.user().clients[0].client.schoolId._id}` },
        ];
      }
      if (this.$auth.user().role.indexOf('student') !== -1) {
        return [
          { title: this.$t('navbar.profile'), icon: 'perm_identity', link: `/profile/${this.$auth.user().id}` },
          { title: this.$t('navbar.subjects'), icon: 'local_library', link: `/student/${this.$auth.user().id}/subjects` },
          { title: this.$t('navbar.gradebook'), icon: 'subtitles', link: `/student/${this.$auth.user().id}/gradebook` },
          { title: this.$t('navbar.group'), icon: 'people', link: `/group/${this.$auth.user().clients[0].client.groupId}` },
          { title: this.$t('navbar.' + schoolModelLowerCase, ['№445']), icon: 'school', link: `/school/${this.$auth.user().clients[0].client.schoolId._id}` },
        ];
      }
      if (this.$auth.user().role.indexOf('rector') !== -1) {
        return [
          { title: this.$t('navbar.profile'), icon: 'description', link: `/profile/${this.$auth.user().id}` },
          { title: this.$t('navbar.createDean'), icon: 'person_add', link: `/rector/new-dean` },
        ];
      }
      if (this.$auth.user().role.indexOf('dean') !== -1) {
        return [
          { title: this.$t('navbar.profile'), icon: 'description', link: `/profile/${this.$auth.user().id}` },
          { title: this.$t('navbar.createMethodist'), icon: 'person_add', link: `/dean/new-methodist` },
          { title: this.$t('navbar.createSpecialty'), icon: 'account_balance', link: `/dean/create-specialty` },
        ];
      }
      if (this.$auth.user().role.indexOf('methodist') !== -1) {
        return [
          { title: this.$t('navbar.profile'), icon: 'description', link: `/profile/${this.$auth.user().id}` },
          { title: this.$t('navbar.createMember'), icon: 'person_add', link: `/methodist/new-member` },
          { title: this.$t('navbar.group'), icon: 'people', link: '/groups' },
        ];
      }
      return [];
    }
  },
  methods: {
    changeLocale(locale) {
      if (locale === 'heb') {
        this.$vuetify.rtl = true;
      } else {
        this.$vuetify.rtl = false;
      }
      this.$i18n.locale = locale;
    },
    logout() {
      this.$store.commit('SET_USER', undefined);
      this.$store.commit('SET_PLAN', undefined);
      this.$auth.logout({
        redirect: '/login',
      });
    }
  }
};
</script>

<style>

</style>
