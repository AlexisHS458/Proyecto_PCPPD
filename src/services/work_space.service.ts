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
        return new Promise((resolve, reject) => {
            const workSpaceRef = db.collection(Collection.WORK_SPACE);
            workSpaceRef
                .where('uid', '==', uid)
                .onSnapshot(querySnapshot => {
                    const workspaces = querySnapshot.docs.map(doc =>{
                        doc.data();
                    });
                    if (workspaces) {
                        resolve(<Workspace[]><unknown>workspaces);
                    }
                }, (error) => {
                    reject(error);
                }
                );
        });  
    }
}

export default new WorkSpaceService();