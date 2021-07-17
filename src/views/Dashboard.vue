<template>
  <dashboard-view />
</template>

<script lang="ts">
import Vue from "vue";
import DashboardView from "@/components/modules/DashboardView.vue";

export default Vue.extend({
  name: "Dashboard",

  components: {
    DashboardView,
  },
});
</script>

