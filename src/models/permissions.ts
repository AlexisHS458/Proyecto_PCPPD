/**
 * Modelo que contiene la ruta para otorgar permisos
 */
 export interface PermissionsPath {
    /**
     * uid del usuario a otorgar permisos
     */
    uidUser: string;
  
    /**
     * uid del espacio de trabajo
     */
    uidWorkSpace: string;
  
    /**
     * uid del canal
     */ 
    uidChannel: string
  
  }