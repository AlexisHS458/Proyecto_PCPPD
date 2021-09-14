/**
 * Modelo de las invitaciones a los espacios de trabajo
 */
export interface Invitation {
  /**
   * ID único de la invitación
   */
  uid?: string;
  /**
   * Nombre del usuario que realizó la invitación
   */
  nombreRemitente: string;

  /**
   * Nombre del espacio de trabajo
   */
  nombreEspacioTrabajo: string;

  /**
   * ID del espacio de trabajo
   */
  IdEspacioTrabajo: string;
}
