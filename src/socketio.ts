import { io, Socket } from "socket.io-client";

const endpoit = `${process.env.VUE_APP_SOCKET_SERVER_ENDPOINT}voiceChannel`;
let vcSocket: Socket;
let vcUID: string;

const voiceChannelSocket = (uid: string, createNewSocket = false): Socket => {
  if (!(vcSocket && vcUID === uid) || createNewSocket) {
    const socket = io(endpoit, {
      transports: ["websocket"],
      auth: { uid }
    });
    if (!createNewSocket) {
      vcUID = uid;
      vcSocket = socket;
    }
    return socket;
  } else {
    return vcSocket;
  }
};

const endpoitCC = `${process.env.VUE_APP_SOCKET_SERVER_ENDPOINT}codeChannel`;
let ccSocket: Socket;
let ccUID: string;

const codeChannelSocket = (uid: string, createNewSocket = false): Socket => {
  if (!(ccSocket && ccUID === uid) || createNewSocket) {
    const socket = io(endpoitCC, {
      transports: ["websocket"],
      auth: { uid }
    });
    if (!createNewSocket) {
      ccUID = uid;
      ccSocket = socket;
    }
    return socket;
  } else {
    return ccSocket;
  }
};
export { codeChannelSocket, voiceChannelSocket };
