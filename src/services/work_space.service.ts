import { Workspace } from "@/models/workspace";
import { Collection } from "@/utils/collections";
import { User } from "@/models/user";
import { db, FieldValue} from "@/utils/firebase";

/**
 * Conexión a servicios de información de los espacios de trabajo.
 */
class WorkSpaceService {
  /**
   * Agrega un nuevo espacio de trabajo
   * @param workspace
   * @returns WorkSpace. Referencia del espacio de trabajo creado.
   */
  async createWorkSpace(workspace: Workspace): Promise<Workspace> {
    const workSpaceRef = (await db.collection(Collection.WORK_SPACE).add(workspace)).get();
    return <Workspace>(await workSpaceRef).data();
  }

  /**
   * Eliminar un espacio de trabajo existente
   * @param id ID del documento a eliminar
   */
  async deleteWorkSpace(id: string): Promise<void> {
    await db
      .collection(Collection.WORK_SPACE)
      .doc(id)
      .delete();
  }

  /**
   * Recupera los espacios de trabajo de un usuario
   * @param uid ID del usuario a recuperar sus espacios de trabajo
   */
  getWorkspaces(uid: string, onSnapshot: (workspaces: Workspace[]) => void): void {
    db.collection(Collection.WORK_SPACE)
      .where("usuarios", "array-contains", uid)
      .onSnapshot(snapshot => {
        onSnapshot(
          snapshot.docs.map<Workspace>(doc => {
            const workspace = {
              ...doc.data(),
              uid: doc.id
            };
            return <Workspace>workspace;
          })
        );
      });
  }

  /**
   * Recupera un espacio de trabajo
   * @param uid ID del espacio de trabajo a consultar
   */
  async getWorkspaceInfo(uid: string): Promise<Workspace> {
    return new Promise((resolve, reject) => {
      db.collection(Collection.WORK_SPACE)
        .doc(uid)
        .onSnapshot(
          value => {
            const workspaceData = {
              ...value.data(),
              uid: value.id
            };
            if (workspaceData) {
              resolve(<Workspace>workspaceData);
            }
          },
          error => {
            reject(error);
          }
        );
    });
  }

  /**
   * Recupera los usuarios dentro del espacio de trabajo.
   * @param usersID IDs de los usuarios dentro del espacio de trabajo.
   * @param onSnapshot Suscripcion a colección de usuarios.
   */
  getUsersInWorkspace(workspaceID: string, onSnapshot: (users: User[]) => void) : void {
    db.collection(Collection.WORK_SPACE).doc(workspaceID)
    .onSnapshot((snapshot)=>{
      const workspaceData = <Workspace> snapshot.data();
      db.collection(Collection.USERS)
      .where("uid", "in", workspaceData.usuarios)
      .onSnapshot(snapshot => {
        onSnapshot(
          snapshot.docs.map<User>(doc => {
            return <User>doc.data();
          })
        );
      });
    });
    
  }

  /**
   * Remueve un usuario de un espacio de trabajo.
   * @param IDUser usuario a remover
   * @param IDWorkSpace espacio de trabajo
   */
  async removeUser(IDUser: string, IDWorkSpace: string): Promise<void> {
    return await db
      .collection(Collection.WORK_SPACE)
      .doc(IDWorkSpace)
      .update({
        'usuarios': FieldValue.arrayRemove(IDUser)});
  }
}

export default new WorkSpaceService();
