/**
     * Protocolo de descripción de sesión (Session Description protocol) 
     */
export interface SDP{
    /**
     * Datos del sdp
     */
     sdp : string | undefined;

     /**
      * Tipo de SDP
      */
     type: RTCSdpType
}