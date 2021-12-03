import { SignalPayload } from "@/models/signalpayload";
import { SocketUser } from "@/models/socketUser";
import { voiceChannelSocket } from "@/socketio";
import { EventName } from "@/utils/event_name";
import { ResponseEventName } from "@/utils/response_event_name";
import { Socket } from "node_modules/socket.io-client/build";

class VoiceChannelService {
  /**
   * Se conecta a un canal de voz
   * @param uid ID del usuario a conectar
   * @param voiceChannelID ID del canal de voz al cual para conectar al usuario
   */
  joinToVoiceChannel(voiceChannelID: string, socket: Socket): Socket {
    return socket.emit(EventName.JOIN_VOICE_CHANNEL, voiceChannelID);
  }

  /**
   * Conecta un socket a un room
   * @param uid uid del usuarios
   * @param roomID ID del room a unirse
   * @param createNewSocket si es true creara una nueva instancia del socket al unirse
   */
  joinRoom(uid: string, roomID: string, createNewSocket = true): Socket {
    return voiceChannelSocket(uid, createNewSocket).emit(EventName.JOIN_ROOM, roomID);
  }

  /**
   * Abandona un canal de voz
   * @param uid uid de usuario a abandonar el canal de voz
   * @returns
   */
  leaveVoiceChannel(uid: string): Socket {
    return voiceChannelSocket(uid).emit(EventName.LEAVE_VOICE_CHANNEL);
  }

  /**
   * Obtiene todos los usuarios dentro de un canal de voz
   * @param uid ID del usuarios
   * @param voiceChannelID canal de voz de donde se obtendran los usuarios
   * @param onEvent suscripción al evento
   */
  allUsers(uid: string, voiceChannelID: string, onEvent: (users: SocketUser[]) => void): Socket {
    return this.joinRoom(uid, voiceChannelID)
      .on(ResponseEventName.ALL_USERS, payload => {
        onEvent(Object.values(payload));
      })
      .emit(EventName.EMIT_USERS, voiceChannelID);
  }

  /**
   * Obtiene la lista de usuario cuando un usuario nuevo se une al canal de voz
   * @param uid ID del usuario
   * @param channelID: ID del canal a conectar
   * @param onEvent suscripción al eventro
   */
  joinedUsers(socket: Socket, channelID: string, onEvent: (users: SocketUser[]) => void): Socket {
    return socket.on(`${ResponseEventName.JOINED_USERS}-${channelID}`, payload => {
      onEvent(Object.values(payload));
    });
  }

  userStatus(uid: string, onEvent: (channelID: string | undefined) => void): Socket {
    return voiceChannelSocket(uid).on(ResponseEventName.USER_STATUS, payload => {
      onEvent(payload.channelID);
    });
  }

  listenUserJoined(
    socket: Socket,
    channelID: string,
    onEvent: (signalPayload: SignalPayload) => void
  ): Socket {
    return socket.on(`${ResponseEventName.USER_JOINED}-${channelID}`, payload => {
      onEvent(payload);
    });
  }

  sendingSignal(uid: string, payload: SignalPayload): Socket {
    return voiceChannelSocket(uid).emit(EventName.SENDING_SIGNAL, payload);
  }

  returningSignal(uid: string, payload: SignalPayload): Socket {
    return voiceChannelSocket(uid).emit(EventName.RETURNING_SIGNAL, payload);
  }

  listenReturningSignal(
    uid: string,
    voiceChannelID: string,
    onEvent: (signalPayload: SignalPayload) => void
  ): Socket {
    return this.joinRoom(uid, uid).on(
      `${ResponseEventName.RECEIVING_RETURNED_SIGNAL}-${voiceChannelID}`,
      payload => {
        onEvent(payload);
      }
    );
  }

  /**
   * Mutea el microfono de un usuario
   * @param uid uid del usuario actual
   * @param payload  contine uid del usuario y las acciones a realizar
   */
  sendActionToUser(
    uid: string,
    payload: {
      uidUserToMute: string;
      actions: {
        mute?: boolean;
        disconnect?: boolean;
      };
    }
  ): Socket {
    return voiceChannelSocket(uid).emit(EventName.ACTION_USER, payload);
  }

  listenToActions(
    uid: string,
    onEvent: (actions: { mute?: boolean; deafen?: boolean; disconnect?: boolean }) => void
  ): Socket {
    return voiceChannelSocket(uid).on(ResponseEventName.ACTIONS, payload => {
      onEvent(payload);
    });
  }
}

export default new VoiceChannelService();
