import { servers } from "@/utils/rtc";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module({namespaced: true})
class VoiceChannelModule extends VuexModule{
    /**
     * Conexión WebRTC
     */
    public peerConnection = new RTCPeerConnection(servers);

    /**
     * Stream de audio local
     */
    public localStream: MediaStream | undefined = undefined;

    /**
     * Stream de audio remoto
     */
    public remoteStream: MediaStream | undefined = undefined;


    @Mutation 
    public setLocalStream(stream: MediaStream): void {
        this.localStream = stream;
    }

    @Mutation 
    public setRemoteStream(stream: MediaStream): void {
        this.remoteStream = stream;
    }

    @Mutation
    public addTrack(track: MediaStreamTrack){
        this.peerConnection?.addTrack(track, this.localStream!);
    }

    @Action
    public setupLocalStream(): void{
        this.localStream?.getTracks().forEach((track) => {
            this.context.commit("addTrack",track);
        })
    }


}

export default VoiceChannelModule;