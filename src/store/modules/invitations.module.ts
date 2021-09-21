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
   * Estatos de consulta de la invitacion
   */
  public status = {
    loadingInvitations: true,
    loadingUserNamesList: true,
    invitationSent: false,
    invitationAccepted: false,
    invitationDeclined: false
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
      })
      .catch(() => {
        this.context.commit("invitationSentFail");
      });
  }

  /**
   * Recupera las invitaciones del usuario
   */
  @Action
  fetchUserNames(): void {
    this.context.commit("setLoadingUserNamesStatus", true);
    UserService.getUsers(users => {
      this.context.commit("setUserNamesList", users);
      this.context.commit("setLoadingUserNamesStatus", false);
    });
  }

  /**
  * Acepta una invitacion al espacio de trabajo
  */
  @Action
  async acceptInvitation(invitation: Invitation): Promise<void> {
    invitationsService.acceptInvitation(invitation).then(() => {
      this.context.commit("invitationAcceptedSuccess");
    })
    .catch(() => {
      this.context.commit("invitationAcceptedFail");
    });
  }

  /**
  * Rechaza una invitacion al espacio de trabajo
  */
  @Action
  async declineInvitation(invitation: Invitation): Promise<void> {
    invitationsService.declineInvitation(invitation).then(() => {
      this.context.commit("invitationDeclinedSuccess");
    })
    .catch(() => {
      this.context.commit("invitationDeclinedFail");
    });
  }

  get isLoadingInvitationsInvitationSent(): boolean {
    return this.status.invitationSent;
  }

  get isLoadingUserNames(): boolean {
    return this.status.loadingUserNamesList;
  }
}

export default InivtationsModule;
