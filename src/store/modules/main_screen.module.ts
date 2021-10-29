import { Invitation } from "@/models/invitation";
import { LeaveWorkspace } from "@/models/leaveWorkspace";
import { Workspace } from "@/models/workspace";
import InivtationsService from "@/services/invitations.service";
import WorkSpaceService from "@/services/work_space.service";
import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";

/**
 * Modulo de acceso a información de espacios de trabajo de un usuario
 *
 */
@Module({ namespaced: true })
class MainScreenModule extends VuexModule {
  /**
   * Lista de los espacios de trabajo del usuario.
   */
  public workSpacesList: Workspace[] = [];

  /**
   * Lista de invitaciones
   */
  public invitations: Invitation[] = [];

  /**
   * Mensaje a mostrar en snackbar
   */
  public snackbarMessage = "";

  /**
   * Mensaje a mostrar error en snackbar
   */
  public snackbarMessageError = "";

  /**
   * Status de los espacios de trabajo
   * @param loadingList T: Si la lista esta cargando, F: si ya está cargada
   * @param createdWorkSpace T: Si se creó un nuevo WS, F: Si no se creó
   * @param deletedWorkSpace T: Si se elimino el WS, F: Si no se elimino
   */
  public status = {
    showSnackbar: false,
    showSnackbarError: false,
    loadingList: true,
    loadingInvitationsList: true,
    createdWorkSpace: false,
    deletedWorkSpace: false,
    leaveWorkSpace: false
  };

  @Mutation
  public setLoadingStatus(status: boolean): void {
    this.status.loadingList = status;
  }

  @Mutation
  public setWorkSpacesList(workspaces: Array<Workspace>): void {
    this.workSpacesList = workspaces;
  }

  @Mutation
  public setInvitationsList(invitations: Array<Invitation>): void {
    this.invitations = invitations;
  }

  @Mutation
  public setLoadingInvitationStatus(status: boolean): void {
    this.status.loadingInvitationsList = status;
  }

  @Mutation
  public setLeaveWorkSpaceStatus(status: boolean): void {
    this.status.leaveWorkSpace = status;
  }

  @Mutation
  public createWorkSpaceSuccess(): void {
    this.status.createdWorkSpace = true;
  }

  @Mutation
  public createWorkSpaceFailure(): void {
    this.status.createdWorkSpace = false;
  }

  @Mutation
  public deleteWorkSpaceSuccess(): void {
    this.status.deletedWorkSpace = true;
  }

  @Mutation
  public deleteWorkSpaceFailure(): void {
    this.status.deletedWorkSpace = false;
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

  /**
   * Agrega un espacio de trabajo a la db
   * @param workspace Espacio de trabajo a agregar
   */
  @Action
  async addWorkSpace(workspace: Workspace): Promise<void> {
    return await WorkSpaceService.createWorkSpace(workspace)
      .then(() => {
        this.context.commit("createWorkSpaceSuccess");
        this.context.commit("setSnackBarMessage", "El espacio de trabajo ha sido creado exitosamente");
        this.context.commit("setShowSnackBarMessage", true);
      })
      .catch(() => {
        this.context.commit("createWorkSpaceFailure");
        /**
         * Nuevas mutaciones
         */
        this.context.commit("setSnackBarMessageError", "Error al crear el espacio de trabajo");
        this.context.commit("setShowSnackBarMessageError", true);
      });
  }

  /**
   * Elimina un espacio de trabajo
   * @param id ID de documento del Workspace (Workspace.uid)
   * @returns
   */
  @Action
  async deletedWorkSpaces(id: string): Promise<void> {
    return await WorkSpaceService.deleteWorkSpace(id)
      .then(() => {
        this.context.commit("deleteWorkSpaceSuccess");
        this.context.commit("setSnackBarMessage", "El espacio de trabajo ha sido eliminado");
        this.context.commit("setShowSnackBarMessage", true);
      })
      .catch(() => {
        this.context.commit("deleteWorkSpaceFailure");
        this.context.commit("setSnackBarMessageError", "Error al eliminar el espacio de trabajo");
        this.context.commit("setShowSnackBarMessageError", true);
      });
  }

  /**
   * Recupera los espacios de trabajo de un usuario
   * @param uid id del usuario
   */
  @Action
  fetchWorkspaces(uid: string): void {
    this.context.commit("setLoadingStatus", true);
    WorkSpaceService.getWorkspaces(uid, workspaces => {
      this.context.commit("setWorkSpacesList", workspaces);
      this.context.commit("setLoadingStatus", false);
    });
  }

  /**
   * Recupera las invitaciones del usuario
   * @param uid id del usuario
   */
  @Action
  fetchInvitations(uid: string): void {
    this.context.commit("setLoadingInvitationStatus", true);
    InivtationsService.getInvitations(uid, invitations => {
      this.context.commit("setInvitationsList", invitations);
      this.context.commit("setLoadingInvitationStatus", false);
    });
  }

  /**
   * @param idUser usuario a expulsar
   * @param IDWorkSpace espacio de trabajo
   */
  @Action
  async leaveWorkSpace(leaveWorkSpace: LeaveWorkspace): Promise<void> {
    this.context.commit("setLeaveWorkSpaceStatus", false);
    WorkSpaceService.removeUser(leaveWorkSpace.uidUser, leaveWorkSpace.uidWorkspace).then(() => {
      this.context.commit("setLeaveWorkSpaceStatus", true);
      this.context.commit("setSnackBarMessage",
      "Has abandonado el espacio de trabajo" + " " + leaveWorkSpace.nombreWorkspace);
      this.context.commit("setShowSnackBarMessage", true);
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

  get isLoadingList(): boolean {
    return this.status.loadingList;
  }

  get isCreatedWorkSpace(): boolean {
    return this.status.createdWorkSpace;
  }

  get workspacesList(): Workspace[] {
    return this.workSpacesList;
  }

  get isLoadingInvitations(): boolean {
    return this.status.loadingInvitationsList;
  }

  get isLeftWorkSpace(): boolean {
    return this.status.leaveWorkSpace;
  }

  get showSnackbar(): boolean {
    return this.status.showSnackbar;
  }
}

export default MainScreenModule;
