import { SignalPayload } from "@/models/signalpayload";
import { SocketUser } from "@/models/socketUser";
import { voiceChannelSocket} from "@/socketio";
import { EventName } from "@/utils/event_name";
import { ResponseEventName } from "@/utils/response_event_name";

class VoiceChannelService {

  /**
   * Se conecta a un canal de voz
   * @param uid ID del usuario a conectar
   * @param voiceChannelID ID del canal de voz al cual para conectar al usuario
   */
  joinToVoiceChannel(uid: string, voiceChannelID: string): void {
    voiceChannelSocket(uid).emit(EventName.JOIN_VOICE_CHANNEL, voiceChannelID);
  }


  leaveVoiceChannel(uid: string){
    voiceChannelSocket(uid).emit(EventName.LEAVE_VOICE_CHANNEL);
  }

  allUsers(uid: string, onEvent: (users: SocketUser[]) => void): void {
    voiceChannelSocket(uid).on(ResponseEventName.ALL_USERS, payload => {
        console.log(Object.values(payload));
        onEvent(Object.values(payload));
      });
  }

  emitUsers(uid: string, voiceChannelID: string){
    voiceChannelSocket(uid).emit(EventName.EMIT_USERS,voiceChannelID)
  }
  
  userStatus(
    uid: string,
    onEvent: (channelID: string | undefined) => void
    ){
      voiceChannelSocket(uid).on(ResponseEventName.USER_STATUS, (payload) => {
        onEvent(payload.channelID)
      });
  }

  sendingSignal(
    uid: string,
    payload: SignalPayload
  ): void{
    voiceChannelSocket(uid).emit(EventName.SENDING_SIGNAL, payload);
  }

  returningSignal(
    uid: string,
    payload: SignalPayload
  ): void {
    voiceChannelSocket(uid).emit(EventName.RETURNING_SIGNAL, payload);
  }


  listenUserJoined(
    uid: string,
    onEvent: (signalPayload: SignalPayload) => void
  ): void {
    const socket = voiceChannelSocket(uid);
    socket.on(`${uid}-${ResponseEventName.USER_JOINED}`,(payload)=>{
      onEvent(payload);
    });
  }

  listenReturningSignal(
    uid: string,
    onEvent: (signalPayload: SignalPayload) => void
  ): void {
    const socket = voiceChannelSocket(uid);

    socket.on(`${uid}-${ResponseEventName.RECEIVING_RETURNED_SIGNAL}`,(payload)=>{
      onEvent(payload);
    });
  }
}

export default new VoiceChannelService();
