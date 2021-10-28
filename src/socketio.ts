import { io, Socket } from "socket.io-client";

const endpoit = `${process.env.VUE_APP_SOCKET_SERVER_ENDPOINT}voiceChannel`;
let vcSocket: Socket;
let vcUID: string;

const voiceChannelSocket = (uid: string, createNewSocket = false): Socket => {
  if (!(vcSocket && vcUID === uid)|| createNewSocket) {
    const socket = io(endpoit, {
      transports: ["websocket"],
      auth: { uid }
    });
    if(!createNewSocket){
      vcUID = uid;
      vcSocket = socket;
    }
    return socket;
  } else {
    return vcSocket;
  }
};

let ccSocket: Socket;
let ccUID: string;
const endpoitCC = `${process.env.VUE_APP_SOCKET_SERVER_ENDPOINT}codeChannel`;
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
