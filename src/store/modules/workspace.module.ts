import { Workspace } from "@/models/workspace";
import WorkSpaceService from "@/services/work_space.service";
import { CodeChannel } from "@/models/codeChannel";
import { TextChannel } from "@/models/textChannel";
import { VoiceChannel } from "@/models/voiceChannel";
import ChannelsService from "@/services/channels.service";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

/**
 * Modulo de acceso a información de un solo espacio de trabajo
 */
@Module({ namespaced: true })
class WorkspaceModule extends VuexModule {
  /**
   * Espacio de trabajo
   */
  public workspace!: Workspace;
  public textChannels: TextChannel[] = []

  /**
   * Status de la consulta del espacio de trabajo
   */
  public status = {
    loadingWorkspace: true,
    channelCreated: false,
    channelEdited: false,
    channelDeleted: false,
  };

  @Mutation
  public setWorkspace(workspace: Workspace): void {
    this.workspace = workspace;
  }

  @Mutation
  public setTextChannels(textChannels: Array<TextChannel>): void{
    this.textChannels = textChannels;
  }

  @Mutation
  public setLoadingStatus(status: boolean): void {
    this.status.loadingWorkspace = status;
  }

  @Mutation 
  public setChannelCreatedStatus(status: boolean): void{
    this.status.channelCreated = status;
  }

  @Mutation 
  public setChannelEditedStatus(status: boolean): void{
    this.status.channelCreated = status;
  }

  @Mutation 
  public setChannelDeletedStatus(status: boolean): void{
    this.status.channelCreated = status;
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
  async fetchTextChannels(uid: string): Promise<void>{
    this.context.commit("setLoadingStatus", true);
    ChannelsService.getTextChannels(uid, textChannels => {
      this.context.commit("setTextChannels", textChannels);
      this.context.commit("setLoadingStatus", false);
    });
  }

  /**
   * Crea un canal de texto en el espacio de trabajo
   * @param textChannel Canal de texto a agregar al espacio de trabajo
   */
  @Action
  async createTextChannel(textChannel: TextChannel): Promise<void>{
    this.context.commit("setChannelCreatedStatus", false);
    ChannelsService.createTextChannel(
      this.workspace.uid, textChannel
    ).then( _ => {
      this.context.commit("setChannelCreatedStatus", true);
    });
  }

  /**
   * Editar un canal de texto
   * @param textChannel Información del nuevo canal de texto
   */
  async editTextChannel(textChannel: TextChannel): Promise<void>{
    this.context.commit("setChannelEditedStatus", false);
    ChannelsService.editTextChannel(this.workspace.uid,textChannel)
    .then( _ => {
      this.context.commit("setChannelEditedStatus", true);
    });
  }

  /**
   * Elimina un canal de texto del espacio de trabajo
   * @param textChannelID ID del canal de texto a eliminar
   */
  async deleteTextChannel(textChannelID: string): Promise<void>{
    this.context.commit("etChannelDeletedStatus",false);
    ChannelsService.deleteTextChannel(this.workspace.uid,textChannelID)
    .then( _ => {
      this.context.commit("etChannelDeletedStatus",true);
    });

  }

  get isLoadingWorkspace(): boolean {
    return this.status.loadingWorkspace;
  }
  get isChannelCreated(): boolean {
    return this.status.channelCreated;
  }
  get isChannelEdited(): boolean {
    return this.status.channelEdited
  }
  get isChannelDeleted(): boolean {
    return this.status.channelDeleted
  }

}

export default WorkspaceModule;
