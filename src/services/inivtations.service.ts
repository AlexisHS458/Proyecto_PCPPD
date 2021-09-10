import { Invitation } from "@/models/invitation";
import { Collection } from "@/utils/collections";
import { db } from "@/utils/firebase";


/**
 * Servicio de invitaciones de espacios de trabajo.
 */
class InivitationsService{

     async sendInivitation(uidUsuario: string, invitation: Invitation): Promise<void>{
         await db.collection(Collection.USERS).doc(uidUsuario)
         .collection(Collection.INVITATIONS).add(invitation);
    }
}

export default new InivitationsService();