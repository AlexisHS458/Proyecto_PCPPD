import { db, auth } from "@/utils/firebase";
import { User } from "@/models/user";
import { Collection } from "@/utils/collections";

/**
 * Conexion a servicios para la información del usuario.
 */
class UserService {
  /**
   * Obtiene la información almacenada en Firestore.
   * @returns Información del usuario autenticado.
   */
  async getUserAuthInfo(): Promise<User> {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged(user => {
        if (user) {
          db.collection(Collection.USERS)
            .doc(user?.uid)
            .onSnapshot(
              value => {
                const userData = value.data();
                if (userData) {
                  resolve(<User>userData);
                }
              },
              error => {
                reject(error);
              }
            );
        }
      });
    });
  }

  /**
   * Recupera la información a un usuario a partir de su ID
   * @param uid ID del usuario a consultar
   * @returns Usuario
   */
  async getUserInfoByID(uid: string): Promise<User> {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged(user => {
        if (user) {
          db.collection(Collection.USERS)
            .doc(uid)
            .onSnapshot(
              value => {
                const userData = value.data();
                if (userData) {
                  resolve(<User>userData);
                }
              },
              error => {
                reject(error);
              }
            );
        }
      });
    });
  }

  /**
   * Registra la información del usuario.
   * @param user Usuario a almacenar en la db
   * @returns Promise<void>
   */
  async saveUser(user: User): Promise<void> {
    return await db
      .collection(Collection.USERS)
      .doc(user.uid)
      .update(user);
  }


  /**
   * Recupera todos los usuarios de la base de datos
   * @param onSnapshot Snapshot de la colección de usuarios
   */
  getUsers(onSnapshot: (user: User[]) => void): void {
    db.collection(Collection.USERS).onSnapshot(snapshot => {
        onSnapshot(
            snapshot.docs.map<User>(doc => {
                const user = {
                    ...doc.data(),
                    uid: doc.id
                };
                return <User>user;
            })
        );
    });
  }

  /**
   * Recupera la información de los usuarios a partir de una lista de IDs
   * @param usersIDs ID de los usuarios a consultar información
   * @param onSnapshot funcion que contiene la lista de usuarios obtenidos
   */
  getUsersByID(
    usersIDs: string[],
    onSnapshot: (users: User[]) => void
    ): void {
      db.collection(Collection.USERS)
      .where("uid", "in", usersIDs)
      .onSnapshot(snapshot => {
        onSnapshot(
          snapshot.docs.map<User>(doc => {
            return <User>doc.data();
          })
        );
      });
  }


}

export default new UserService();
