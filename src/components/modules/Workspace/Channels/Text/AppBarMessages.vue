<template>
  <v-app-bar color="primary" flat dense class="toolbar">
    <v-icon
      color="white"
      class="mr-4"
      @click="toggleShowNavigationDrawerChannels"
      >mdi-menu</v-icon
    >
    <v-toolbar-title>{{ channelApp.nombre }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-icon
      color="white"
      class="mr-4 d-flex d-md-none"
      @click="toggleShowNavigationDrawer"
    >
      mdi-account-multiple-outline
    </v-icon>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue } from "vue-property-decorator";
import { TextChannel } from "@/models/textChannel";
import { namespace } from "vuex-class";
const CodeChannel = namespace("CodeChannelModule");
@Component
export default class AppBarMessages extends Vue {
  @CodeChannel.Action
  private toggleShowNavigationDrawer!: () => void;

  @CodeChannel.Action
  private toggleShowNavigationDrawerChannels!: () => void;

  @Prop({
    required: true,
  })
  public channelApp!: TextChannel;
}
</script>



<style scoped>
.v-toolbar__title {
  color: white;
}
</style>