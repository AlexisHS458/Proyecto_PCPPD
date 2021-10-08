import { io, Socket} from "socket.io-client";

const endpoit = "http://pcppd.herokuapp.com/voiceChannel";

const voiceChannelSocket = (uid:string): Socket => io(endpoit,{
    transports:  ['websocket'],
    auth: {uid}
});

export {voiceChannelSocket};