import { Invitation } from "@/models/invitation";
import { User } from "@/models/user";
import { Collection } from "@/utils/collections";
import UserService from "@/services/user.service";
import { db } from "@/utils/firebase";


/**
 * Servicio de invitaciones de espacios de trabajo.
 */
class InvitationsService{

    /**
     * Enviar una invitación al espacio de trabajo 
     * @param IdUsuario ID del usuario que recibirá la invitación
     * @param invitation Invitación al espacio de trabajo
     */
    async sendInivitation(invitation: Invitation): Promise<void>{
        await db.collection(Collection.USERS).doc(invitation.idUsuarioInvitado)
        .collection(Collection.INVITATIONS).add(invitation);
    }

    /**
     * Obtiene las invitaciones de un usuario
     * @param uidUsuario uidUsario a consultar sus invitaciones
     * @param onSnapshot suscripción de nuevas invitaciones
     */
    getInvitations(
        uidUsuario: string,
        onSnapshot: (invitations: Invitation[]) => void
    ): void {
        db.collection(Collection.USERS).doc(uidUsuario)
        .collection(Collection.INVITATIONS).onSnapshot(snapshot => {
            onSnapshot(
                snapshot.docs.map<Invitation>(doc => {
                    const invitation = {
                        ...doc.data(),
                        uid: doc.id
                    }
                    return <Invitation>invitation;
                })
            );
        });
    }

    /**
    * Recupera los nombres de los usuarios
    * @param name nombre del usuario a buscar
    */
    getUserNames(name: string, onSnapshot: (user: User[]) => void): void {
        db.collection(Collection.USERS).where("nombre", "array-contains", name).onSnapshot(snapshot => {
            onSnapshot(
                snapshot.docs.map<User>(doc => {
                    const user = {
                        ...doc.data(),
                        uid: doc.id
                    };
                    return <User>user;
                })
            );
        });
    }

    /**
     * Acepta la invitación a un espacio de trabajo
     * @param invitation 
     */
    async acceptInvitation(invitation: Invitation): Promise<void>{
        const userRef =  await UserService.getUserInfoByID(invitation.idUsuarioInvitado);

        db.collection(Collection.WORK_SPACE).doc(invitation.idEspacioTrabajo)
        .collection(Collection.USERS).add(userRef);
    }

    /**
     * Rechaza e elimina la invitación al espacio de trabajo
     * @param invitation invitacion a eliminar
     */
    async declineInvitation(invitation: Invitation): Promise<void>{
        return await db.collection(Collection.USERS).doc(invitation.idUsuarioInvitado)
        .collection(Collection.INVITATIONS).doc(invitation.uid).delete();
    }
}

export default new InvitationsService();