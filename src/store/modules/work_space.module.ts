import { Workspace } from '@/models/workspace';
import WorkSpaceService from '@/services/work_space.service';
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';


/**
   * Modulo de acceso a información de espacios de trabajo de un usuario
   * 
 */
@Module({ namespaced: true })
class WorkSpaceModule extends VuexModule {
  /**
   * Lista de los espacios de trabajo del usuario.
   */
  public workSpacesList: Workspace[]= [];
  

  /**
   * Status de los espacios de trabajo
   * @param loadingList T: Si la lista esta cargando, F: si ya está cargada
   * @param createdWorkSpace T: Si se creó un nuevo WS, F: Si no se creó
   */
  public status = {
    loadingList: true, 
    createdWorkSpace: false
  };

  @Mutation
  public setWorkspaces(workspaces: Workspace[]): void {
    this.workSpacesList = workspaces;
  }

  @Mutation
  public setLoadingStatus(status: boolean): void {
    this.status.loadingList = status;
  }


  @Mutation
  public setWorkSpacesList(workspaces: Array<Workspace>){
    this.workSpacesList = workspaces;
  }

  @Mutation
  public addWorkSpaceToList(workspace: Workspace){
    const lastState = this.workSpacesList;
    lastState.push(workspace)
    this.workSpacesList = lastState;
  }

  @Mutation
  public createWorkSpaceSuccess(): void {
    this.status.createdWorkSpace = true;
  }

  @Mutation
  public createWorkSpaceFailure(): void {
    this.status.createdWorkSpace = false;
  }


  /**
   * Agrega un espacio de trabajo a la db
   * @param workspace Espacio de trabajo a agregar
   */
  @Action
  async addWorkSpace(workspace: Workspace){
    return await WorkSpaceService.createWorkSpace(workspace)
      .then(() => {
        this.context.commit("addWorkSpaceToList", workspace);
        this.context.commit("createWorkSpaceSuccess");
      })
      .catch(() => {
        this.context.commit("createWorkSpaceFailure");
      })
  }

  /**
   * Recupera los espacios de trabajo de un usuario
   * @param uid id del usuario
   */
  @Action
  async fetchWorkspaces(uid: string): Promise<void>{
    this.context.commit('setLoadingStatus', true);
    const workspaces = await WorkSpaceService.getWorkspaces(uid);
    this.context.commit('setWorkSpacesList',workspaces);
    this.context.commit('setLoadingStatus', false);
  }

  get isLoadingList(): boolean{
    return this.status.loadingList;
  }

  get isCreatedWorkSpace(): boolean{
    return this.status.createdWorkSpace;
  }
}

export default WorkSpaceModule;