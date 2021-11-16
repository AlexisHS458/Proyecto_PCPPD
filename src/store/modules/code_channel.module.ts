import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";
import CodeChannelService from "@/services/code_channel.service";

@Module({ namespaced: true })
class CodeChannelModule extends VuexModule {
  public codeChannelName = "";
  public driverUID: string | undefined = undefined;
  public status = {
    isLoading: true,
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

  @Mutation	setLoading(status: boolean): void {
    this.status.isLoading = status;
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
    this.context.commit("setLoading", true);
    CodeChannelService.currentDriver(uid, driverID => {
      console.log('se detono');
      
      this.context.commit("setDriverUID", driverID);
      this.context.commit("setLoading", false);
    });
  }

  get getDriverID(): string{
    return this.driverUID!;
  }
  get isLoading() : boolean{
    return this.status.isLoading;
  }


}

export default CodeChannelModule;
