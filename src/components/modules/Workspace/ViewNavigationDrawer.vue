<template>
  <v-navigation-drawer app clipped right color="primaryDark" v-model="drawer">
    <div class="flex-column d-flex">
      <invitation-user
        :user="currentUser"
        :workspace="workspace"
      ></invitation-user>
      <user-info-in-list :currentUser="currentUser"></user-info-in-list>
      <v-list color="primaryDark mt-0 pt-0">
        <list-user
          v-for="user in users"
          :user="user"
          :key="user.uid"
          :currentUser="currentUser"
          :workspace="workspace"
        ></list-user>
      </v-list>
    </div>
  </v-navigation-drawer>
  <!-- <v-navigation-drawer app clipped right v-model="drawer">
    <v-list>
      <v-list-item v-for="n in 5" :key="n" link>
        <v-list-item-content>
          <v-list-item-title>Item {{ n }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer> -->
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import InvitationUser from "@/components/modules/Workspace/InvitationUser.vue";
import ListUser from "@/components/modules/Workspace/ListUsers.vue";
import Snackbar from "@/components/modules/Workspace/Snackbar.vue";
import UserInfoInList from "@/components/modules/Workspace/UserInfoInList.vue";
import { User } from "@/models/user";
import { Workspace } from "@/models/workspace";
const User = namespace("UserModule");
const MyWorkSpace = namespace("WorkspaceModule");

@Component({
  components: {
    InvitationUser,
    ListUser,
    Snackbar,
    UserInfoInList,
  },
})
export default class Spacework extends Vue {
  /**
   * Estado obtenido del @module User
   */
  @User.State("user")
  private currentUser!: User;
  /**
   * Estados obtenidos del @module Workspace
   */

  @MyWorkSpace.State("workspace")
  private workspace!: Workspace;

  @MyWorkSpace.State("users")
  private users!: User[];

  public timeout = -1;
  public drawer = null;
}
</script>