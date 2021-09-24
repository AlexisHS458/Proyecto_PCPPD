/**
 * Modelo especifico para abandonar espacion de trabajo desde la
 * pantalla principal
 */
export interface LeaveWorkspace {
  /**
   * uid del usuario a abandonar un espacio de trabajo
   */
  uidUser: string;

  /**
   * uid del espacio de trabajo a abandonar
   */
  uidWorkspace: string;

  /**
   * Nombre del esapcio de trabajo a abandonar
   */
  nombreWorkspace: string;
}
