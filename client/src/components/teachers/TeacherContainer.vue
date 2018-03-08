<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <transition
          appear
          enter-class=""
          enter-active-class="vivify popInLeft"
          leave-class=""
          leave-active-class="vivify popOutRight"
          mode="out-in"
        >
          <router-view></router-view>
        </transition>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
  export default {

  }
</script>


<style>

</style>
