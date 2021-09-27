import { Workspace } from "@/models/workspace";
import WorkSpaceService from "@/services/work_space.service";
import { TextChannel } from "@/models/textChannel";
import ChannelsService from "@/services/channels.service";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { User } from "@/models/user";
import work_spaceService from "@/services/work_space.service";

/**
 * Modulo de acceso a información de un solo espacio de trabajo
 */
@Module({ namespaced: true })
class WorkspaceModule extends VuexModule {
  /**
   * Datos del espacio de trabajo
   */
  public workspace!: Workspace;

  /**
   * Usuarios pertenecientes al espacio de trabajo
   */
  public users: User[] = [];

  /**
   * Canales de texto del espacio de trabajo
   */
  public textChannels: TextChannel[] = [];

  /**
   * Mensaje a mostrar en snackbar
   */
  public snackbarMessage = "";

  /**
   * Mensaje a mostrar error en snackbar
   */
  public snackbarMessageError = "";

  /**
   * Status de la consulta del espacio de trabajo
   */
  public status = {
    loadingWorkspace: true,
    loadingUsers: true,
    channelCreated: false,
    channelEdited: false,
    channelDeleted: false,
    userRemoved: false,
    showSnackbar: false,
    showSnackbarError: false
  };

  @Mutation
  public setWorkspace(workspace: Workspace): void {
    this.workspace = workspace;
  }

  @Mutation
  public setTextChannels(textChannels: Array<TextChannel>): void {
    this.textChannels = textChannels;
  }

  @Mutation
  public setLoadingStatus(status: boolean): void {
    this.status.loadingWorkspace = status;
  }

  @Mutation
  public setChannelCreatedStatus(status: boolean): void {
    this.status.channelCreated = status;
  }

  @Mutation
  public setChannelEditedStatus(status: boolean): void {
    this.status.channelCreated = status;
  }

  @Mutation
  public setChannelDeletedStatus(status: boolean): void {
    this.status.channelCreated = status;
  }

  @Mutation
  public setLoadingUsersStatus(status: boolean): void {
    this.status.loadingUsers = status;
  }

  @Mutation
  public setUserRemovedStatus(status: boolean): void {
    this.status.userRemoved = status;
  }

  @Mutation
  public setUsers(users: Array<User>): void {
    this.users = users;
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
   * Consulta la información de un espacio de trabajo.
   * @param uid ID único del espacio de trabajo a consultar
   */
  @Action
  async fetchMyWorkspace(uid: string): Promise<void> {
    this.context.commit("setLoadingStatus", true);
    const workspace = await WorkSpaceService.getWorkspaceInfo(uid);
    this.context.commit("setWorkspace", workspace);
    this.context.commit("setLoadingStatus", false);
  }

  /**
   * Obtiene los canales de texto del canal de código
   * @param uid ID único del espacio de trabajo a consultar
   */
  @Action
  async fetchTextChannels(uid: string): Promise<void> {
    this.context.commit("setLoadingStatus", true);
    ChannelsService.getTextChannels(uid, textChannels => {
      this.context.commit("setTextChannels", textChannels);
      this.context.commit("setLoadingStatus", false);
    });
  }

  /**
   * Obtiene los usuarios dentro del espacio de trabajo.
   */
  @Action
  fetchUsersInWorkspace(): void {
    this.context.commit("setLoadingUsersStatus", true);
    WorkSpaceService.getUsersInWorkspace(this.workspace.usuarios, users => {
      this.context.commit("setUsers", users);
      this.context.commit("setLoadingUsersStatus", false);
    });
  }

  /**
   * Crea un canal de texto en el espacio de trabajo
   * @param textChannel Canal de texto a agregar al espacio de trabajo
   */
  @Action
  async createTextChannel(textChannel: TextChannel): Promise<void> {
    this.context.commit("setChannelCreatedStatus", false);
    ChannelsService.createTextChannel(this.workspace.uid, textChannel)
      .then(() => {
        this.context.commit("setChannelCreatedStatus", true);
        this.context.commit("setSnackBarMessage", "Exito al crear canal");
        this.context.commit("setShowSnackBarMessage", true);
      })
      .catch(() => {
        this.context.commit("setChannelCreatedStatus", false);
        this.context.commit("setSnackBarMessageError", "Error al crear canal");
        this.context.commit("setShowSnackBarMessageError", true);
      });
  }

  /**
   * Editar un canal de texto
   * @param textChannel Información del nuevo canal de texto
   */
  @Action
  async editTextChannel(textChannel: TextChannel): Promise<void> {
    this.context.commit("setChannelEditedStatus", false);
    ChannelsService.editTextChannel(this.workspace.uid, textChannel)
      .then(() => {
        this.context.commit("setChannelEditedStatus", true);
        this.context.commit("setSnackBarMessage", "Exito al editar canal");
        this.context.commit("setShowSnackBarMessage", true);
      })
      .catch(() => {
        this.context.commit("setChannelEditedStatus", false);
        this.context.commit("setSnackBarMessageError", "Error al editar canal");
        this.context.commit("setShowSnackBarMessageError", true);
      });
  }

  /**
   * Elimina un canal de texto del espacio de trabajo
   * @param textChannelID ID del canal de texto a eliminar
   */
  @Action
  async deleteTextChannel(textChannelID: string): Promise<void> {
    this.context.commit("setChannelDeletedStatus", false);
    ChannelsService.deleteTextChannel(this.workspace.uid, textChannelID)
      .then(() => {
        this.context.commit("setChannelDeletedStatus", true);
        this.context.commit("setSnackBarMessage", "Exito al eliminar canal");
        this.context.commit("setShowSnackBarMessage", true);
      })
      .catch(() => {
        this.context.commit("setChannelDeletedStatus", false);
        this.context.commit("setSnackBarMessageError", "Error al eliminar canal");
        this.context.commit("setShowSnackBarMessageError", true);
      });
  }

  /**
   * Elimina un usuario del espacio de trabajo.
   * @param idUser usuario a expulsar
   */
  @Action
  async kickUser(idUser: string): Promise<void> {
    this.context.commit("setUserRemovedStatus", false);
    WorkSpaceService.removeUser(idUser, this.workspace.uid).then(() => {
      this.context.commit("setUserRemovedStatus", true);
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

  get isLoadingWorkspace(): boolean {
    return this.status.loadingWorkspace;
  }
  get isChannelCreated(): boolean {
    return this.status.channelCreated;
  }
  get isChannelEdited(): boolean {
    return this.status.channelEdited;
  }
  get isChannelDeleted(): boolean {
    return this.status.channelDeleted;
  }
  get isLoadingUsersOnline(): boolean {
    return this.status.loadingUsers;
  }
  get isUserRemoved(): boolean {
    return this.status.userRemoved;
  }

  get showSnackbar(): boolean {
    return this.status.showSnackbar;
  }
}

export default WorkspaceModule;
