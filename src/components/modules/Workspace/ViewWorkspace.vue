<template>
  <div v-if="!isLoading && !isLoadingWorkspace" id="app" class="body">
    <v-navigation-drawer
      v-model="statusDrawer.showNavigationDrawerChannels"
      app
      width="300"
    >
      <div class="div">
        <info-workspace
          class="flex-grow-0 flex-shrink-1"
          :currentUser="currentUser"
          :workspace="workspace"
        ></info-workspace>
        <channels
          class="overflow-y-auto flex-grow-1 scroll-list-channel"
          :users="users"
          :workspace="workspace"
          :textChannels="textChannel"
          :voiceChannels="voiceChannel"
          :codeChannels="codeChannel"
        ></channels>
        <info-user
          class="flex-grow-0 flex-shrink-1"
          :currentUser="currentUser"
        ></info-user>
      </div>
    </v-navigation-drawer>
    <router-view style="height: 92vh"> </router-view>
    <router-view name="NavigationDrawer"></router-view>
    <router-view name="tree"></router-view>
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

    <snackbar
      :color="'warning'"
      :snackText="snackbarMessageWarningWorkspace"
      :status="statusWorkspace.showSnackbarWarning"
      :timeout="timeout"
      :method="setNotVisibleSnackBarWarningWorkspace"
    ></snackbar>

    <!--   Peticiones exitosas del modulo de Permissions -->
    <snackbar
      :color="'success'"
      :snackText="snackbarMessagePermissions"
      :status="statusPermissions.showSnackbar"
      :timeout="timeout"
      :method="setNotVisibleSnackBarPermissions"
    ></snackbar>
  </div>
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
import UserInfoInList from "@/components/modules/Workspace/UserInfoInList.vue";

import { User } from "@/models/user";
import { TextChannel } from "@/models/textChannel";
import { Workspace } from "@/models/workspace";
import { Message } from "@/models/message";
import { VoiceChannel } from "@/models/voiceChannel";
import { CodeChannel } from "@/models/codeChannel";
const CodeChannel = namespace("CodeChannelModule");
const User = namespace("UserModule");
const MyWorkSpace = namespace("WorkspaceModule");
const Messages = namespace("TextChannelModule");
const Invitations = namespace("InvitationsModule");
const Permissions = namespace("PermissionsModule");
@Component({
  components: {
    InfoWorkspace,
    Channels,
    InfoUser,
    InvitationUser,
    ListUser,
    Snackbar,
    UserInfoInList,
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
  private fetchVoiceChannels!: (id: string) => Promise<void>;

  @MyWorkSpace.Action
  private fetchCodeChannels!: (id: string) => Promise<void>;

  @MyWorkSpace.Action
  private fetchUsersInWorkspace!: () => Promise<void>;

  @MyWorkSpace.Action("setNotVisibleSnackBar")
  setNotVisibleSnackBarWorkspace!: () => void;

  @MyWorkSpace.Action("setNotVisibleSnackBarError")
  setNotVisibleSnackBarErrorWorkspace!: () => void;

  @MyWorkSpace.Action("setNotVisibleSnackBarWarning")
  setNotVisibleSnackBarWarningWorkspace!: () => void;

  /**
   * Estados obtenidos del @module Workspace
   */
  @MyWorkSpace.State("textChannels")
  private textChannel!: TextChannel[];

  @MyWorkSpace.State("voiceChannels")
  private voiceChannel!: VoiceChannel[];

  @MyWorkSpace.State("codeChannels")
  private codeChannel!: CodeChannel[];

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

  @MyWorkSpace.State("snackbarMessageWarning")
  private snackbarMessageWarningWorkspace!: string;

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

  @Permissions.Action("setNotVisibleSnackBar")
  setNotVisibleSnackBarPermissions!: () => void;

  @Permissions.State("snackbarMessage")
  private snackbarMessagePermissions!: string;

  @Permissions.State("status")
  private statusPermissions!: any;

  @CodeChannel.State("status")
  private statusDrawer!: any;

  public timeout = -1;
  public drawer = null;

  async created() {
    if (!this.isLoggedIn) {
      await this.fetchCurrentUser();
    }
    //Obtener información del espacio de trabajo
    await this.fetchMyWorkspace(this.$route.params.id);
    //Obtener información de los canales de texto del espacio de trabajo
    await this.fetchTextChannels(this.$route.params.id);
    //Obtener información de los canales de voz del espacio de trabajo
    await this.fetchVoiceChannels(this.$route.params.id);
    //Obtener información de los canales de código del espacio de trabajo
    await this.fetchCodeChannels(this.$route.params.id);
    //Obtener usuarios del espacio de trabajo
    await this.fetchUsersInWorkspace();
  }

  destroyed() {
    this.setNotVisibleSnackBarInvitations();
    this.setNotVisibleSnackBarWorkspace();
    this.setNotVisibleSnackBarPermissions();
  }
}
</script>

<style scoped>
.div {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #000029;
  max-height: 100vh;
}

.div-progress-circular {
  margin: auto;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.body {
  background-color: #0c2a52;
}

#app {
  background-color: #0c2a52;
  height: 100%;
}

.scroll-list-channel::-webkit-scrollbar {
  width: 5px;
}
.scroll-list-channel::-webkit-scrollbar-track {
  background-color: #000029;
  border-radius: 10px;
}
.scroll-list-channel::-webkit-scrollbar-thumb {
  background-color: #3e527e;
  border-radius: 10px;
}
.scroll-list-channel {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
</style>
