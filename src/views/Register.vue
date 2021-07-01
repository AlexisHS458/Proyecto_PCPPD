<template>
  <form-register />
</template>

<script lang="ts">
import Vue from "vue";
import FormRegister from "../components/FormRegister.vue";

export default Vue.extend({
  name: "Home",

  components: {
    FormRegister,
  },
});
</script>
