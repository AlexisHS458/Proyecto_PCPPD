import { db } from "@/utils/firebase";
import { Message } from "@/models/message";
import { Collection } from "@/utils/collections";

/**
 * Conexión a servicios de información de los espacios de trabajo.
 */
class MessageService {
  /**
   * Agrega un nuevo mensaje
   * @param message
   * @returns Message. Referencia del mensaje creado.
   */
  async sendMessage(message: Message): Promise<Message> {
    const messageRef = (await db.collection(Collection.MESSAGES).add(message)).get();
    return <Message>(await messageRef).data();
  }

  /**
   * Eliminar un mensaje existente
   * @param id ID del documento a eliminar
   */
  async deleteMessage(id: string): Promise<void> {
    const delMessage = await db
      .collection(Collection.MESSAGES)
      .doc(id)
      .delete();
  }

  /**
   * Recupera los mensajes de un canal
   * @param id ID del canal a recuperar sus mensajes
   */
  reciveMessages(id: string, onSnapshot: (messages: Message[]) => void): void {
    db.collection(Collection.MESSAGES)
      .where("uid_usuario", "==", id)
      .onSnapshot(snapshot => {
        onSnapshot(snapshot.docs.map<Message>((doc) => {
          const message = {
            ...doc.data(),
            id: doc.id
          }
          return <Message>message;
        }));
      });
  }
}

export default new MessageService();
