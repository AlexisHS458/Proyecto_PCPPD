import Peer from 'simple-peer';



export interface SignalPayload{
    signal: Peer.SignalData;
    uid: string;
    socketID: string;
}