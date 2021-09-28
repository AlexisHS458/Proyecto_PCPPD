import { VoiceChannelsIDs } from "@/models/voiceChannelsIds";
import RTCService from "@/services/rtc.service";
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

    /**
     * Mensaje a mostrar error en snackbar
     */
    public snackbarMessageError = "";

    /**
     * Status del canal de voz
     */
    public status = {
        /**
         * Status de mostrar el snackbar de error
         */
        showSnackbarError: false
    }


    @Mutation 
    public setLocalStream(stream: MediaStream): void {
        this.localStream = stream;
    }

    @Mutation 
    public setRemoteStream(stream: MediaStream): void {
        this.remoteStream = stream;
    }

    @Mutation
    public addTrack(track: MediaStreamTrack): void {
        this.peerConnection?.addTrack(track, this.localStream!);
    }

    @Mutation
    public remoteAddTrack(track: MediaStreamTrack): void {
        this.remoteStream?.addTrack(track);
    }

    @Mutation
    public setRemoteDescription(answerDescription: RTCSessionDescription): void {
        this.peerConnection.setRemoteDescription(answerDescription);
    }

    @Mutation
    public setSnackBarMessageError(message: string): void {
      this.snackbarMessageError = message;
    }

    @Mutation
    public setShowSnackBarMessageError(status: boolean): void {
        this.status.showSnackbarError = status;
    }

    /**
     * Configura el stream del microfono al stream local
     * @param stream stream de sonido del usuario
     */
    @Action
    public setupLocalStream(stream: MediaStream): void {
        this.context.commit("setLocalStream",stream);
    }

    /**
     * Del stream local hace push de los track hacia la peer connection
     */
    @Action
    public pushTracks(): void{
        this.localStream?.getTracks().forEach((track) => {
            this.context.commit("addTrack",track);
        })
    }

    /**
     * Del stream remoto hace pull y lo agrega al stream de audio
     */
    @Action
    public pullTracks(): void {
        this.peerConnection.ontrack = (event) => {
            event.streams[0].getTracks().forEach((track) => {
                this.context.commit("remoteAddTrack",track);
            });
        }
    }


    /**
     * Inicia la llamda creando una oferta de llamada
     * @param voiceChannelIDs IDs para localizar el canal de voz especificado
     */
    @Action
    public startCall(voiceChannelIDs: VoiceChannelsIDs): void {
        RTCService.createAnOffer(
            voiceChannelIDs.uidWorkspace,
            voiceChannelIDs.uidVoiceChannel,
            this.peerConnection
        ).then(()=>{

        })
        .catch(()=>{
            this.context.commit("setSnackBarMessageError", "Error al crear canal");
            this.context.commit("setShowSnackBarMessageError", true);
        });
    }


    /**
     * Inicia la escucha a respuestas en la llamada de voz
     * @param voiceChannelIDs IDs para localizar el canal de voz especificado
     */
    @Action
    public listenForRemoteAnswer(voiceChannelIDs: VoiceChannelsIDs): void {
        RTCService.listenForRemoteAnswer(
            voiceChannelIDs.uidWorkspace,
            voiceChannelIDs.uidVoiceChannel,
            this.peerConnection,
            answer => {
                this.context.commit("setRemoteDescription", answer);
            }
        );
    }



}

export default VoiceChannelModule;