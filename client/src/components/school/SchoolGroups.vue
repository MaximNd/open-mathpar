<template>
  <v-container fluid fill-height>
    <appSchoolGroups></appSchoolGroups>
  </v-container>
</template>

<script>
  import SchoolGroups from './../groups/GroupsTable.vue';

  export default {
    components: {
      appSchoolGroups: SchoolGroups
    }
  };
</script>

<style scoped>

</style>
