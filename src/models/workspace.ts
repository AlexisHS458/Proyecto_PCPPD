import { CodeChannel } from "./codeChannel";
import { TextChannel } from "./textChannel";
import { VoiceChannel } from "./voiceChannel";
import { User } from "./user";

export interface Workspace {
  uid: string;
  nombre: string;
  canales_codigo?: CodeChannel;
  canales_texto?: TextChannel;
  canales_voz?: VoiceChannel;
  usuarios?: User;
}
