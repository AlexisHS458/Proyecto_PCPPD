<template>
  <v-list dark>
    <v-list-item
      v-for="treeEntry in treeEntries"
      :key="treeEntry.object.id"
      @click="goToPath(treeEntry)"
    >
      <v-list-item-avatar>
        <v-icon dark v-if="treeEntry.type == 'tree'"> mdi-folder </v-icon>
        <v-icon dark v-else-if="treeEntry.type == 'blob'"> mdi-file </v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title v-text="treeEntry.name"></v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import { Maybe, Tree, TreeEntry, Blob } from "@/generated/graphql";
import { namespace } from "vuex-class";
const CodeChannelModule = namespace("CodeChannelModule");
const User = namespace("UserModule");
import { User } from "@/models/user";
@Component
export default class ViewTreeView extends Vue {
  @Prop({
    required: true
  })
  public treeEntries!: Maybe<TreeEntry[]>;

  @CodeChannelModule.Action
  private addPathState!: (path: string) => void;

  @CodeChannelModule.Action
  private setCodeData!: (data: TreeEntry) => void;

  @CodeChannelModule.State("driverUID")
  private driverUID!: string;

  @User.State("user")
  private currentUser!: User;

  goToPath(treeEntry: TreeEntry) {
    switch ((treeEntry.object as any)?.__typename) {
      case "Tree":
        const tree = treeEntry.object as Tree;
        this.addPathState(tree.id);
        break;
      case "Blob":
        if (this.driverUID === this.currentUser.uid!) {
          const blob = treeEntry.object as Blob;
          if (blob.isBinary == false) {
            this.setCodeData(treeEntry);
          }
        }
        break;
      default:
        break;
    }
  }
}
</script>

<style scoped>
.f {
  color: white;
}
</style>
