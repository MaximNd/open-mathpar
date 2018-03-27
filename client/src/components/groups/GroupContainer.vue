<template>
  <v-container fluid>
    <appGroup></appGroup>
  </v-container>
</template>

<script>
  import Group from './Group.vue';
  import { store } from './../../store/store';

    export default {
      components: {
        appGroup: Group
      },
      beforeRouteEnter(to, from, next) {
        store.dispatch('getGroupById', { groupId: to.params.id })
          .then(() => next());
      }
    };
</script>

<style>

</style>
