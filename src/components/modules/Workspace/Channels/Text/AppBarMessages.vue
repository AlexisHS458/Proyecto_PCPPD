<template>
  <v-app-bar color="primary" flat dense class="toolbar">
    <v-icon color="white" class="pr-4">mdi-message-processing-outline</v-icon>
    <v-toolbar-title>{{ channelApp.nombre }}</v-toolbar-title>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue } from "vue-property-decorator";
import { TextChannel } from "@/models/textChannel";

@Component
export default class AppBarMessages extends Vue {
  @Prop({
    required: true,
  })
  public channelApp!: TextChannel;
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