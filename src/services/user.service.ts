import { db,auth } from '@/utils/firebase';

/**
 * Conexion a servicios para la información del usuario.
 */
class UserService {
    userRef = db.collection("usuarios").doc(auth.currentUser?.uid);
    
    /**
     * Obtiene la información almacenada en Firestore.
     * @returns Información del usuario autenticado.
     */
    async getUserAuthInfo(){
        const user = (await this.userRef.get()).data
        return user;
    }
}

export default new UserService();