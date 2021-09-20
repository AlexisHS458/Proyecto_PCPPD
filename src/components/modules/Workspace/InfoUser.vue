<template>
  <v-app-bar color="primaryDark" dense class="toolbar">
    <v-toolbar-title>
      {{ currentUser.nombre + " " + currentUser.apellido }}
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon @click="toggleMicrophone">
      <v-icon v-if="isTalk" color="success">mdi-microphone</v-icon>
      <v-icon v-else color="error">mdi-microphone-off</v-icon>
    </v-btn>
    <v-btn icon @click="toggleHeadphones">
      <v-icon v-if="isListening" color="success">mdi-headphones</v-icon>
      <v-icon v-else color="error">mdi-headphones-off</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import { User } from "@/models/user";
import { Prop } from "vue-property-decorator";
const User = namespace("UserModule");

@Component
export default class UserInfo extends Vue {
  @Prop({
    required: true,
  })
  public currentUser!: User;

  public loading = false;
  public isTalk = true;
  public isListening = true;

  toggleMicrophone() {
    this.isTalk = !this.isTalk;
  }

  toggleHeadphones() {
    this.isListening = !this.isListening;
  }
}
</script>

<style scoped>
.toolbar {
  flex: none;
}
.v-toolbar__title {
  color: white;
}
</style>