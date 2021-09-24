import { SDP } from "./sdp";

/**
 * Modelo de llamadas para la comunicación por voz
 */
export interface Call{
    /**
     * Oferta que se realiza para la llamada
     */
    offer: SDP,

    /**
     * Respuesta a la llamada
     */
    answer: SDP,
}