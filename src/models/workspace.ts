import { CodeChannel } from "./codeChannel";
import { TextChannel } from "./textChannel";
import { VoiceChannel } from "./voiceChannel";
import { User } from "./user";

/**
 * Modelo de espacios de trabajo
 */
export interface Workspace {
  /**
   * ID único del espacio de trabajo
   */
  uid: string,
  /**
   * ID único correspondiente al propietario del espacio de trabajo
   */
  uid_usuario: string,
  /**
   * Nombre del espacio de trabajo
   */
  nombre: string,

  /**
   * Canales de código dentro del espacio de trabajo
   */
  canales_codigo?: CodeChannel,
  /**
   * Canales de texto dentro del espacio de trabajo
   */
  canales_texto: TextChannel[],

  /**
   * Canales de voz dentro del espacio de trabajo
   */
  canales_voz: VoiceChannel[],

  /**
   * Usuarios pertenencientes al espacio de trabajo
   */
  usuarios: User[]
}
