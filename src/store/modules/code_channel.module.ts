import { Action, Mutation, VuexModule } from "vuex-module-decorators";




class CodeChannelModule extends VuexModule{
    public status = {
        showTreeView: false
    }

    @Mutation
    public setShowTreeViewStatus(status: boolean): void {
        this.status.showTreeView = status;
    }

    @Action
    toggleShowTreeView(): void{
        this.context.commit("setShowTreeViewStatus",!this.status.showTreeView);
    }
}

export default CodeChannelModule;