import { VoiceState } from "@/utils/voiceState";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({ namespaced: true })
class VoiceChannelModule extends VuexModule {
  public isConnectedStatus: VoiceState = VoiceState.CONNECTING;
  public isMute = false;
  public isDeafen = false;

  @Mutation
  public toggleMute(): void {
    this.isMute = !this.isMute;
    if (!this.isMute && this.isDeafen) this.isDeafen = false;
  }

  @Mutation
  public toggleDeafen(): void {
    this.isDeafen = !this.isDeafen;
    this.isMute = this.isDeafen;
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
  toggleIsDeafenStatus(): void {
    this.context.commit("toggleDeafen");
  }

  @Action
  setMute(mute: boolean): void {
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
