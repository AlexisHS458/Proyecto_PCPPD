import { Workspace } from "@/models/workspace";
import WorkSpaceService from "@/services/work_space.service";
import { TextChannel } from "@/models/textChannel";
import ChannelsService from "@/services/channels.service";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import { User } from "@/models/user";
import { VoiceChannel } from "@/models/voiceChannel";
import { CodeChannel } from "@/models/codeChannel";
import UserService from "@/services/user.service";
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
   * Usuario actual autenticado
   */
  public user?: User = undefined;

  /**
   * Usuarios pertenecientes al espacio de trabajo
   */
  public users: User[] = [];

  /**
   * Canales de texto del espacio de trabajo
   */
  public textChannels: TextChannel[] = [];

  /**
   * Canales de voz en el espacio de trabajo
   */
  public voiceChannels: VoiceChannel[] = [];

  /**
   * Canales de voz en el espacio de trabajo
   */
  public codeChannels: CodeChannel[] = [];

  /**
   * Mensaje a mostrar en snackbar
   */
  public snackbarMessage = "";

  /**
   * Mensaje a mostrar error en snackbar
   */
  public snackbarMessageError = "";
  
  /**
   * Todos los usuarios dentro de la base de datos
   */
  public allUsers: User[] = [];






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
  public setVoiceChannels(voiceChannels: Array<VoiceChannel>): void {
    this.voiceChannels = voiceChannels;
  }

  @Mutation
  public setCodeChannels(codeChannels: Array<CodeChannel>): void {
    this.codeChannels = codeChannels;
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
    this.users = users.filter(user => {
      return user.uid !== this.user!.uid;
    });
  }

  @Mutation
  public setUser(user: User): void {
    this.user = user;
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
  public setAllUsers(allUsers: User[]): void {
      this.allUsers = allUsers;
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
   * Obtiene los canales de texto del espacio de trabajo
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
   * Obtiene los canales de voz del espacio de trabajo
   * @param uid ID único del espacio de trabajo a consultar
   */
  @Action
  async fetchVoiceChannels(uid: string): Promise<void> {
    this.context.commit("setLoadingStatus", true);
    ChannelsService.getVoiceChannels(uid, voiceChannels => {
      this.context.commit("setVoiceChannels", voiceChannels);
      this.context.commit("setLoadingStatus", false);
    });
  }

  /**
   * Obtiene los canales de codigo del espacio de trabajo
   * @param uid ID único del espacio de trabajo a consultar
   */
  @Action
  async fetchCodeChannels(uid: string): Promise<void> {
    this.context.commit("setLoadingStatus", true);
    ChannelsService.getCodeChannels(uid, codeChannels => {
      this.context.commit("setCodeChannels", codeChannels);
      this.context.commit("setLoadingStatus", false);
    });
  }

  /**
   * Obtiene los usuarios dentro del espacio de trabajo.
   */
  @Action
  async fetchUsersInWorkspace() {
    this.context.commit("setLoadingUsersStatus", true);
    await UserService.getUserAuthInfo((user)=> {
      this.context.commit("setUser", user);
      WorkSpaceService.getUsersInWorkspace(this.workspace.uid, users => {
        this.context.commit("setUsers", users);
        this.context.commit("setLoadingUsersStatus", false);
      });
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
   * Crea un canal de voz en el espacio de trabajo
   * @param voiceChannel Canal de voz a agregar al espacio de trabajo
   */
  @Action
  async createVoiceChannel(voiceChannel: VoiceChannel): Promise<void> {
    this.context.commit("setChannelCreatedStatus", false);
    ChannelsService.createVoiceChannel(this.workspace.uid, voiceChannel)
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
   * Editar un canal de voz
   * @param voiceChannel Información del nuevo canal de voz
   */
  @Action
  async editVoiceChannel(voiceChannel: VoiceChannel): Promise<void> {
    this.context.commit("setChannelEditedStatus", false);
    ChannelsService.editVoiceChannel(this.workspace.uid, voiceChannel)
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
   * Elimina un canal de voz del espacio de trabajo
   * @param voiceChannelID ID del canal de voz a eliminar
   */
  @Action
  async deleteVoiceChannel(voiceChannelID: string): Promise<void> {
    this.context.commit("setChannelDeletedStatus", false);
    ChannelsService.deleteVoiceChannel(this.workspace.uid, voiceChannelID)
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
   * Crea un canal de codigo en el espacio de trabajo
   * @param codeChannel Canal de voz a agregar al espacio de trabajo
   */
  @Action
  async createCodeChannel(codeChannel: CodeChannel): Promise<void> {
    this.context.commit("setChannelCreatedStatus", false);
   
    ChannelsService.createCodeChannel(this.workspace.uid, codeChannel)
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
   * Editar un canal de codigo
   * @param codeChannel Información del nuevo canal de codigo
   */
  @Action
  async editCodeChannel(codeChannel: CodeChannel): Promise<void> {
    this.context.commit("setChannelEditedStatus", false);
    ChannelsService.editCodeChannel(this.workspace.uid, codeChannel)
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
   * Elimina un canal de codigo del espacio de trabajo
   * @param codeChannelID ID del canal de codigo a eliminar
   */
  @Action
  async deleteCodeChannel(codeChannelID: string): Promise<void> {
    this.context.commit("setChannelDeletedStatus", false);
    ChannelsService.deleteCodeChannel(this.workspace.uid, codeChannelID)
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


  /**
  * Recupera los usuarios de la base de datos para enviar invitación
  * @param userIDs IDs de los usuarios dentro del workspace
  */
   @Action
   fetchAllUsers(): void {
     UserService.getUsers(users => {
       this.context.commit("setAllUsers", users);
     });
   }

  get getUserList(): User[] {
    return this.users
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
