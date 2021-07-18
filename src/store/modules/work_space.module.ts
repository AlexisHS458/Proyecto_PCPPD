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
  public workSpacesList?: Array<Workspace> = undefined;
  

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
  public setWorkSpacesList(workspaces: Array<Workspace>){
    this.workSpacesList = workspaces;
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
      .then((_) => {
        this.context.commit("createWorkSpaceSuccess")
      })
      .catch((_) => {
        this.context.commit("createWorkSpaceFailure")
      })

  }

}

export default WorkSpaceModule;