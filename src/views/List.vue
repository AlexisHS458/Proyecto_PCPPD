<template>
  <list />
</template>

<script lang="ts">
import Vue from "vue";
import list from "@/components/modules/List.vue";

export default Vue.extend({
  name: "Dashboard",

  components: {
    list,
  },
});
</script>