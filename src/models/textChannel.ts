import { Message } from "./message";

/**
 * Modelo del Espacio de trabajo
 */
export interface TextChannel {
  /**
   * ID del canal de texto
   */
  uid?: string;
  /**
   * Nombre del canal de texto
   */
  nombre: string;

  /**
   * Arreglo que contiene los ID de usuario con permiso de acceso al canal
   */
  permisos: string[];
}
