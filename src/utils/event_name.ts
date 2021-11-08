export enum EventName {
  //CodeChannel
  JOIN_CODE_CHANNEL = "join-code-channel",
  LEAVE_CODE_CHANNEL = "leave-code-channel",
  SENT_COORDINATES = "sent-coordinates",
  SEND_CODE = 'send-code',
  CODE_EMIT_USERS = "code-emit-users",
  CODE_JOIN_ROOM = "code-join-room",

  //VoiceChannel
  JOIN_VOICE_CHANNEL = "join-voice-channel",
  LEAVE_VOICE_CHANNEL = "leave-voice-channel",
  SENDING_SIGNAL = "sending-signal",
  RETURNING_SIGNAL = "returning-signal",
  EMIT_USERS = "emit-users",
  JOIN_ROOM = "join-room"
}
