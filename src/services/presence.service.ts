import { Status } from "@/models/status";
import { realTime } from "@/utils/firebase";

/**
 * Servicio de presencia de usuarios.
 */
class PresenceService {

  /**
   * Recupera la referencia del usuario a partir de su uid
   * @param uid ID del usuario 
   * @returns Referencia
   */
  ref(uid: string) {
    return realTime.ref(`status/${uid}`);
  }

  /**
   * Obtiene el status de la presencia del usuario
   * @param uid ID del usuario a obtener su presencia
   * @param onChanged Suscripción a su status
   * @returns Referencia de la presencia
   */
  getPresence(uid: string, onChanged: (status: Status) => void) {
    return this.ref(uid).on("value", snap => {
      onChanged(snap.val()?.status ?? Status.OFFLINE);
    });
  }

  /**
   * Coloca el status de presencia a un usuario
   * @param status Status a poner como presencia
   * @param uid ID del usuario a modificar su presencia
   */
  async setPresence(status: Status, uid?: string): Promise<void> {
    if (uid) {
      await this.ref(uid).update({
        status
      });
    }
  }

  /**
   * Coloca el status del usuario hasta que se logra recuperar su status
   * @param uid ID del usuario
   */
  async waitUntilDisconnect(uid: string) {
    this.ref(uid)
      .onDisconnect()
      .set({ status: Status.OFFLINE })
      .then(() => {
        this.ref(uid).set({ status: Status.ONLINE });
      });
  }
}

export default new PresenceService();
