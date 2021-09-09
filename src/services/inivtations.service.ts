import { Collection } from "@/utils/collections";
import { db } from "@/utils/firebase";


/**
 * Servicio de invitaciones de espacios de trabajo.
 */
class InivitationsService{

     async sendInivitation(uidUsuario: string){
         db.collection(Collection.USERS).doc(uidUsuario)
         .collection(Collection.INVITATIOS) // add(invitacion)
    }
}

export default new InivitationsService();