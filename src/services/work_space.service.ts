import { db, firebase } from "@/utils/firebase";
import { Workspace } from "@/models/workspace";
import { Collection } from "@/utils/collections";

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
   * @param id
   */
  async deleteWorkSpace(id: string): Promise<void> {
    const delWorkSpace = await db
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
      .where("uid", "==", uid)
      .onSnapshot(snapshot => {
        onSnapshot(snapshot.docs.map<Workspace>(doc => <Workspace>doc.data()));
      });
  }
}

export default new WorkSpaceService();
