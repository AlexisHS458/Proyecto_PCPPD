import { Project } from "./project";

export interface CodeChannel {
    id: string,
    nombre: string,
    permisos: string[],
    proyecto: Project
}