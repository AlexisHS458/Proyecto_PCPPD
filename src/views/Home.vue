<template>
  <login-form></login-form>
</template>

<script lang="ts">
import Vue from "vue";
import LoginForm from "@/components/modules/Login/LoginForm.vue";
import "@/assets/global.css";
export default Vue.extend({
  name: "Home",
  beforeCreate: function () {
    document.body.className = "home";
  },
  components: {
    LoginForm,
  },
});
</script>


