/**
 * Enum que contiene los diferentes tipos de coleccines presentes en la db
 */
export enum Collection{
    /**
     * Coleccion de usuarios
     */
    USERS = "usuarios",
    ONLINE = "usuarios_online",
    /**
     * Colección de espacios de trabajo
     */
    WORK_SPACE = "espacios_de_trabajo",
    CHANNELS = "canales",
    MESSAGES = "mensajes",
    INVITATIONS = "invitaciones",
    /**
     * Colección de canales de texto
     */
    TEXT_CHANNEL = "canales_texto",
    /**
     * Colección de canales de voz
     */
    VOICE_CHANNEL = "canales_voz"
}

