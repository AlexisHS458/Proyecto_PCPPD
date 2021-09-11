import { Invitation } from "@/models/invitation";
import { Collection } from "@/utils/collections";
import { db } from "@/utils/firebase";


/**
 * Servicio de invitaciones de espacios de trabajo.
 */
class InivitationsService{

    /**
     * Enviar una invitación al espacio de trabajo 
     * @param IdUsuario ID del usuario que recibirá la invitación
     * @param invitation Invitación al espacio de trabajo
     */
    async sendInivitation(uidUsuario: string, invitation: Invitation): Promise<void>{
        await db.collection(Collection.USERS).doc(uidUsuario)
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
}

export default new InivitationsService();