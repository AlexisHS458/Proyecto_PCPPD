import { Collection } from "@/utils/collections";
import { db, FieldValue } from "@/utils/firebase";

/**
 * Conexión a servicios de información de los espacios de trabajo.
 */
class PermissionsService {
    /**
     * Añadir permiso a un usuario de un espacio de trabajo.
     * @param IDWorkSpace espacio de trabajo
     * @param IChannel canal
     * @param IDUser usuario a añadir permiso
     */
    async AddPermission(IDWorkSpace: string, IDChannel: string, IDUser: string, ): Promise<void> {
        return await db
        .collection(Collection.WORK_SPACE)
        .doc(IDWorkSpace).collection(Collection.TEXT_CHANNEL).doc(IDChannel)
        .update({
            permisos: FieldValue.arrayUnion(IDUser)
        });
    }

    /**
     * Remover permiso a un usuario de un espacio de trabajo.
     * @param IDWorkSpace espacio de trabajo
     * @param IChannel canal
     * @param IDUser usuario a remover permiso
     */
     async RemovePermission(IDWorkSpace: string, IDChannel: string, IDUser: string, ): Promise<void> {
        return await db
        .collection(Collection.WORK_SPACE)
        .doc(IDWorkSpace).collection(Collection.TEXT_CHANNEL).doc(IDChannel)
        .update({
            permisos: FieldValue.arrayRemove(IDUser)
        });
    }
}

export default new PermissionsService();