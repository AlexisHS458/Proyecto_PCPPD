import { VoiceState } from "@/utils/voiceState";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";


@Module({ namespaced: true})
class VoiceChannelModule extends VuexModule {
    public isConnectedStatus: VoiceState = VoiceState.CONNECTING

    @Mutation
    public setIsConnected(status: VoiceState): void {
        this.isConnectedStatus = status;
    }

    @Action
    setIsConnectedStatus(status: VoiceState): void{
        this.context.commit("setIsConnected",status);
    }

    get isConnected(): VoiceState{
        return this.isConnectedStatus
    }
}

export default VoiceChannelModule;