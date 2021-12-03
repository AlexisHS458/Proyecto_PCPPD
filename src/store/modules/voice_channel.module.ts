import { VoiceState } from "@/utils/voiceState";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({ namespaced: true })
class VoiceChannelModule extends VuexModule {
  public isConnectedStatus: VoiceState = VoiceState.CONNECTING;
  public isMute = false;

  @Mutation
  public toggleMute(): void {
    this.isMute = !this.isMute;
  }

  @Mutation
  public setMuteState(mute: boolean): void {
    this.isMute = mute;
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

  @Action
  setMute(mute : boolean): void {
    this.context.commit("setMuteState", mute);
  }

  get isConnected(): VoiceState {
    return this.isConnectedStatus;
  }

  get isMuted(): boolean {
    return this.isMute;
  }
}

export default VoiceChannelModule;
