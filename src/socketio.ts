import { io } from "socket.io-client";


const endpoit = "http://pcppd.herokuapp.com/rtc";


//const socket = io(endpoit);
const rtcSocket = io(endpoit,{
    transports:  ['websocket']
});
console.log(rtcSocket);


export {rtcSocket};