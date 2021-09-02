import { CodeChannel } from "./codeChannel";
import { TextChannel } from "./textChannel";
import { VoiceChannel } from "./voiceChannel";
import { User } from "./user";


/**
 * Modelo de espacios de trabajo
 * @property uid: ID único del espacio de trabajo
 * @property uid_usuario: ID único correspondiente al propietario del espacio de trabajo
 * @property nombre: Nombre del espacio de trabajo
 * @property canales_codigo: Arreglo de canales de código
 * @property canales_texto: Arreglo de canales de texto
 * @property canales_voz: Arreglo de canales de voz
 * @property usuarios: Arreglo de usuarios pertenecientes al espacio de trabajo
 */
export interface Workspace  {
  uid: string;
  uid_usuario: string
  nombre: string;
  canales_codigo?: CodeChannel;
  canales_texto: TextChannel[];
  canales_voz: VoiceChannel[];
  usuarios: User[];
}
