<template>
  <v-navigation-drawer
    app
    clipped
    right
    v-model="status.showTreeView"
    color="primaryDark"
    dark
  >
    <v-list dark>
      <v-list-item
        v-for="folder in folders"
        :key="folder.title"
        @click="() => {}"
      >
        <v-list-item-avatar>
          <v-icon dark> mdi-folder </v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="folder.title"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item v-for="file in files" :key="file.title">
        <v-list-item-avatar>
          <v-icon :class="file.color" v-text="file.icon"></v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-text="file.title"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const CodeChannel = namespace("CodeChannelModule");

@Component
export default class ViewTreeViwe extends Vue {
  @CodeChannel.State("status")
  private status!: any;

  public drawer = null;

  public files = [
    {
      color: "blue",
      icon: "mdi-clipboard-text",
      subtitle: "Jan 20, 2014",
      title: "Vacation itinerary",
    },
    {
      color: "amber",
      icon: "mdi-gesture-tap-button",
      subtitle: "Jan 10, 2014",
      title: "Kitchen remodel",
    },
  ];
  public folders = [
    {
      subtitle: "Jan 9, 2014",
      title: "Photos",
    },
    {
      subtitle: "Jan 17, 2014",
      title: "Recipes",
    },
    {
      subtitle: "Jan 28, 2014",
      title: "Work",
    },
  ];
}
</script>



<style scoped>
.f {
  color: white;
}
</style>