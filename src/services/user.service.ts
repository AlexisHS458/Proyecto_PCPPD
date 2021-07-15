import { db,auth } from '@/utils/firebase';
import {User} from '@/models/user';

/**
 * Conexion a servicios para la información del usuario.
 */
class UserService {    
    /**
     * Obtiene la información almacenada en Firestore.
     * @returns Información del usuario autenticado.
     */
    async getUserAuthInfo(): Promise<User>{
        return new Promise((resolve, reject) => {
            auth.onAuthStateChanged(user => {
                if(user){
                    db.collection("usuarios")
                        .doc(user?.uid).onSnapshot((value) => {
                            const userData = value.data();
                            if(userData){
                                resolve(<User>userData);
                            }
                        }, (error) => {
                            reject(error);
                            });
                }
            });
        });
    }
}

export default new UserService();