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
      .where('usuarios','array-contains', uid)
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
   * Recupera los usuarios dentro del espacio de trabajo.
   * @param usersID IDs de los usuarios dentro del espacio de trabajo.
   * @param onSnapshot Suscripcion a colección de usuarios.
   */
  getUsersInWorkspace(
    usersID: string[],
    onSnapshot: (users: User[]) => void
    ){
      db.collection(Collection.USERS).where('uid', 'in', usersID)
      .onSnapshot(snapshot => {
        onSnapshot(
          snapshot.docs.map<User>(doc => {
            return <User>doc.data();
          })
        );
      });
  }
}

export default new WorkSpaceService();
