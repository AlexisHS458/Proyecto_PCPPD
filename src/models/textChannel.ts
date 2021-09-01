/**
 * Modelo del Espacio de trabajo
 * @property id: ID del canal de texto
 * @property nombre: Nombre del canal de texto
 * @property permisos: Arreglo que contiene los ID de usuario con permiso de acceso al canal
 */
export interface TextChannel {
    id: string, //TO-DO: Quitar la nulabilidad
    nombre: string,
    permisos: string[]
}