import { Workspace } from "@/models/workspace";
import ChannelService from "@/services/channel.service";
import WorkSpaceService from "@/services/work_space.service";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

/**
 * Modulo de acceso a información de un solo espacio de trabajo
 */
@Module({ namespaced: true })
class WorkspaceModule extends VuexModule {
  /**
   * Espacio de trabajo
   */
  public workspace?: Workspace = undefined;

  /**
   * Status de la consulta del espacio de trabajo
   */
  public status = {
    loadingWorkspace: true
  };

  @Mutation
  public setMyWorkspace(workspace: Workspace): void {
    this.workspace = workspace;
  }

  @Mutation
  public setLoadingStatus(status: boolean): void {
    this.status.loadingWorkspace = status;
  }

  /**
   * Consulta la información de un espacio de trabajo.
   * @param uid ID único del espacio de trabajo a consultar
   */
  @Action
  async fetchMyWorkspace(uid: string): Promise<void> {
    this.context.commit("setLoadingStatus", true);
    const workspace = await WorkSpaceService.getWorkspaceInfo(uid);
    ChannelService.getTextChannels(uid, textChannels => {
      workspace.canales_texto = textChannels;
      this.context.commit("setLoadingStatus", false);
      this.context.commit("setMyWorkspace", workspace);
    });
  }

  get isLoadingMyWorkspace(): boolean {
    return this.status.loadingWorkspace;
  }
}

export default WorkspaceModule;
