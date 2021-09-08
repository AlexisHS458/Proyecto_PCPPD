import { db } from "@/utils/firebase";
import { Message } from "@/models/message";
import { Collection } from "@/utils/collections";

/**
 * Conexión a servicios de información de los espacios de trabajo.
 */
class MessageService {
  /**
   * Agrega un nuevo mensaje
   * @param workspaceID ID del espacio de trabajo correspondiente
   * @param textChannelID ID del canal de texto
   * @param message Mensaje a enviar al canal de texto
   * @returns Message. Referencia del mensaje creado.
   */
  async sendMessage(workspaceID: string, textChannelID: string, message: Message): Promise<Message> {
    const messageRef = (await db.collection(Collection.WORK_SPACE).doc(workspaceID)
      .collection(Collection.TEXT_CHANNEL).doc(textChannelID)
      .collection(Collection.MESSAGES).add(message)).get();

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
   * @param workspaceID ID del espacio de trabajo correspondiente
   * @param textChannelID ID del canal de texto
   */
  reciveMessages(workspaceID: string, textChannelID: string, onSnapshot: (messages: Message[]) => void): void {
    db.collection(Collection.WORK_SPACE).doc(workspaceID)
    .collection(Collection.TEXT_CHANNEL).doc(textChannelID)
    .collection(Collection.MESSAGES).orderBy("fecha")
      .onSnapshot(snapshot => {
        onSnapshot(snapshot.docs.map<Message>((doc) => {
          const message = {
            ...doc.data(),
            uid: doc.id
          }
          return <Message>message;
        }));
      });
  }
}

export default new MessageService();
