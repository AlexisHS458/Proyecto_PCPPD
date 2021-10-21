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

let ccSocket: Socket;
let ccUID: string;
const endpoitCC = "http://pcppd.herokuapp.com/codeChannel";
const codeChannelSocket = (uid: string): Socket => {
  if (ccSocket && ccUID === uid) {
    return ccSocket;
  } else {
    const socket = io(endpoitCC, {
      transports: ["websocket"],
      auth: { uid }
    });
    ccSocket = socket;
    ccUID = uid;
    return socket;
  }
};
export { codeChannelSocket, voiceChannelSocket};
