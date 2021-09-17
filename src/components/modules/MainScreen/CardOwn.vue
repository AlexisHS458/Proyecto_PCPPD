<template>
  <v-row>
    <v-col v-for="(item, index) in workSpacesList" :key="index" cols="4">
      <my-workspaces :workspace="item" :user="user"></my-workspaces>
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
import CollaborationCard from "@/components/modules/MainScreen/CardCollaboration.vue";
import MyWorkspaces from "@/components/modules/MainScreen/MyWorkspaces/CardMyWorkspaces.vue";
import { Prop } from "vue-property-decorator";
const User = namespace("UserModule");
const OwnSpacework = namespace("MainScreenModule");

@Component({
  components: {
    CollaborationCard,
    MyWorkspaces,
  },
})
export default class CardOwn extends Vue {
  @Prop({
    required: true,
  })
  public user!: User;

  @User.State("user")
  private currentUser!: User;

  @OwnSpacework.Action
  private fetchWorkspaces!: (uid: string) => void;

  @OwnSpacework.State("workSpacesList")
  private workSpacesList!: Workspace[];

  public space: { visible: boolean }[] = [];

  mounted(): void {
    this.fetchWorkspaces(this.currentUser.uid!);
  }
}
</script>

