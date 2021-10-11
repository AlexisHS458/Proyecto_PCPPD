import { SocketUser } from "@/models/socketUser";
import { codeChannelSocket } from "@/socketio";
import { EventName } from "@/utils/event_name";
import { ResponseEventName } from "@/utils/response_event_name";

class CodeChannelService {
  joinToCodeChannel(uid: string, codeChannelID: string) {
    console.log(uid, codeChannelID);
    codeChannelSocket(uid).emit(EventName.JOIN_CODE_CHANNEL, codeChannelID);
  }

  usersInCodeChannel(uid: string, codeChannelID: string, onEvent: (users: SocketUser[]) => void) {
    codeChannelSocket(uid).on(
      `${codeChannelID}-${ResponseEventName.USERS_IN_CODE_CHANNEL}`,
      payload => {
        console.log(Object.values(payload));
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
}

export default new CodeChannelService();
