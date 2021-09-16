import { Status } from "@/models/status";
import { realTime } from "@/utils/firebase";

/**
 * Servicio de presencia de usuarios.
 */
class PresenceService {
  ref(uid: string) {
    return realTime.ref(`status/${uid}`);
  }

  getPresence(uid: string, onChanged: (status: Status) => void) {
    return this.ref(uid).on("value", snap => {
      onChanged(snap.val()?.status ?? Status.OFFLINE);
    });
  }

  async setPresence(status: Status, uid?: string): Promise<void> {
    if (uid) {
      await this.ref(uid).update({
        status
      });
    }
  }

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
