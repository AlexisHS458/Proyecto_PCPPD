import { db } from "@/utils/firebase";
import { Message } from "@/models/message";
import { Collection } from "@/utils/collections";
import { storage } from "@/utils/firebase";
import WorkspaceService from "./work_space.service";

/**
 * Conexión a servicios de información de los espacios de trabajo.
 */
class MessageService {
  public MAX_SIZE = 150000000;
  /**
   * Agrega un nuevo mensaje
   * @param workspaceID ID del espacio de trabajo correspondiente
   * @param textChannelID ID del canal de texto
   * @param message Mensaje a enviar al canal de texto
   * @returns Message. Referencia del mensaje creado.
   */
  async sendMessage(
    workspaceID: string,
    textChannelID: string,
    message: Message
  ): Promise<Message> {
    const messageRef = (
      await db
        .collection(Collection.WORK_SPACE)
        .doc(workspaceID)
        .collection(Collection.TEXT_CHANNEL)
        .doc(textChannelID)
        .collection(Collection.MESSAGES)
        .add(message)
    )
      .get()
      .then(data => {
        data.id;

        return data;
      });

    return <Message>(await messageRef).data();
  }

  /**
   * Agrega un nuevo mensaje de archivo
   * @param workspaceID ID del espacio de trabajo correspondiente
   * @param textChannelID ID del canal de texto
   * @param message Mensaje a enviar al canal de texto
   * @param file Archivo a enviar
   * @returns Message. Referencia del mensaje creado.
   */
  async sendMessageFile(
    workspaceID: string,
    textChannelID: string,
    message: Message,
    file: File
  ): Promise<Message> {
    const workspace = await WorkspaceService.getWorkspaceInfo(workspaceID);

    if (workspace.almacenamiento + file.size < this.MAX_SIZE) {
      const messageRef = (
        await db
          .collection(Collection.WORK_SPACE)
          .doc(workspaceID)
          .collection(Collection.TEXT_CHANNEL)
          .doc(textChannelID)
          .collection(Collection.MESSAGES)
          .add(message)
      )
        .get()
        .then(async data => {
          const message = <Message>data.data();

          const storageRef = storage.ref();
          const fileRef = storageRef.child(data.id);
          await fileRef.put(file);
          const metaData = await fileRef.getMetadata();
          const fileURL = await fileRef.getDownloadURL();

          message.nombreArchivo = file.name;
          message.contentType = metaData.contentType;
          message.contenido = fileURL;
          message.uid = data.id;

          await this.editMessage(workspaceID, textChannelID, message);
          await WorkspaceService.updateWorkspaceStorage(workspaceID, true, file.size);

          return data;
        });
      return <Message>(await messageRef).data();
    } else {
      throw new Error(
        "Lo sentimos. El espacio de trabajo ha llegado al máximo de almacenamiento permitido (150 MB). Borra algunos archivos para poder continuar."
      );
    }
  }

  /**
   * Editar un mensaje existente
   * @param workspaceID ID del espacio de trabajo correspondiente
   * @param textChannelID ID del canal de texto
   * @param message Mensaje a enviar al canal de texto
   */
  async editMessage(workspaceID: string, textChannelID: string, message: Message): Promise<void> {
    await db
      .collection(Collection.WORK_SPACE)
      .doc(workspaceID)
      .collection(Collection.TEXT_CHANNEL)
      .doc(textChannelID)
      .collection(Collection.MESSAGES)
      .doc(message.uid)
      .update(message);
  }

  /**
   * Eliminar un mensaje existente
   * @param workspaceID ID del espacio de trabajo correspondiente
   * @param textChannelID ID del canal de texto
   * @param messageID ID del documento a eliminar
   */
  async deleteMessage(workspaceID: string, textChannelID: string, message: Message): Promise<void> {
    await db
      .collection(Collection.WORK_SPACE)
      .doc(workspaceID)
      .collection(Collection.TEXT_CHANNEL)
      .doc(textChannelID)
      .collection(Collection.MESSAGES)
      .doc(message.uid)
      .delete();

    if (message.isFile) {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(message.uid!);
      const fileMeta = await fileRef.getMetadata();
      await fileRef.delete();
      WorkspaceService.updateWorkspaceStorage(workspaceID, true, -fileMeta.size);
    }
  }

  /**
   * Recupera los mensajes de un canal
   * @param workspaceID ID del espacio de trabajo correspondiente
   * @param textChannelID ID del canal de texto
   */
  reciveMessages(
    workspaceID: string,
    textChannelID: string,
    onSnapshot: (messages: Message[]) => void
  ): void {
    db.collection(Collection.WORK_SPACE)
      .doc(workspaceID)
      .collection(Collection.TEXT_CHANNEL)
      .doc(textChannelID)
      .collection(Collection.MESSAGES)
      .orderBy("fecha")
      .onSnapshot(snapshot => {
        onSnapshot(
          snapshot.docs.map<Message>(doc => {
            const message = {
              ...doc.data(),
              uid: doc.id
            };
            return <Message>message;
          })
        );
      });
  }
}

export default new MessageService();
