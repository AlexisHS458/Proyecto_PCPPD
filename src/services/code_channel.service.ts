import { CursorCoordinates } from "@/models/cursorCoordinates";
import { SocketUser } from "@/models/socketUser";
import { codeChannelSocket } from "@/socketio";
import { EventName } from "@/utils/event_name";
import { ResponseEventName } from "@/utils/response_event_name";
import { Socket } from "socket.io-client";

class CodeChannelService {
  joinToCodeChannel(uid: string, codeChannelID: string): Socket {
    return codeChannelSocket(uid).emit(EventName.JOIN_CODE_CHANNEL, codeChannelID);
  }

  joinRoom(uid: string, roomID: string, createNewSocket = true): Socket {
    return codeChannelSocket(uid, createNewSocket).emit(EventName.CODE_JOIN_ROOM, roomID);
  }

  leaveCodeChannel(uid: string) {
    codeChannelSocket(uid).emit(EventName.LEAVE_CODE_CHANNEL);
  }

  allUsers(uid: string, codeChannelID: string, onEvent: (users: SocketUser[]) => void): Socket {
    return this.joinRoom(uid, codeChannelID)
      .on(ResponseEventName.CODE_ALL_USERS, payload => {
        onEvent(Object.values(payload));
      })
      .emit(EventName.CODE_EMIT_USERS, codeChannelID);
  }

  joinedUsers(uid: string, onEvent: (users: SocketUser[]) => void): Socket {
    return codeChannelSocket(uid).on(ResponseEventName.CODE_JOINED_USERS, payload => {
      onEvent(Object.values(payload));
    });
  }

  userStatus(uid: string, onEvent:(channelID: string | undefined) => void): Socket {
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

  getCoordinates(
    uid: string,
    onEvent: (coordinates: CursorCoordinates[]) => void
  ): Socket {
    return codeChannelSocket(uid).on(ResponseEventName.COORDINAES, payload => {
      onEvent(payload);
    });
  }

  sendCode(
    uid: string,
    codeData: {
      channelID: string;
      code: string;
    }
  ): Socket {
    return codeChannelSocket(uid).emit(EventName.SEND_CODE, codeData);
  }

  getDataCode(uid: string, onEvent: (code: string) => void): Socket {
    return codeChannelSocket(uid).on(ResponseEventName.CODE, payload => {
      onEvent(payload);
    });
  }
}

export default new CodeChannelService();
