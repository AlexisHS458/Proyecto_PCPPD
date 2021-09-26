<template>
  <v-row v-if="!isLoading && !isLoadingWorkspace" no-gutters>
    <v-col class="flex-grow-0 flex-shrink-1">
      <div class="mx-auto div">
        <info-workspace
          :currentUser="currentUser"
          :workspace="workspace"
        ></info-workspace>
        <channels
          class="flex-grow-1"
          :users="users"
          :workspace="workspace"
          :textChannels="textChannel"
        ></channels>
        <info-user :currentUser="currentUser"></info-user>
      </div>
    </v-col>
    <v-col class="flex-grow-1 flex-shrink-0">
      <router-view> </router-view>
    </v-col>
    <v-col class="flex-grow-0 flex-shrink-1">
      <div class="mx-auto div">
        <invitation-user
          :user="currentUser"
          :workspace="workspace"
        ></invitation-user>
        <v-list color="primaryDark">
          <list-user
            v-for="(user, index) in users"
            :user="user"
            :key="index"
            :currentUser="currentUser"
            :workspace="workspace"
          ></list-user>
        </v-list>
      </div>
    </v-col>
    <!--   Peticiones exitosas del modulo de Invitaciones -->
    <snackbar
      :color="'success'"
      :snackText="snackbarMessage"
      :status="status.showSnackbar"
      :timeout="timeout"
      :method="setNotVisibleSnackBarInvitations"
    ></snackbar>

    <!--   Errores del modulo de Invitaciones -->
    <snackbar
      :color="'error'"
      :snackText="snackbarErrorMessage"
      :status="status.showSnackbarError"
      :timeout="timeout"
      :method="setNotVisibleSnackBarErrorInvitations"
    ></snackbar>

    <!--   Peticiones exitosas del modulo de Workspace -->
    <snackbar
      :color="'success'"
      :snackText="snackbarMessageWorkspace"
      :status="statusWorkspace.showSnackbar"
      :timeout="timeout"
      :method="setNotVisibleSnackBarWorkspace"
    ></snackbar>
    <!--   Errores del modulo de Workspace -->
    <snackbar
      :color="'error'"
      :snackText="snackbarMessageErrorWorkspace"
      :status="statusWorkspace.showSnackbarError"
      :timeout="timeout"
      :method="setNotVisibleSnackBarErrorWorkspace"
    ></snackbar>
  </v-row>
  <div v-else class="div-progress-circular">
    <v-progress-circular indeterminate :size="120" :width="4" color="primary">
    </v-progress-circular>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import InfoWorkspace from "@/components/modules/Workspace/InfoWorkspace.vue";
import InfoUser from "@/components/modules/Workspace/InfoUser.vue";
import Channels from "@/components/modules/Workspace/Channels/ViewChannels.vue";
import InvitationUser from "@/components/modules/Workspace/InvitationUser.vue";
import ListUser from "@/components/modules/Workspace/ListUsers.vue";
import Snackbar from "@/components/modules/Workspace/Snackbar.vue";
import { User } from "@/models/user";
import { TextChannel } from "@/models/textChannel";
import { Workspace } from "@/models/workspace";
import { Message } from "@/models/message";
const User = namespace("UserModule");
const MyWorkSpace = namespace("WorkspaceModule");
const Messages = namespace("TextChannelModule");
const Invitations = namespace("InvitationsModule");
@Component({
  components: {
    InfoWorkspace,
    Channels,
    InfoUser,
    InvitationUser,
    ListUser,
    Snackbar,
  },
})
export default class Spacework extends Vue {
  /**
   * Accion obtenida del @module User
   */
  @User.Action
  private fetchCurrentUser!: () => Promise<void>;

  /**
   * Estado obtenido del @module User
   */
  @User.State("user")
  private currentUser!: User;

  /**
   * Getters obtenidos del @module User
   */
  @User.Getter
  private isLoading!: boolean;

  @User.Getter
  private isLoggedIn!: boolean;

  /**
   * Acciones obtenidas del @module Workspace
   */

  @MyWorkSpace.Action
  private fetchMyWorkspace!: (id: string) => Promise<void>;

  @MyWorkSpace.Action
  private fetchTextChannels!: (id: string) => Promise<void>;

  @MyWorkSpace.Action
  private fetchUsersInWorkspace!: () => void;

  @MyWorkSpace.Action("setNotVisibleSnackBar")
  setNotVisibleSnackBarWorkspace!: () => void;

  @MyWorkSpace.Action("setNotVisibleSnackBarError")
  setNotVisibleSnackBarErrorWorkspace!: () => void;

  /**
   * Estados obtenidos del @module Workspace
   */
  @MyWorkSpace.State("textChannels")
  private textChannel!: TextChannel[];

  @MyWorkSpace.State("workspace")
  private workspace!: Workspace;

  @MyWorkSpace.State("users")
  private users!: User[];

  @MyWorkSpace.State("status")
  private statusWorkspace!: any;

  @MyWorkSpace.State("snackbarMessage")
  private snackbarMessageWorkspace!: string;

  @MyWorkSpace.State("snackbarMessageError")
  private snackbarMessageErrorWorkspace!: string;

  /**
   * Getter obtenido del @module Workspace
   */
  @MyWorkSpace.Getter
  private isLoadingWorkspace!: boolean;

  /**
   * Accion obtenida del @module Messages
   */
  @Messages.Action
  private fetchMesages!: () => void;

  @Messages.Action
  private setTextChannelIDtoModule!: (id: string) => void;

  @Messages.Action
  private setWorkspaceIDtoModule!: (id: string) => void;

  /**
   * Estados obtenidos del @module Messages
   */
  @Messages.State("messages")
  private messages!: Message[];

  /**
   * Getter obtenido del @module Messages
   */
  @Messages.Getter
  private isLoadingMessages!: boolean;

  /**
   * Acciones obtenidas del @module Invitations
   */
  @Invitations.Action("setNotVisibleSnackBar")
  setNotVisibleSnackBarInvitations!: () => void;

  @Invitations.Action("setNotVisibleSnackBarError")
  setNotVisibleSnackBarErrorInvitations!: () => void;

  /**
   * Estados obtenidos del @module Invitations
   */
  @Invitations.State("snackbarMessage")
  private snackbarMessage!: string;

  @Invitations.State("snackbarMessageError")
  private snackbarErrorMessage!: string;

  @Invitations.State("status")
  private status!: any;

  public timeout = -1;

  async created() {
    if (!this.isLoggedIn) {
      await this.fetchCurrentUser();
    }
    //Obtener información del espacio de trabajo
    await this.fetchMyWorkspace(this.$route.params.id);
    //Obtener información de los canles del espacio de trabajo
    await this.fetchTextChannels(this.$route.params.id);
    //Obtener usuarios del espacio de trabajo
    this.fetchUsersInWorkspace();
  }

  destroyed() {
    this.setNotVisibleSnackBarInvitations();
    this.setNotVisibleSnackBarWorkspace();
  }
}
</script>

<style scoped>
.div {
  height: 100vh;
  width: 40vh;
  display: flex;
  flex-direction: column;
  background-color: #000029;
}

.div-progress-circular {
  margin: auto;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
