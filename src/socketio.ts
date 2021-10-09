import { io, Socket } from "socket.io-client";

const endpoit = "http://pcppd.herokuapp.com/voiceChannel";
let vcSocket: Socket;
let vcUID: string;
const voiceChannelSocket = (uid: string): Socket => {
  if (vcSocket && vcUID === uid) {
    return vcSocket;
  } else {
    const socket = io(endpoit, {
      transports: ["websocket"],
      auth: { uid }
    });
    vcSocket = socket;
    vcUID = uid;
    return socket;
  }
};

export { voiceChannelSocket };
