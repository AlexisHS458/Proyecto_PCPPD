import { VoiceState } from "@/utils/voiceState";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({ namespaced: true })
class VoiceChannelModule extends VuexModule {
  public isConnectedStatus: VoiceState = VoiceState.CONNECTING;
  public isMute = false;

  @Mutation
  public toggleMute(): void {
    console.log("Ti togea");

    this.isMute = !this.isMute;
  }

  @Mutation
  public setIsConnected(status: VoiceState): void {
    this.isConnectedStatus = status;
  }

  @Action
  setIsConnectedStatus(status: VoiceState): void {
    this.context.commit("setIsConnected", status);
  }

  @Action
  toggleIsMuteStatus(): void {
    this.context.commit("toggleMute");
  }

  get isConnected(): VoiceState {
    return this.isConnectedStatus;
  }

  get isMuted(): boolean {
    return this.isMute;
  }
}

export default VoiceChannelModule;
