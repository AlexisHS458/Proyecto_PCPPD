<template>
  <login-form />
</template>

<script lang="ts">
import Vue from "vue";
import LoginForm from "@/components/modules/LoginForm.vue";

export default Vue.extend({
  name: "Home",

  components: {
    LoginForm,
  },
});
</script>
