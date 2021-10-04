<template>
  <space-work />
</template>

<script lang="ts">
import Vue from "vue";
import SpaceWork from "@/components/modules/Workspace/ViewWorkspace.vue";
import "@/assets/global.css";
export default Vue.extend({
  name: "Space",
  beforeCreate: function () {
    document.body.className = "home";
  },
  components: {
    SpaceWork,
  },
});
</script>
