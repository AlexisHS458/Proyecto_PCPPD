/**
 * Modelo de espacios de trabajo
 */
export interface Workspace {
  /**
   * ID único del espacio de trabajo
   */
  uid: string;
  /**
   * ID único correspondiente al propietario del espacio de trabajo
   */
  uid_usuario: string;
  /**
   * Nombre del espacio de trabajo
   */
  nombre: string;

  /**
   * IDs de usuarios pertenencientes al espacio de trabajo
   */
  usuarios: string[];
}
