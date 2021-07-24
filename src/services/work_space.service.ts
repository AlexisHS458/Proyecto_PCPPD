import { db } from '@/utils/firebase';
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
        const workSpaceRef  = (await db.collection(Collection.WORK_SPACE).add(workspace)).get();
        return <Workspace>(await workSpaceRef).data();
        

    }

    /**
     * Recupera los espacios de trabajo de un usuario
     * @param uid ID del usuario a recuperar sus espacios de trabajo
     * @returns Lista de espacios de trabajo
     */
     async getWorkspaces(uid: string): Promise<Workspace[]>{
      /*   return new Promise((resolve, reject) => {
            const workSpaceRef = db.collection(Collection.WORK_SPACE)
                .where('uid', '==', uid).get();
            workSpaceRef.then( (querySnapshot) => {
                const workspaces: Array<Workspace> = [];
                querySnapshot.forEach((doc)=>{
                    workspaces.push(<Workspace> doc.data())
                });
                resolve(workspaces);
            }
            )
        });   */
        return ((await db.collection(Collection.WORK_SPACE).where('uid', '==', uid).get()).docs).map((snapshot) => <Workspace>snapshot.data());
    }
}

export default new WorkSpaceService();