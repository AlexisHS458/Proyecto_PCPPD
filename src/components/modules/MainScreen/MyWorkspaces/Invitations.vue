<template>
  <v-card>
    <v-card-title>
      {{ getInitials(invitation.nombreEspacioTrabajo) }}
    </v-card-title>
    <v-card-subtitle>{{ invitation.nombreEspacioTrabajo }} </v-card-subtitle>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn icon @click="show = !show">
        <v-icon color="white">{{
          show ? "mdi-chevron-up" : "mdi-chevron-down"
        }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show" color="primary">
        <v-divider></v-divider>

        <v-card-text>
          <v-row align="center" justify="space-around">
            <v-btn
              color="success"
              @click="acceptInvitationToWorkspace"
              :loading="loading"
            >
              Aceptar <v-icon class="ml-6"> mdi-check </v-icon>
            </v-btn>
            <v-btn color="error" @click="declineInvitationToWorkspace">
              Rechazar <v-icon class="ml-6"> mdi-close </v-icon>
            </v-btn>
          </v-row>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Invitation } from "@/models/invitation";
import { StringUtils } from "@/utils/stringsUtils";
import { namespace } from "vuex-class";
import { Workspace } from "@/models/workspace";
import { User } from "@/models/user";
const OptionsInvitation = namespace("InvitationsModule");
const MyWorkSpace = namespace("WorkspaceModule");
const User = namespace("UserModule");
@Component
export default class InvitationsCard extends Vue {
  @Prop({
    required: true,
  })
  public invitation!: Invitation;

  /**
   * Acciones obtenidas del @module Invitations
   */
  @OptionsInvitation.Action
  private acceptInvitation!: (invitation: Invitation) => void;

  @OptionsInvitation.Action
  private declineInvitation!: (invitation: Invitation) => void;

  @OptionsInvitation.Action
  private setMessageOnSnackbar!: (message: string) => void;

  @OptionsInvitation.Action
  private setVisibleSnackBarWarning!: () => void;

  @OptionsInvitation.Action
  private setVisibleSnackBar!: () => void;

  /**
   * Estados obtenidos del @module Invitations
   */
  @OptionsInvitation.State("status")
  private statusInvitations!: any;

  @OptionsInvitation.State("snackbarMessage")
  private snackbarMessageInvitation!: string;

  /**
   * Estado obtenidas del @module Invitations
   */
  @OptionsInvitation.State("status")
  private status!: any;

  /**
   * Acciones obtenidas del @module Workspace
   */
  @MyWorkSpace.Action
  private fetchMyWorkspace!: (id: string) => Promise<void>;

  /**
   * Estado obtenidas del @module Workspace
   */
  @MyWorkSpace.State("workspace")
  private workspace!: Workspace;

  @User.State("user")
  private currentUser!: User;

  public getInitials = StringUtils.getInitials;
  public show = true;
  public loading = false;

  async acceptInvitationToWorkspace() {
    this.loading = true;
    await this.fetchMyWorkspace(this.invitation.idEspacioTrabajo);
    if ((this.currentUser.workspacesCollab || 0) < 2) {
      if (this.workspace.usuarios.length < 7) {
        this.loading = false;
        await this.acceptInvitation(this.invitation);
        this.show = false;

        /*   if (this.status.showSnackbar && !this.status.showSnackbarError) {
          this.show = false;
        } else {
          this.show = false;
        } */
      } else {
        this.loading = false;
        this.setVisibleSnackBarWarning();
        this.setMessageOnSnackbar(
          "No hay lugares para unirse a este espacio de trabajo. <br> Contacta al administrador que te invitó."
        );
      }
    } else {
      this.loading = false;
      this.setVisibleSnackBarWarning();
      this.setMessageOnSnackbar(
        "No puedes pertenecer más de dos espacios como colaborador"
      );
    }
  }

  async declineInvitationToWorkspace() {
    await this.declineInvitation(this.invitation);
    this.show = false;
  }
}
</script>

<style scoped>
.v-card__title {
  height: 150px !important;
  background-color: #ffffff !important;
  font-size: 2.5rem !important;
  justify-content: center !important;
}

.v-card__subtitle {
  background-color: #0c2a52;
  font-size: 1rem !important;
  justify-content: center !important;
  color: #ffffff;
}

.v-card__actions {
  background-color: #0c2a52;
}

.v-card__text {
  width: 100%;
  height: 60px;
  align-items: center;
  display: flex;
}

.theme--light.v-card > .v-card__text,
.theme--light.v-card > .v-card__subtitle {
  color: #ffffff;
}

.v-card__title + .v-card__subtitle,
.v-card__title + .v-card__text {
  padding-top: 16px;
  padding-bottom: 0px;
}
</style>