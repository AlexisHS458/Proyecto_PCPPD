<template>
  <div>
    <v-app-bar color="primary" flat dense class="toolbar">
      <v-icon
        color="white"
        class="mr-4"
        @click="toggleShowNavigationDrawerChannels"
        >mdi-menu</v-icon
      >
      <v-spacer></v-spacer>
      <v-icon color="white" class="mr-4" @click="toggleShowNavigationDrawer">
        mdi-account-multiple-outline
      </v-icon>
    </v-app-bar>
    <div class="card-center">
      <img src="@/assets/Coworking-amico.svg" class="img" />
      <h1 class="h">Selecciona un canal</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue } from "vue-property-decorator";

import { namespace } from "vuex-class";
const CodeChannel = namespace("CodeChannelModule");
@Component
export default class AppBarMessages extends Vue {
  @CodeChannel.Action
  private toggleShowNavigationDrawer!: () => void;

  @CodeChannel.Action
  private toggleShowNavigationDrawerChannels!: () => void;
}
</script>


<style scoped>
.card-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 100%;
  height: 100%;
}

.img {
  border-radius: 1rem;
  width: 25rem !important;
  height: 25rem !important;
}

.h {
  text-align: center;
  color: white;
}
</style>