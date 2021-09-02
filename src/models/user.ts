/**
 * Modelo del usuario
 * @property uid: ID único del usuario
 * @property nombre: Nombre del usuario
 * @property apellido: Apellido del usuario
 * @property boleta: Boleta del usuario
 * @property fotoURL: URL de la imagen de perfil del usuario
 */
export interface User {
    uid: string,
    nombre: string,
    apellido: string,
    boleta: string,
    fotoURL: string
}
