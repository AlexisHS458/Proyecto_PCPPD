import { project} from "./project";

export interface codeChannel {
    id: string,
    nombre: string,
    permisos: string[],
    proyecto: project
}