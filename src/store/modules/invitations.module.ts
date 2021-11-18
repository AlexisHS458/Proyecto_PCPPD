import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import InvitationsService from "@/services/invitations.service";
import UserService from "@/services/user.service";
import { Invitation } from "@/models/invitation";
import { User } from "@/models/user";
import invitationsService from "@/services/invitations.service";

/**
 * Modulo de invitaciones a espacios de trabajo
 */
@Module({ namespaced: true })
class InivtationsModule extends VuexModule {
  /**
   * Lista de usuarios
   */
  public users: User[] = [];

  /**
   * Mensaje a mostrar en snackbar
   */
  public snackbarMessage = "";

  /**
   * Mensaje a mostrar error en snackbar
   */
  public snackbarMessageError = "";

  /**
   * Estatos de consulta de la invitacion
   */
  public status = {
    loadingInvitations: true,
    loadingUserNamesList: true,
    invitationSent: false,
    invitationAccepted: false,
    invitationDeclined: false,
    showSnackbar: false,
    showSnackbarError: false,
    showSnackbarWarning: false
  };

  @Mutation
  public setLoadingStatus(status: boolean): void {
    this.status.loadingInvitations = status;
  }

  @Mutation
  public setUserNamesList(users: Array<User>): void {
    this.users = users;
  }

  @Mutation
  public setLoadingUserNamesStatus(status: boolean): void {
    this.status.loadingUserNamesList = status;
  }

  @Mutation
  public invitationSentSuccess(): void {
    this.status.invitationSent = true;
  }

  @Mutation
  public invitationSentFail(): void {
    this.status.invitationSent = false;
  }

  @Mutation
  public invitationAcceptedSuccess(): void {
    this.status.invitationAccepted = true;
  }

  @Mutation
  public invitationAcceptedFail(): void {
    this.status.invitationAccepted = false;
  }

  @Mutation
  public invitationDeclinedSuccess(): void {
    this.status.invitationDeclined = true;
  }

  @Mutation
  public invitationDeclinedFail(): void {
    this.status.invitationDeclined = false;
  }

  @Mutation
  public setSnackBarMessage(message: string): void {
    this.snackbarMessage = message;
  }

  @Mutation
  public setSnackBarMessageError(message: string): void {
    this.snackbarMessageError = message;
  }

  @Mutation
  public setShowSnackBarMessageError(status: boolean): void {
    this.status.showSnackbarError = status;
  }

  @Mutation
  public setShowSnackBarMessage(status: boolean): void {
    this.status.showSnackbar = status;
  }

  @Mutation
  public setShowSnackBarMessageWarning(status: boolean): void {
    this.status.showSnackbarWarning = status;
  }

  /**
   * Envia un mensaje al espacion de trabajo y canal especificado.
   * @param userID ID del usuario a invitar
   * @param invitation Invitacion a enviar al usuario
   */
  @Action
  async sendInvitation(invitation: Invitation): Promise<void> {
    return await InvitationsService.sendInivitation(invitation)
      .then(() => {
        this.context.commit("invitationSentSuccess");
        this.context.commit("setSnackBarMessage", "Invitacion enviada correctamente");
        this.context.commit("setShowSnackBarMessage", true);
      })
      .catch(() => {
        this.context.commit("invitationSentFail");
        this.context.commit("setSnackBarMessageError", "Fallo al enviar invitacion");
        this.context.commit("setShowSnackBarMessageError", true);
      });
  }

  /**
   * Recupera los usuarios de la base de datos para enviar invitación
   * @param userIDs IDs de los usuarios dentro del workspace
   */
  @Action
  async fetchUserNames(userIDs: string[]): Promise<void> {
    this.context.commit("setLoadingUserNamesStatus", true);
    const filterUsers = (await UserService.getUsers()).filter(user => !userIDs.includes(user.uid!));
    this.context.commit("setUserNamesList", filterUsers);
    this.context.commit("setLoadingUserNamesStatus", false);
  }

  /**
   * Acepta una invitacion al espacio de trabajo
   */
  @Action
  async acceptInvitation(invitation: Invitation): Promise<void> {
    invitationsService
      .acceptInvitation(invitation)
      .then(() => {
        this.context.commit("invitationAcceptedSuccess");
        this.context.commit(
          "setSnackBarMessage",
          "Se acepto correctamente la invitación a " + invitation.nombreEspacioTrabajo
        );
        this.context.commit("setShowSnackBarMessage", true);
      })
      .catch(() => {
        this.context.commit("invitationAcceptedFail");
        this.context.commit("setSnackBarMessageError", "Error al aceptar la invitación");
        this.context.commit("setShowSnackBarMessageError", true);
      });
  }

  /**
   * Rechaza una invitacion al espacio de trabajo
   */
  @Action
  async declineInvitation(invitation: Invitation): Promise<void> {
    invitationsService
      .deleteInvitation(invitation)
      .then(() => {
        this.context.commit("invitationDeclinedSuccess");
        this.context.commit("setSnackBarMessage", "Se rechazo correctamente la invitación");
        this.context.commit("setShowSnackBarMessage", true);
      })
      .catch(() => {
        this.context.commit("invitationDeclinedFail");
        this.context.commit("setSnackBarMessageError", "Error al rechazar la invitación");
        this.context.commit("setShowSnackBarMessageError", true);
      });
  }

  /**
   * Coloca un mensaje en el snackbar
   * @param message mensaje a mostrar en el snackbar
   */
  @Action
  setMessageOnSnackbar(message: string): void {
    this.context.commit("setSnackBarMessage", message);
  }

  /**
   * Hace visible el snackbar
   */
  @Action
  setVisibleSnackBar(): void {
    this.context.commit("setShowSnackBarMessage", true);
  }

  /**
   * Hace visible el snackbar de error
   */
  @Action
  setVisibleSnackBarError(): void {
    this.context.commit("setShowSnackBarMessageError", true);
  }

  /**
   * Hace visible el snackbar de warning
   */
  @Action
  setVisibleSnackBarWarning(): void {
    this.context.commit("setShowSnackBarMessageWarning", true);
  }

  /**
   * Hace no visible el snackbar
   */
  @Action
  setNotVisibleSnackBar(): void {
    this.context.commit("setShowSnackBarMessage", false);
  }

  /**
   * Hace no visible el snackbar de error
   */
  @Action
  setNotVisibleSnackBarError(): void {
    this.context.commit("setShowSnackBarMessageError", false);
  }

  /**
   * Hace no visible el snackbar de warning
   */
  @Action
  setNotVisibleSnackBarWarning(): void {
    this.context.commit("setShowSnackBarMessageWarning", false);
  }

  get isLoadingInvitationsInvitationSent(): boolean {
    return this.status.invitationSent;
  }

  get isLoadingUserNames(): boolean {
    return this.status.loadingUserNamesList;
  }

  get showSnackbar(): boolean {
    return this.status.showSnackbar;
  }
}

export default InivtationsModule;
