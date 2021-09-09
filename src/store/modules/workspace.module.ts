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

  /**
   * Status de la consulta del espacio de trabajo
   */
  public status = {
    loadingWorkspace: true,
    channelCreated: false
  };

  @Mutation
  public setWorkspace(workspace: Workspace): void {
    this.workspace = workspace;
  }

  @Mutation
  public setLoadingStatus(status: boolean): void {
    this.status.loadingWorkspace = status;
  }

  @Mutation 
  public setChannelCreatedStatus(status: boolean): void{
    this.status.channelCreated = status;
  }

  // @Mutation
  // public addTextChannel(textChannel: TextChannel): void{
  //   this.workspace.canales_texto = [
  //     ...this.workspace.canales_texto,
  //     textChannel
  //   ]
  // }

  /**
   * Consulta la información de un espacio de trabajo.
   * @param uid ID único del espacio de trabajo a consultar
   */
  @Action
  async fetchMyWorkspace(uid: string): Promise<void> {
    this.context.commit("setLoadingStatus", true);
    const workspace = await WorkSpaceService.getWorkspaceInfo(uid);
    ChannelsService.getTextChannels(uid, textChannels => {
      workspace.canales_texto = textChannels;
      this.context.commit("setWorkspace", workspace);
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

  get isLoadingWorkspace(): boolean {
    return this.status.loadingWorkspace;
  }
  get isChannelCreated(): boolean {
    return this.status.channelCreated;
  }

}

export default WorkspaceModule;
