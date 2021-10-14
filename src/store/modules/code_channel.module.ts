import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
@Module({ namespaced: true })
class CodeChannelModule extends VuexModule {
  public status = {
    showTreeView: true
  };

  @Mutation
  public setShowTreeViewStatus(status: boolean): void {
    this.status.showTreeView = status;
  }

  @Action
  toggleShowTreeView(): void {
    console.log("Entro");
    this.context.commit("setShowTreeViewStatus", !this.status.showTreeView);
  }
}

export default CodeChannelModule;
