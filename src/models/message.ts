/**
 * Modelo de Mensaje para los canales de texto
 */
export interface Message {
  /**
   * ID único del mensaje
   */
  uid?: string;

  /**
   * ID único del usuario que envió el mensaje
   */
  uid_usuario: string;

  /**
   * Nombre del usuario que envió el mensaje
   */
  usuarioNombre: string;

  /**
   * Contendio del mensaje de texto
   */
  contenido: string;

  /**
   * Fecha en la que fue enviada el mensaje
   */
  fecha: number;

  /**
   * URL de la imagen de perfil del usuario
   */
  fotoURL: string;
}
