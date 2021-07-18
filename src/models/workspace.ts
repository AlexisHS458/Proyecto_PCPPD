
import { codeChannel } from './codeChannel';
import { textChannel } from './textChannel';
import { voiceChannel } from './voiceChannel';
import { User } from './user';

export interface Workspace {
    id_propietario: string,
    nombre: string,
    canales_codigo:codeChannel,
    canales_texto:textChannel,
    canales_voz:voiceChannel,
    usuarios: User
}