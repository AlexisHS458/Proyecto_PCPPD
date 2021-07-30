<template>
  <v-row>
    <v-col v-for="(item, index) in workSpacesList" :key="index" cols="4">
      <workspace-card :workspace="item"></workspace-card>
    </v-col>
    <collaboration-card></collaboration-card>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import { User } from "@/models/user";
import { Workspace } from "@/models/workspace";
import CollaborationCard from "@/components/modules/CollaborationCard.vue";

import WorkspaceCard from "@/components/modules/WorkspaceCard.vue";

const User = namespace("UserModule");
const OwnSpacework = namespace("WorkSpaceModule");

@Component({
  components: {
    CollaborationCard,

    WorkspaceCard,
  },
})
export default class OwnCard extends Vue {
  public space: { visible: boolean }[] = [];

  @User.State("user")
  private currentUser!: User;

  @OwnSpacework.State("workSpacesList")
  private workSpacesList!: Workspace[];

  @OwnSpacework.Action
  private fetchWorkspaces!: (uid: string) => void;

  mounted(): void {
    this.fetchWorkspaces(this.currentUser.uid);
    // for (let i = 0; i < this.workSpacesList.length; i++) {
    //   this.space.push({ visible: false });
    // }
  }

  toggle(key: number) {
    this.space[key].visible = !this.space[key].visible;
  }
}
</script>


<style scoped>
.card-title {
  height: 150px !important;
  background-color: #ffffff !important;
  font-size: 2.5rem !important;
  justify-content: center !important;
}

.card-subtitle {
  background-color: #0c2a52;
  font-size: 1rem !important;
  justify-content: center !important;
  color: #ffffff !important;
  padding-top: 16px !important;
  padding-bottom: 0px !important;
}

.card-actions {
  background-color: #0c2a52;
}

.card-text {
  width: 100%;
  height: 60px;
  align-items: center;
  display: flex;
}

.coll {
  margin: auto;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>