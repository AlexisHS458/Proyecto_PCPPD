<template>
  <v-row>
    <v-col v-for="(workspace, index) in workSpacesList" :key="index" cols="4">
      <collaboration-card
        v-if="workspace.uid_usuario !== user.uid"
        :currentUser="currentUser"
        :workspace="workspace"
      ></collaboration-card>
      <my-workspace :workspace="workspace" :user="user" v-else></my-workspace>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import { User } from "@/models/user";
import { Workspace } from "@/models/workspace";
import CollaborationCard from "@/components/modules/MainScreen/CardCollaboration.vue";
import MyWorkspace from "@/components/modules/MainScreen/MyWorkspaces/CardMyWorkspaces.vue";
import { Prop } from "vue-property-decorator";
const User = namespace("UserModule");
const MyWorkspaces = namespace("MainScreenModule");

@Component({
  components: {
    CollaborationCard,
    MyWorkspace,
  },
})
export default class CardOwn extends Vue {
  @Prop({
    required: true,
  })
  public user!: User;

  /**
   * Estado obtenido del @module User
   */
  @User.State("user")
  private currentUser!: User;

  /**
   * Accion obtenida del @module MainScreen
   */
  @MyWorkspaces.Action
  private fetchWorkspaces!: (uid: string) => void;

  /**
   * Estado obtenido del @module MainScreen
   */
  @MyWorkspaces.State("workSpacesList")
  private workSpacesList!: Workspace[];

  /**
   * Se obtienen los espacio de trabajo de un usuario
   */
  mounted(): void {
    this.fetchWorkspaces(this.currentUser.uid!);
  }
}
</script>

