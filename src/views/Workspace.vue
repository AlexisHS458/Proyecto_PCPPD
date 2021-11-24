<template>
  <space-work />
</template>

<script lang="ts">
import Vue from "vue";
import SpaceWork from "@/components/modules/Workspace/ViewWorkspace.vue";

export default Vue.extend({
  name: "Space",
  components: {
    SpaceWork,
  },
});
</script>
