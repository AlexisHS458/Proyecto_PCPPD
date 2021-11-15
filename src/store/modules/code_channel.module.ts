import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";

@Module({ namespaced: true })
class CodeChannelModule extends VuexModule {
  public codeChannelName = "";
  public driverUID = "";
  public status = {
    showTreeView: false,
    showNavigationDrawerUsers: true,
    showNavigationDrawerChannels: true
  };

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

  @Action
  toggleShowTreeView(): void {
    this.context.commit("setShowTreeViewStatus", !this.status.showTreeView);
  }

  @Mutation
  public setShowNavigationDrawer(status: boolean): void {
    this.status.showNavigationDrawerUsers = status;
  }

  @Action
  toggleShowNavigationDrawer(): void {
    this.context.commit("setShowNavigationDrawer", !this.status.showNavigationDrawerUsers);
  }

  @Mutation
  public setShowNavigationDrawerChannels(status: boolean): void {
    this.status.showNavigationDrawerChannels = status;
  }

  @Action
  toggleShowNavigationDrawerChannels(): void {
    this.context.commit(
      "setShowNavigationDrawerChannels",
      !this.status.showNavigationDrawerChannels
    );
  }

  @Action
  setCodeChannelNameStatus(name: string): void{
    this.context.commit("setCodeChannelName",name);
  }

  @Action
  setDriverUIDStatus(uid: string): void {
    this.context.commit("setDriverUID", uid);
  }

  get getDriverID(): string{
    return this.driverUID;
  }


}

export default CodeChannelModule;
