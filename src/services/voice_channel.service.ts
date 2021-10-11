import { SignalPayload } from "@/models/signalpayload";
import { SocketUser } from "@/models/socketUser";
import { voiceChannelSocket} from "@/socketio";
import { EventName } from "@/utils/event_name";
import { ResponseEventName } from "@/utils/response_event_name";

class VoiceChannelService {
  joinToVoiceChannel(uid: string, voiceChannelID: string) {
    voiceChannelSocket(uid).emit(EventName.JOIN_VOICE_CHANNEL, voiceChannelID);
  }

  usersInVoiceChannel(uid: string, voiceChannelID: string, onEvent: (users: SocketUser[]) => void) {
    voiceChannelSocket(uid).on(
      `${voiceChannelID}-${ResponseEventName.USERS_IN_VOICE_CHANNEL}`,
      payload => {
        console.log(Object.values(payload));
        onEvent(Object.values(payload));
      }
    );
  }
  
  emitUsers(uid: string, voiceChannelID: string){
    voiceChannelSocket(uid).emit(EventName.EMIT_USERS,voiceChannelID);
  }

  leaveVoiceChannel(uid: string){
    voiceChannelSocket(uid).emit(EventName.LEAVE_CODE_CHANNEL);
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
  ): void{
    voiceChannelSocket(uid).emit(EventName.RETURNING_SIGNAL, payload);
  }

  listenReturningSignal(
    uid: string,
    onEvent: (signalPayload: SignalPayload) => void
  ){
    const socket = voiceChannelSocket(uid);

    socket.on(`${socket.id}-${ResponseEventName.RETURNED_SIGNAL}`,(payload)=>{
      onEvent(payload);
    });
  }


}

export default new VoiceChannelService();
