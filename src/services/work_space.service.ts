import { db } from "@/firebase";
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
}

export default new WorkSpaceService();