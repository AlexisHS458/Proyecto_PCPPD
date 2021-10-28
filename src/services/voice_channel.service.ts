import { SignalPayload } from "@/models/signalpayload";
import { SocketUser } from "@/models/socketUser";
import { voiceChannelSocket} from "@/socketio";
import { EventName } from "@/utils/event_name";
import { ResponseEventName } from "@/utils/response_event_name";
import { Socket } from "node_modules/socket.io-client/build";

class VoiceChannelService {

  /**
   * Se conecta a un canal de voz
   * @param uid ID del usuario a conectar
   * @param voiceChannelID ID del canal de voz al cual para conectar al usuario
   */
  joinToVoiceChannel(uid: string, voiceChannelID: string): Socket {
    return voiceChannelSocket(uid).emit(EventName.JOIN_VOICE_CHANNEL, voiceChannelID);
  }

  joinRoom(uid: string, roomID: string, createNewSocket = true): Socket {
    return voiceChannelSocket(uid,createNewSocket).emit(EventName.JOIN_ROOM,roomID);
  }


  leaveVoiceChannel(uid: string): Socket{
    return voiceChannelSocket(uid).emit(EventName.LEAVE_VOICE_CHANNEL);
  }

  allUsers(uid: string, voiceChannelID: string, onEvent: (users: SocketUser[]) => void): Socket {
    return this.joinRoom(uid,voiceChannelID).on(ResponseEventName.ALL_USERS, payload => {
      onEvent(Object.values(payload));
    }).emit(EventName.EMIT_USERS, voiceChannelID);

  }

  
  joinedUsers(uid: string, onEvent: (users: SocketUser[]) => void): Socket {
    return voiceChannelSocket(uid).on(ResponseEventName.JOINED_USERS, payload => {
      onEvent(Object.values(payload));
    });
  }

  userStatus(
    uid: string,
    onEvent: (channelID: string | undefined) => void
  ): Socket{
      return voiceChannelSocket(uid).on(ResponseEventName.USER_STATUS, (payload) => {
        onEvent(payload.channelID)
      });
  }

  sendingSignal(
    uid: string,
    payload: SignalPayload
  ): Socket{
    return voiceChannelSocket(uid).emit(EventName.SENDING_SIGNAL, payload);
  }

  returningSignal(
    uid: string,
    payload: SignalPayload
  ): Socket {
    return voiceChannelSocket(uid).emit(EventName.RETURNING_SIGNAL, payload);
  }


  listenUserJoined(
    uid: string,
    onEvent: (signalPayload: SignalPayload) => void
  ): Socket {
    return voiceChannelSocket(uid).on(ResponseEventName.USER_JOINED,(payload)=>{
      onEvent(payload);
    });
  }

  listenReturningSignal(
    uid: string,
    onEvent: (signalPayload: SignalPayload) => void
  ): Socket {
    return this.joinRoom(uid,uid,false).on(ResponseEventName.RECEIVING_RETURNED_SIGNAL,(payload)=>{
      console.log('receiving signal', payload);
      
      onEvent(payload);
    });
  }
}

export default new VoiceChannelService();
