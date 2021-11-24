<template>
  <div v-if="!isLoading">
    <app-bar></app-bar>
    <v-container fluid class="scroll">
      <v-container class="mb-16">
        <template>
          <own-card :user="currentUser"></own-card>
        </template>
        <div v-show="(currentUser.workspacesCount || 0) < 1">
          <floating-button></floating-button>
        </div>
        <users-manual-bottom></users-manual-bottom>
      </v-container>
    </v-container>

    <!--   Peticiones exitosas del modulo de MainScreen -->
    <snackbar
      :color="'success'"
      :snackText="snackbarMessage"
      :status="status.showSnackbar"
      :timeout="timeout"
      :method="setNotVisibleSnackBar"
    ></snackbar>
    <!--   Errores del modulo de MainScreen -->
    <snackbar
      :color="'error'"
      :snackText="snackbarMessageError"
      :status="status.showSnackbarError"
      :timeout="timeout"
      :method="setNotVisibleSnackBarError"
    ></snackbar>
    <!--   Errores del modulo de Invitaciones -->
    <snackbar
      :color="'error'"
      :snackText="snackbarMessageErrorInvitation"
      :status="statusInvitations.showSnackbarError"
      :timeout="timeout"
      :method="setNotVisibleSnackBarErrorInvitations"
    ></snackbar>
    <!--   Peticiones exitosas del modulo de Invitaciones -->
    <snackbar
      :color="'success'"
      :snackText="snackbarMessageInvitation"
      :status="statusInvitations.showSnackbar"
      :timeout="timeout"
      :method="setNotVisibleSnackBarInvitations"
    ></snackbar>
    <snackbar-warning
      :color="'warning'"
      :snackText="snackbarMessageInvitation"
      :status="statusInvitations.showSnackbarWarning"
      :timeout="timeout"
      :method="setNotVisibleSnackBarWarningInvitations"
    ></snackbar-warning>
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
import AppBar from "@/components/modules/MainScreen/AppBar.vue";
import OwnCard from "@/components/modules/MainScreen/CardOwn.vue";
import FloatingButton from "@/components/modules/MainScreen/AddWorkspace.vue";
import CollaborationCard from "@/components/modules/MainScreen/CardCollaboration.vue";
import InvitationCard from "@/components/modules/MainScreen/CardInvitation.vue";
import Snackbar from "@/components/modules/Workspace/Snackbar.vue";
import SnackbarWarning from "@/components/modules/Workspace/SnackbarWarning.vue";
import UsersManualBottom from "@/components/modules/MainScreen/UsersManualBottom.vue";
import { User } from "@/models/user";
const User = namespace("UserModule");
const LeaveWorkspace = namespace("MainScreenModule");
const Invitations = namespace("InvitationsModule");
const SocketIO = namespace("SocketIO");
@Component({
  components: {
    AppBar,
    OwnCard,
    CollaborationCard,
    InvitationCard,
    FloatingButton,
    Snackbar,
    SnackbarWarning,
    UsersManualBottom,
  },
})
export default class ViewMainScreen extends Vue {
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
   * Accion obtenida de @module MainScreen
   */
  @LeaveWorkspace.Action
  private setNotVisibleSnackBar!: () => void;

  @LeaveWorkspace.Action("setNotVisibleSnackBarError")
  setNotVisibleSnackBarError!: () => void;

  /**
   * Estados obtenidos del @module MainScreen
   */
  @LeaveWorkspace.State("snackbarMessage")
  private snackbarMessage!: string;

  @LeaveWorkspace.State("snackbarMessageError")
  private snackbarMessageError!: string;

  @LeaveWorkspace.State("status")
  private status!: any;

  /**
   * Acciones obtenidas del @module Invitations
   */
  @Invitations.Action("setNotVisibleSnackBar")
  setNotVisibleSnackBarInvitations!: () => void;

  @Invitations.Action("setNotVisibleSnackBarError")
  setNotVisibleSnackBarErrorInvitations!: () => void;

  @Invitations.Action("setNotVisibleSnackBarWarning")
  setNotVisibleSnackBarWarningInvitations!: () => void;

  /**
   * Estados obtenidos del @module Invitations
   */
  @Invitations.State("status")
  private statusInvitations!: any;

  @Invitations.State("snackbarMessage")
  private snackbarMessageInvitation!: string;

  @Invitations.State("snackbarMessageError")
  private snackbarMessageErrorInvitation!: string;

  @SocketIO.Action
  private connect!: () => void;

  public timeout = -1;
  public userWorkspace = 0;

  async created() {
    if (!this.isLoggedIn) {
      await this.fetchCurrentUser();
    }
  }

  destroyed() {
    this.setNotVisibleSnackBar();
    this.setNotVisibleSnackBarInvitations();
    this.setNotVisibleSnackBarErrorInvitations();
    this.setNotVisibleSnackBarError();
    this.setNotVisibleSnackBarWarningInvitations();
  }
}
</script>

<style scoped>
.body {
  background-color: #edf0f3;
}
.div-progress-circular {
  margin: auto;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.scroll {
  overflow-y: auto;
  height: 100vh;
}

.scroll::-webkit-scrollbar {
  width: 5px;
}
.scroll::-webkit-scrollbar-track {
  background-color: #000029;
  border-radius: 10px;
}
.scroll::-webkit-scrollbar-thumb {
  background-color: #3e527e;
  border-radius: 10px;
}
/* .container {
  max-width: 100%;
} */
</style>
 


