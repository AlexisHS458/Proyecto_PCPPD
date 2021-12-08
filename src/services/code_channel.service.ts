import { Code } from "@/models/code";
import { CursorCoordinates } from "@/models/cursorCoordinates";
import { SocketUser } from "@/models/socketUser";
import { codeChannelSocket } from "@/socketio";
import { EventName } from "@/utils/event_name";
import { ResponseEventName } from "@/utils/response_event_name";
import { Socket } from "socket.io-client";

class CodeChannelService {
  joinToCodeChannel(socket: Socket, codeChannelID: string): Socket {
    return socket.emit(EventName.JOIN_CODE_CHANNEL, codeChannelID);
  }

  joinRoom(uid: string, roomID: string, createNewSocket = true): Socket {
    return codeChannelSocket(uid, createNewSocket).emit(EventName.CODE_JOIN_ROOM, roomID);
  }

  leaveCodeChannel(uid: string): Socket {
    return codeChannelSocket(uid).emit(EventName.LEAVE_CODE_CHANNEL);
  }

  allUsers(uid: string, codeChannelID: string, onEvent: (users: SocketUser[]) => void): Socket {
    return this.joinRoom(uid, codeChannelID)
      .on(ResponseEventName.CODE_ALL_USERS, payload => {
        onEvent(Object.values(payload));
      })
      .emit(EventName.CODE_EMIT_USERS, codeChannelID);
  }

  joinedUsers(socket: Socket, onEvent: (users: SocketUser[]) => void): Socket {
    return socket.on(ResponseEventName.CODE_JOINED_USERS, payload => {
      onEvent(Object.values(payload));
    });
  }

  userStatus(uid: string, onEvent: (channelID: string | undefined) => void): Socket {
    return codeChannelSocket(uid).on(ResponseEventName.CODE_USER_STATUS, payload => {
      onEvent(payload.channelID);
    });
  }

  sentCoordinates(
    uid: string,
    coordinates: {
      userID: string;
      x: number;
      y: number;
    }
  ): Socket {
    return codeChannelSocket(uid).emit(EventName.SENT_COORDINATES, coordinates);
  }

  getCoordinates(uid: string,codeChannelID:string, onEvent: (coordinates: CursorCoordinates[]) => void): Socket {
    return this.joinRoom(uid,codeChannelID).on(ResponseEventName.COORDINAES, payload => {
      onEvent(payload);
    });
  }

  sendCode(
    uid: string,
    codeData: {
      channelID: string;
      code: string;
      extension: string;
      path: string;
    }
  ): Socket {
    return codeChannelSocket(uid).emit(EventName.SEND_CODE, codeData);
  }

  getDataCode(uid: string, codeChannelID: string, onEvent: (code: Code) => void): Socket {
    return codeChannelSocket(uid).on(`${ResponseEventName.CODE}-${codeChannelID}`, payload => {
      onEvent(payload);
    });
  }

  /**
   * Obtiene el uid del driver dentro del canal de código
   * @param uid uid de usuario
   * @param onEvent evento cuando cambia el driver
   */
  currentDriver(socket: Socket, onEvent: (driverID: string) => void): Socket {
    return socket.on(ResponseEventName.DRIVER, payload => {
      onEvent(payload);
    });
  }

  /**
   * Envia al driver una solicitud al driver para alternar a ser driver
   * @param uid uid del usuario actual
   */
  sendRequestToDriver(uid: string): Socket {
    return codeChannelSocket(uid).emit(EventName.REQUEST_DRIVER);
  }

  /**
   * El driver actual recibe una notifiación si un navigator solicita ser driver
   * @param uid uid del usuairo actual
   * @param onEvent Evento que contiene el uid del usuario que esta solicitando ser driver
   */
  listenForRequest(uid: string, onEvent: (navigatorID: string) => void): Socket {
    return codeChannelSocket(uid).on(ResponseEventName.REQUEST_FROM_NAV, payload => {
      onEvent(payload);
    });
  }

  /**
   * Acepta la solicitud para cambio de driver
   * @param uid uid del usuario actual
   * @param newDriverID uid del nuevo usuario a ser driver
   * @returns
   */
  acceptRequest(uid: string, newDriverID: string): Socket {
    return codeChannelSocket(uid).emit(EventName.ACCEPT_REQUEST, newDriverID);
  }

  requestCurrentDriver(uid: string, codeChannelID: string): Socket {
    return codeChannelSocket(uid).emit(EventName.GET_DRIVER, codeChannelID);
  }

  requestCurrentCode(uid: string, codeChannelID: string): Socket {
    return codeChannelSocket(uid).emit(EventName.REQUEST_CODE, codeChannelID);
  }

  compileCode(uid: string, codeChannelID: string, dataCode: any): Socket {
    return codeChannelSocket(uid).emit(EventName.COMPILE_CODE, { ...dataCode, codeChannelID });
  }

  lisenTerminal(uid: string, channelID: string, onEvent: (data: any) => void) {
    return this.joinRoom(uid, channelID).on(ResponseEventName.COMPILE_DATA, payload => {
      onEvent(payload);
    });
  }
}

export default new CodeChannelService();
