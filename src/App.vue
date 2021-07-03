<template>
  <v-app>
    <home />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Home from './views/Home.vue';

export default Vue.extend({
  components: { Home },
  name: 'App',

  data: () => ({
    //
  }),
});
</script>
