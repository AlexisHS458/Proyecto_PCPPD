import { Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({namespaced: true})
class VoiceChannelModule extends VuexModule{
    public localStream: MediaStream | undefined;
    public remoteStream: MediaStream | undefined;


    @Mutation 
    public setLocalStream(stream: MediaStream): void {
        this.localStream = stream;
    }

    @Mutation 
    public setRemoteStream(stream: MediaStream): void {
        this.remoteStream = stream;
    }

}

export default VoiceChannelModule;