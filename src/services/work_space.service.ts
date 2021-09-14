import { db } from "@/utils/firebase";
import { Workspace } from "@/models/workspace";
import { Collection } from "@/utils/collections";
import ChannelsService from "@/services/channels.service";
import { User } from "@/models/user";

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
    const workSpaceRef = (
      await db.collection(Collection.WORK_SPACE).add(workspace)
    ).get();
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
  getWorkspaces(
    uid: string,
    onSnapshot: (workspaces: Workspace[]) => void
  ): void {
    db.collection(Collection.WORK_SPACE)
      .where("uid_usuario", "==", uid)
      .onSnapshot(snapshot => {
        onSnapshot(
          snapshot.docs.map<Workspace>(doc => {
            const workspace = {
              ...doc.data(),
              uid: doc.id, 
            };
            const workspaceData = <Workspace>workspace;
            ChannelsService.getTextChannels(doc.id, textChannels => {
              workspaceData.canales_texto = textChannels;
            })
            return workspaceData;
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
            const workspaceData ={
             ...value.data(),
             uid: value.id
            } 
            if (workspaceData) {
              const workspace = <Workspace>workspaceData;
              
              ChannelsService.getTextChannels(workspace.uid, textChannels => {
                workspace.canales_texto = textChannels;
              })
              ChannelsService.getVoiceChannels(workspace.uid, voiceChannels => {
                workspace.canales_voz = voiceChannels;
              })

              resolve(workspace);
            }
          },
          error => {
            reject(error);
          }
        );
    });
  }

  /**
  * Agrega un usuario a la coleccion ONLINE
  * @param user
  * @returns User. Referencia del usuario agregado.
  */
  async AddUserOnline(user: User, workSpaceID:string): Promise<User> {
    const userRef = (await db.collection(Collection.WORK_SPACE).doc(workSpaceID)
    .collection(Collection.ONLINE).add(user)).get();
    return <User>(await userRef).data();
  }

  /**
   * Eliminar un usuario de la coleccion ONLINE
   * @param userID ID del usuario a eliminar
   */
   async deleteUserOnline(userID: string, workSpaceID:string): Promise<void> {
    await db
      .collection(Collection.WORK_SPACE).doc(workSpaceID)
      .collection(Collection.ONLINE).doc(userID).delete();
  }

}

export default new WorkSpaceService();
