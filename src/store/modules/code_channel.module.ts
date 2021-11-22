import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";
import CodeChannelService from "@/services/code_channel.service";
import { Maybe, TreeEntry } from "@/generated/graphql";
import { CodePath } from "@/models/codePath";

@Module({ namespaced: true })
class CodeChannelModule extends VuexModule {
  /**
   * Mensaje a mostrar en snackbar
   */
  public snackbarMessage = "";

  /**
   * Mensaje a mostrar error en snackbar
   */
  public snackbarMessageError = "";

  public codePath: CodePath[] = [];

  public codeData: Maybe<TreeEntry> = null;

  public codeChannelName = "";
  public driverUID = "";
  public status = {
    isLoading: true,
    showTreeView: false,
    showNavigationDrawerUsers: true,
    showNavigationDrawerChannels: true,
    showRequestDriver: false,
    showSnackbar: false,
    showSnackbarError: false
  };

  @Mutation
  public clearPath(): void {
    this.codePath = [];
  }

  @Mutation
  public addPath(path: CodePath): void {
    this.codePath.push(path);
  }
  @Mutation
  public goBackPath(): void {
    this.codePath.pop();
  }

  @Mutation
  public setShowTreeViewStatus(status: boolean): void {
    this.status.showTreeView = status;
  }

  @Mutation
  public setCodeChannelName(status: string): void {
    this.codeChannelName = status;
  }

  @Mutation
  public setDriverUID(status: string): void {
    this.driverUID = status;
  }

  @Mutation setLoading(status: boolean): void {
    this.status.isLoading = status;
  }

  @Mutation
  public setShowNavigationDrawer(status: boolean): void {
    this.status.showNavigationDrawerUsers = status;
  }

  @Mutation
  public setShowNavigationDrawerChannels(status: boolean): void {
    this.status.showNavigationDrawerChannels = status;
  }

  @Mutation
  public setShowRequestInfo(status: boolean): void {
    this.status.showRequestDriver = status;
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
  public setInitialCodeData(blob: TreeEntry): void {
    this.codeData = blob;
  }

  @Action
  public setCodeData(blob: TreeEntry): void {
    this.context.commit("setInitialCodeData", blob);
  }

  @Action
  toggleShowNavigationDrawerChannels(): void {
    this.context.commit(
      "setShowNavigationDrawerChannels",
      !this.status.showNavigationDrawerChannels
    );
  }

  @Action
  addPathState(path: CodePath): void {
    this.context.commit("addPath", path);
  }

  @Action
  clearPathState(): void {
    this.context.commit("clearPath");
  }
  @Action
  goBackAction(): void {
    this.context.commit("goBackPath");
  }

  @Action
  setCodeChannelNameStatus(name: string): void {
    this.context.commit("setCodeChannelName", name);
  }

  @Action
  setDriverUIDStatus(uid: string): void {
    this.context.commit("setLoading", true);
    CodeChannelService.currentDriver(uid, driverID => {
      this.context.commit("setDriverUID", driverID);
      this.context.commit("setLoading", false);
    });
  }

  @Action
  toggleShowTreeView(): void {
    this.context.commit("setShowTreeViewStatus", !this.status.showTreeView);
  }
  @Action
  toggleShowNavigationDrawer(): void {
    this.context.commit("setShowNavigationDrawer", !this.status.showNavigationDrawerUsers);
  }

  @Action
  setShowRequestDriverStatus(status: boolean): void {
    this.context.commit("setShowRequestInfo", status);
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

  get getDriverID(): string {
    return this.driverUID!;
  }
  get isLoading(): boolean {
    return this.status.isLoading;
  }
  get showSnackbar(): boolean {
    return this.status.showSnackbar;
  }

  get pathSize(): number {
    return this.codePath.length;
  }
}

export default CodeChannelModule;
