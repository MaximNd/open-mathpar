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
                <v-btn flat :key="'logout'" @click="logout"><v-icon left>exit_to_app</v-icon>Log out</v-btn>
            </v-toolbar-items>
        </v-toolbar>
    </div>
</template>

<script>
export default {
  data() {
    return {
      sideNav: false,
      menuItems: [],
    };
  },
  methods: {
    logout() {
      this.$store.commit('SET_USER', undefined);
      this.$store.commit('SET_PLAN', undefined);
      this.$auth.logout({
        redirect: '/login',
      });
    },
    initializeMenu() {
      const schoolModel = this.$auth.user().clients[0].client.schoolModel;
      const schoolName = schoolModel === 'School' ? 'School №445' : 'University';
      if (this.$auth.user().role.indexOf('admin') !== -1) {

      } else if (this.$auth.user().role.indexOf('director') !== -1) {
        this.menuItems = [
          { title: 'View Profile', icon: 'perm_identity', link: `/profile/${this.$auth.user().id}` },
          { title: 'Create Head Teacher', icon: 'person_add', link: `/director/${this.$auth.user().id}/create-head-teacher` },
          { title: 'Create class', icon: 'group_add', link: `/director/${this.$auth.user().id}/create-class` },
          { title: 'Groups', icon: 'people', link: '/groups' },
          { title: schoolName, icon: 'school', link: `/school/${this.$auth.user().clients[0].client.schoolId._id}` },
        ];
      } else if (this.$auth.user().role.indexOf('rector') !== -1) {
        this.menuItems = [
          { title: 'Profile', icon: 'description', link: `/profile/${this.$auth.user().id}` },
          { title: 'New Dean', icon: 'person_add', link: `/rector/new-dean` },
          // { title: 'Create Head Teacher', icon: 'accessibility', link: `/director/${this.$auth.user().id}/create-head-teacher` },
          // { title: 'Create class', icon: 'group_add', link: `/director/${this.$auth.user().id}/create-class` },
          // { title: 'Groups', icon: 'people', link: '/groups' },
          // { title: 'University', icon: 'school', link: `/school/${this.$auth.user().clients[0].client.universityId._id}` },
        ];
      } else if (this.$auth.user().role.indexOf('dean') !== -1) {
        this.menuItems = [
          { title: 'Profile', icon: 'description', link: `/profile/${this.$auth.user().id}` },
          { title: 'New Methodist', icon: 'person_add', link: `/dean/new-methodist` },
          { title: 'Create specialty', icon: 'account_balance', link: `/dean/create-specialty` },
        ];
      } else if (this.$auth.user().role.indexOf('methodist') !== -1) {
        this.menuItems = [
          { title: 'Profile', icon: 'description', link: `/profile/${this.$auth.user().id}` },
          { title: 'Create Member', icon: 'person_add', link: `/methodist/new-member` },
          { title: 'Groups', icon: 'people', link: '/groups' },
          // { title: 'University', icon: 'school', link: `/school/${this.$auth.user().clients[0].client.universityId._id}` },
        ];
      } else if (this.$auth.user().role.indexOf('headTeacher') !== -1) {
        this.menuItems = [
          { title: 'View Profile', icon: 'perm_identity', link: `/profile/${this.$auth.user().id}` },
          { title: 'Create Member', icon: 'person_add', link: `/head-teacher/${this.$auth.user().id}/create-member` },
          { title: 'Groups', icon: 'people', link: '/groups' },
          { title: schoolName, icon: 'school', link: `/school/${this.$auth.user().clients[0].client.schoolId._id}` },
        ];
      } else if (this.$auth.user().role.indexOf('teacher') !== -1) {
        this.menuItems = [
          { title: 'View Profile', icon: 'perm_identity', link: `/profile/${this.$auth.user().id}` },
          { title: 'Timetable and Plan', icon: 'subtitles', link: `/teacher/${this.$auth.user().id}/timetable_plan` },
          { title: schoolModel + ' Learning Stuff', icon: 'import_contacts', link: '/school_learning_stuff' },
          { title: 'Groups', icon: 'people', link: '/groups' },
          { title: schoolName, icon: 'school', link: `/school/${this.$auth.user().clients[0].client.schoolId._id}` },
        ];
      } else if (this.$auth.user().role.indexOf('student') !== -1) {
        this.menuItems = [
          { title: 'View Profile', icon: 'perm_identity', link: `/profile/${this.$auth.user().id}` },
          { title: 'Subjects', icon: 'local_library', link: `/student/${this.$auth.user().id}/subjects` },
          { title: 'Gradebook', icon: 'subtitles', link: `/student/${this.$auth.user().id}/gradebook` },
          { title: 'Group', icon: 'people', link: `/group/${this.$auth.user().clients[0].client.groupId}` },
          { title: schoolName, icon: 'school', link: `/school/${this.$auth.user().clients[0].client.schoolId._id}` },
        ];
      }
    },
  },
  created() {
    this.initializeMenu();
  },
};
</script>

<style>

</style>
