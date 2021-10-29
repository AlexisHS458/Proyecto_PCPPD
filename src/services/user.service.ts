import { db, auth, FieldValue } from "@/utils/firebase";
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
  async getUserAuthInfo(onSnapshot: (user: User) => void): Promise<User> {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged(user => {
        if (user) {
          db.collection(Collection.USERS)
            .doc(user?.uid)
            .onSnapshot(
              value => {
                const userData = value.data();
                if (userData) {
                  onSnapshot(<User>userData);
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
   * @returns Lista de usuarios
   */
  async getUsers(): Promise<User[]> {
    const snapshot = await db.collection(Collection.USERS).get();
    const users: User[] = [];

    snapshot.forEach(doc => {
      const user = {
        ...doc.data(),
        uid: doc.id
      };
      users.push(<User>user);
    });
    return users;
  }

  /**
   * Recupera la información de los usuarios a partir de una lista de IDs
   * @param usersIDs ID de los usuarios a consultar información
   * @param onSnapshot funcion que contiene la lista de usuarios obtenidos
   */
  getUsersByID(usersIDs: string[], onSnapshot: (users: User[]) => void): void {
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

  updateUserWorkspaceCount(uid: string, isIncrement: boolean): void {
    if (isIncrement) {
      db.collection(Collection.USERS)
        .doc(uid)
        .update({
          workspacesCount: FieldValue.increment(1)
        });
    } else {
      db.collection(Collection.USERS)
        .doc(uid)
        .update({
          workspacesCount: FieldValue.increment(-1)
        });
    }
  }

  updateUserWorkspaceCollab(uid: string, isIncrement: boolean): void {
    if (isIncrement) {
      db.collection(Collection.USERS)
        .doc(uid)
        .update({
          workspacesCollab: FieldValue.increment(1)
        });
    } else {
      db.collection(Collection.USERS)
        .doc(uid)
        .update({
          workspacesCollab: FieldValue.increment(-1)
        });
    }
  }
}

export default new UserService();
