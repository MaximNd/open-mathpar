<template>
    <v-container fluid>
        <appCreateGroup v-if="$auth.user().role.indexOf('headTeacher') !== -1 || $auth.user().role.indexOf('methodist') !== -1"></appCreateGroup>
        <appGroupsTable></appGroupsTable>
    </v-container>
</template>


<script>
import GroupsTable from './GroupsTable.vue';
import CreateGroup from './CreateGroup.vue';

export default {
  components: {
    appGroupsTable: GroupsTable,
    appCreateGroup: CreateGroup,
  },
};
</script>


<style scoped>

</style>
