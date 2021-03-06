import { Invitation } from "@/models/invitation";
import { User } from "@/models/user";
import { Collection } from "@/utils/collections";
import { db, FieldValue } from "@/utils/firebase";
import UserService from "@/services/user.service";
import ChannelsService from "./channels.service";
import PermissionsService from "./permissions.service";

/**
 * Servicio de invitaciones de espacios de trabajo.
 */
class InvitationsService {
  /**
   * Enviar una invitación al espacio de trabajo
   * @param IdUsuario ID del usuario que recibirá la invitación
   * @param invitation Invitación al espacio de trabajo
   */
  async sendInivitation(invitation: Invitation): Promise<void> {
    await db
      .collection(Collection.USERS)
      .doc(invitation.idUsuarioInvitado)
      .collection(Collection.INVITATIONS)
      .add(invitation);
  }

  /**
   * Obtiene las invitaciones de un usuario
   * @param uidUsuario uidUsario a consultar sus invitaciones
   * @param onSnapshot suscripción de nuevas invitaciones
   */
  getInvitations(uidUsuario: string, onSnapshot: (invitations: Invitation[]) => void): void {
    db.collection(Collection.USERS)
      .doc(uidUsuario)
      .collection(Collection.INVITATIONS)
      .onSnapshot(snapshot => {
        onSnapshot(
          snapshot.docs.map<Invitation>(doc => {
            const invitation = {
              ...doc.data(),
              uid: doc.id
            };
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
    db.collection(Collection.USERS)
      .where("nombre", "array-contains", name)
      .onSnapshot(snapshot => {
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
   * Acepta la invitación a un espacio de trabajo y se agrega el usuario al
   * espacio de trabajo
   * @param invitation
   */
  async acceptInvitation(invitation: Invitation): Promise<void> {
    await db
      .collection(Collection.WORK_SPACE)
      .doc(invitation.idEspacioTrabajo)
      .update({
        usuarios: FieldValue.arrayUnion(invitation.idUsuarioInvitado)
      });
    await UserService.updateUserWorkspaceCollab(invitation.idUsuarioInvitado, true);
    const channelId = await ChannelsService.getFirstTextChannelID(invitation.idEspacioTrabajo);
    
    await PermissionsService.AddPermission(
      invitation.idEspacioTrabajo,
      channelId,
      invitation.idUsuarioInvitado
    );
    return await this.deleteInvitation(invitation);
  }

  /**
   * Elimina la invitación al espacio de trabajo, rechazandola.
   * @param invitation invitacion a eliminar
   */
  async deleteInvitation(invitation: Invitation): Promise<void> {
    return await db
      .collection(Collection.USERS)
      .doc(invitation.idUsuarioInvitado)
      .collection(Collection.INVITATIONS)
      .doc(invitation.uid)
      .delete();
  }
}

export default new InvitationsService();
