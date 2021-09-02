import { Workspace } from "@/models/workspace";
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
   * Status de los espacios de trabajo
   * @param loadingList T: Si la lista esta cargando, F: si ya está cargada
   * @param createdWorkSpace T: Si se creó un nuevo WS, F: Si no se creó
   * @param deletedWorkSpace T: Si se elimino el WS, F: Si no se elimino
   */
  public status = {
    loadingList: true,
    createdWorkSpace: false,
    deletedWorkSpace: false
  };

  @Mutation
  public setLoadingStatus(status: boolean): void {
    this.status.loadingList = status;
  }

  @Mutation
  public setWorkSpacesList(workspaces: Array<Workspace>) {
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

  @Mutation
  public deleteWorkSpaceSuccess(): void {
    this.status.deletedWorkSpace = true;
  }

  @Mutation
  public deleteWorkSpaceFailure(): void {
    this.status.deletedWorkSpace = false;
  }

  /**
   * Agrega un espacio de trabajo a la db
   * @param workspace Espacio de trabajo a agregar
   */
  @Action
  async addWorkSpace(workspace: Workspace) {
    return await WorkSpaceService.createWorkSpace(workspace)
      .then(() => {
        this.context.commit("createWorkSpaceSuccess");
      })
      .catch(() => {
        this.context.commit("createWorkSpaceFailure");
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
      })
      .catch(() => {
        this.context.commit("deleteWorkSpaceFailure");
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

  get isLoadingList(): boolean {
    return this.status.loadingList;
  }

  get isCreatedWorkSpace(): boolean {
    return this.status.createdWorkSpace;
  }

  get workspacesList(): Workspace[]{
    return this.workSpacesList;
  }
}

export default MainScreenModule;