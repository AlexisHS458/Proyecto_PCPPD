import { SocketUser } from "@/models/socketUser";
import { codeChannelSocket } from "@/socketio";
import { EventName } from "@/utils/event_name";
import { ResponseEventName } from "@/utils/response_event_name";

class CodeChannelService {
  joinToCodeChannel(uid: string, codeChannelID: string) {
    codeChannelSocket(uid).emit(EventName.JOIN_CODE_CHANNEL, codeChannelID);
  }

  usersInCodeChannel(uid: string, codeChannelID: string, onEvent: (users: SocketUser[]) => void) {
    codeChannelSocket(uid).on(
      `${codeChannelID}-${ResponseEventName.USERS_IN_CODE_CHANNEL}`,
      payload => {
        onEvent(Object.values(payload));
      }
    );
  }

  emitUsers(uid: string, codeChannelID: string) {
    codeChannelSocket(uid).emit(EventName.EMIT_USERS, codeChannelID);
  }

  leaveCodeChannel(uid: string) {
    codeChannelSocket(uid).emit(EventName.LEAVE_CODE_CHANNEL);
  }

  userStatus(uid: string, onEvent: (channelID: string | undefined) => void) {
    codeChannelSocket(uid).on(ResponseEventName.USER_STATUS, payload => {
      onEvent(payload.channelID);
    });
  }

  sentCoordinates(uid: string, 
    coordinates:{
      userID: string
      x:number
      y:number }) {
    codeChannelSocket(uid).emit(EventName.SENT_COORDINATES, coordinates);
  }

  getCoordinates(uid: string, codeChannelID: string, onEvent: (coordinates:{
    userID: string
    x:number
    y:number }[]) => void) {
    codeChannelSocket(uid).on(`${codeChannelID}-${ResponseEventName.GET_COORDINAES}`,
      payload => {
        onEvent(Object.values(payload));
      }
    );
  }
}

export default new CodeChannelService();
