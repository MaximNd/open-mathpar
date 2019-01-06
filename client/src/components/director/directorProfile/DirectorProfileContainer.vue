<template>
  <v-container fluid>
    <appDirectorProfileData></appDirectorProfileData>
  </v-container>
</template>


<script>
import DirectorProfileData from './DirectorProfileData.vue';

export default {
  components: {
    appDirectorProfileData: DirectorProfileData,
  },
};
</script>
