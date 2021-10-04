<template>
  <main-screen></main-screen>
</template>

<script lang="ts">
import Vue from "vue";
import MainScreen from "@/components/modules/MainScreen/ViewMainScreen.vue";
/* import "@/assets/global.css"; */
export default Vue.extend({
  name: "Dashboard",
  /*  beforeCreate: function() {
        document.body.className = 'home';
    }, */
  components: {
    MainScreen,
  },
});
</script>

