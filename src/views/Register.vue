<template>
  <register-form />
</template>

<script lang="ts">
import Vue from "vue";
import RegisterForm from "@/components/modules/RegisterForm.vue";

export default Vue.extend({
  name: "Register",

  components: {
    RegisterForm,
  },
});
</script>
