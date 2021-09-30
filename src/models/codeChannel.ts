import { Project } from "./project";

/**
 * Modelo de Canales de código
 */
export interface CodeChannel {
    uid?: string,
    nombre: string,
    permisos: string[]
    proyecto: Project
}