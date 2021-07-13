<template>
  <edit-information />
</template>

<script lang="ts">
import Vue from "vue";
import EditInformation from "@/components/modules/EditInformation.vue";

export default Vue.extend({
  name: "Edit",

  components: {
    EditInformation,
  },
});
</script>

