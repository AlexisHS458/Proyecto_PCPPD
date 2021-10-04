import { io } from "socket.io-client";


const endpoit = "ws://pcppd.herokuapp.com/";
const rtcEndpoint = endpoit  + "rtc/";

const socket = io(endpoit);
const rtcSocket = io(rtcEndpoint);

export {socket, rtcSocket};