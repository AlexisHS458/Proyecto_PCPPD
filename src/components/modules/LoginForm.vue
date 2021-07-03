<template>
  <div>
    <v-btn @click="sendAlert"></v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class';

const LoginFormModule = namespace('LoginForm');

@Component
export default class LoginForm extends Vue {
  @LoginFormModule.Action
  public sendAlert!: () => void
}
</script>
