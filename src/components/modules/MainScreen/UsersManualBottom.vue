<template>
  <!--  <v-speed-dial v-model="fab" bottom left fixed>
    <template v-slot:activator>
      <v-btn v-model="fab" color="primary" dark text fab small left bottom>
        <v-icon v-if="fab"> mdi-close </v-icon>
        <v-icon v-else> mdi-help-circle-outline </v-icon>
      </v-btn>
    </template>
    <v-btn fab dark small color="green">
      <v-icon>mdi-pencil</v-icon>
    </v-btn>
    <v-btn fab dark small color="indigo">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-btn fab dark small color="red">
      <v-icon>mdi-delete</v-icon>
    </v-btn>
  </v-speed-dial> -->
  <a
    href="https://drive.google.com/file/d/10DPJz7aK298rR7oPAe2xDR8S9R6CouQW/view?usp=sharing"
    target="_blank"
  >
    <v-tooltip right>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          text
          fab
          small
          left
          bottom
          fixed
          v-bind="attrs"
          v-on="on"
        >
          <v-icon> mdi-help-circle-outline </v-icon>
        </v-btn>
      </template>
      <span>Ver manual de usuario</span>
    </v-tooltip>
  </a>
</template>


 <script lang="ts">
import { Component, Ref } from "vue-property-decorator";

import Vue from "vue";

@Component
export default class AddCard extends Vue {
  public fab = false;
}
</script>