import { Collection } from "@/utils/collections";
import { db, FieldValue } from "@/utils/firebase";

/**
 * Conexión a servicios de información de los espacios de trabajo.
 */
class PermissionsService {
    /**
     * Añadir permiso de un canal de texto a un usuario de un espacio de trabajo.
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
     * Remover permiso de un canal de texto a un usuario de un espacio de trabajo.
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

    /**
     * Añadir permiso de un canal de voz a un usuario de un espacio de trabajo.
     * @param IDWorkSpace espacio de trabajo
     * @param IChannel canal
     * @param IDUser usuario a añadir permiso
     */
     async AddVoicePermission(IDWorkSpace: string, IDChannel: string, IDUser: string, ): Promise<void> {
        return await db
        .collection(Collection.WORK_SPACE)
        .doc(IDWorkSpace).collection(Collection.VOICE_CHANNEL).doc(IDChannel)
        .update({
            permisos: FieldValue.arrayUnion(IDUser)
        });
    }

    /**
     * Remover permiso de un canal de voz a un usuario de un espacio de trabajo.
     * @param IDWorkSpace espacio de trabajo
     * @param IChannel canal
     * @param IDUser usuario a remover permiso
     */
     async RemoveVoicePermission(IDWorkSpace: string, IDChannel: string, IDUser: string, ): Promise<void> {
        return await db
        .collection(Collection.WORK_SPACE)
        .doc(IDWorkSpace).collection(Collection.VOICE_CHANNEL).doc(IDChannel)
        .update({
            permisos: FieldValue.arrayRemove(IDUser)
        });
    }

    /**
     * Añadir permiso de un canal de código a un usuario de un espacio de trabajo.
     * @param IDWorkSpace espacio de trabajo
     * @param IChannel canal
     * @param IDUser usuario a añadir permiso
     */
     async AddCodePermission(IDWorkSpace: string, IDChannel: string, IDUser: string, ): Promise<void> {
        return await db
        .collection(Collection.WORK_SPACE)
        .doc(IDWorkSpace).collection(Collection.CODE_CHANNEL).doc(IDChannel)
        .update({
            permisos: FieldValue.arrayUnion(IDUser)
        });
    }

    /**
     * Remover permiso de un canal de código a un usuario de un espacio de trabajo.
     * @param IDWorkSpace espacio de trabajo
     * @param IChannel canal
     * @param IDUser usuario a remover permiso
     */
     async RemoveCodePermission(IDWorkSpace: string, IDChannel: string, IDUser: string, ): Promise<void> {
        return await db
        .collection(Collection.WORK_SPACE)
        .doc(IDWorkSpace).collection(Collection.CODE_CHANNEL).doc(IDChannel)
        .update({
            permisos: FieldValue.arrayRemove(IDUser)
        });
    }
}

export default new PermissionsService();