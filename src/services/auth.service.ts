import { auth } from '@/utils/firebase';

/**
 * Clase que conecta con el Firebase Authentication 
 */
class AuthService {
    /**
     * Funcion para cerrar sesión.
     * @returns [Promise] de la sesión cerrada
     */
    logout(){
        return auth.signOut();
    }
}

export default new AuthService();