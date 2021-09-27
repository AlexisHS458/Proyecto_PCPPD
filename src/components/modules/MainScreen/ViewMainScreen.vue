<template>
  <v-container v-if="!isLoading">
    <v-row>
      <app-bar></app-bar>
    </v-row>
    <own-card :user="currentUser"></own-card>
    <invitation-card :user="currentUser"></invitation-card>
    <floating-button></floating-button>
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
  </v-container>
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
import { User } from "@/models/user";
const User = namespace("UserModule");
const LeaveWorkspace = namespace("MainScreenModule");
const Invitations = namespace("InvitationsModule");
@Component({
  components: {
    AppBar,
    OwnCard,
    CollaborationCard,
    InvitationCard,
    FloatingButton,
    Snackbar,
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

  /**
   * Estados obtenidos del @module Invitations
   */
  @Invitations.State("status")
  private statusInvitations!: any;

  @Invitations.State("snackbarMessage")
  private snackbarMessageInvitation!: string;

  @Invitations.State("snackbarMessageError")
  private snackbarMessageErrorInvitation!: string;

  public timeout = -1;

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
  }
}
</script>

<style scoped>
.div-progress-circular {
  margin: auto;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
 


