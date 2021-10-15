import Peer from 'simple-peer';



export interface SignalPayload{
    /**
     * Datos de signalización
     */
    signal: Peer.SignalData;

    /**
     * uid de quién inicia la llamda
     */
    callerID: string;

    /**
     * uid con quien vamos a signalizar
     */
    userIDToSignal?: string;
}