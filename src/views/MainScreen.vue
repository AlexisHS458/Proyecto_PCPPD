<template>
  <main-screen></main-screen>
</template>

<script lang="ts">
import Vue from "vue";
import MainScreen from "@/components/modules/MainScreen/ViewMainScreen.vue";

export default Vue.extend({
  name: "Dashboard",

  components: {
    MainScreen,
  },
});
</script>

