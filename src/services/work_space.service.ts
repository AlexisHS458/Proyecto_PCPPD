import { db } from "@/firebase";
import firebase from "firebase/app";
import { Workspace } from "@/models/workspace";
import { Collection } from "@/utils/collections";

/**
 * Conexión a servicios de información de los espacios de trabajo.
 */
class WorkSpaceService {

    /**
     * Agrega un nuevo espacio de trabajo
     * @param workspace 
     * @returns 
     */
    async createWorkSpace(workspace: Workspace): Promise<firebase.firestore.DocumentReference> {
        return await db.collection(Collection.WORK_SPACE).add(workspace);

    }
}

export default new WorkSpaceService();