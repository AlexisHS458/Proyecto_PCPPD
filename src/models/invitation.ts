/**
 * Modelo de las invitaciones a los espacios de trabajo
 */
export interface Invitation {
    /**
     * ID único de la invitación
     */
    uid: string,
    /**
     * ID del usuario que realizó la invitación
     */
    id_remitente: string
}