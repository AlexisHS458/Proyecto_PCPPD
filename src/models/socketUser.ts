/**
 * Modelo del usuario de socket io
 */
 export interface SocketUser {
    /**
     * ID único del usuario
     */
    socketID: string;
    uid: string;
    currentVoiceChannel?: string;

}
  