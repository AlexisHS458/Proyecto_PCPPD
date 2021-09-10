import { db } from "@/utils/firebase";
import { CodeChannel } from "@/models/codeChannel";
import { TextChannel } from "@/models/textChannel";
import { VoiceChannel } from "@/models/voiceChannel";
import { Collection } from "@/utils/collections";

/**
 * Conexión a servicios de información de los canales.
 */
class ChannelsService {
  /**
   * Agrega un nuevo canal de codigo
   * @param codeChannel
   * @returns CodeChannel. Referencia del canal de codigo creado.
   */
  async createCodeChannel(
    workSpaceID: string,
    name: string,
    codeChannel: CodeChannel
  ): Promise<CodeChannel> {
    const codeChannelRef = (await db.collection(Collection.CHANNELS).add(codeChannel)).get();
    return <CodeChannel>(await codeChannelRef).data();
  }

  /**
   * Agrega un nuevo canal de texto
   * @param workSpaceID ID del espacio de trabajo
   * @param textChannel Canal de texto a agregar a la DB
   * @returns TextChannel. Referencia del canal de texto creado.
   */
  async createTextChannel(workSpaceID: string, textChannel: TextChannel): Promise<TextChannel> {
    const textChannelRef = (
      await db
        .collection(Collection.WORK_SPACE)
        .doc(workSpaceID)
        .collection(Collection.TEXT_CHANNEL)
        .add(textChannel)
    ).get();
    return <TextChannel>(await textChannelRef).data();
  }

  /**
   * Edita un canal de texto
   * @param workspaceID ID del espacio de trabajo
   * @param textChannel TextChannel del canal a editar
   */
  async editTextChannel(workspaceID: string, textChannel: TextChannel): Promise<void>{
    await  db.collection(Collection.WORK_SPACE).doc(workspaceID)
      .collection(Collection.TEXT_CHANNEL).doc(textChannel.uid)
      .update(textChannel);
  }

  /**
   * Elimina un canal de texto
   * @param workspaceID ID del espacio de trabajo
   * @param textChannelID ID del canal de texto a eliminar
   */
  async deleteTextChannel(workspaceID: string, textChannelID: string): Promise<void>{
    await db.collection(Collection.WORK_SPACE).doc(workspaceID)
    .collection(Collection.TEXT_CHANNEL).doc(textChannelID)
    .delete();
  }

  /**
   * Agrega un nuevo canal de voz
   * @param voiceChannel
   * @returns CodeChannel. Referencia del canal de voz creado.
   */
  async createVoiceChannel(
    workSpaceID: string,
    name: string,
    voiceChannel: VoiceChannel
  ): Promise<VoiceChannel> {
    const voiceChannelRef = (await db.collection(Collection.CHANNELS).add(voiceChannel)).get();
    return <VoiceChannel>(await voiceChannelRef).data();
  }

  /**
   * Eliminar un un canal existente
   * @param id ID del documento a eliminar
   */
  async deleteChannel(id: string): Promise<void> {
    const delChannel = await db
      .collection(Collection.CHANNELS)
      .doc(id)
      .delete();
  }

  /**
   * Recupera los canales de codigo de un espacio de trabajo
   * @param id ID del espacio de trabajo a recuperar sus canales
   */
  getCodeChannels(id: string, onSnapshot: (codeChannels: CodeChannel[]) => void): void {
    db.collection(Collection.CHANNELS)
      .where("uid_usuario", "==", id)
      .onSnapshot(snapshot => {
        onSnapshot(
          snapshot.docs.map<CodeChannel>(doc => {
            const codeChannel = {
              ...doc.data(),
              id: doc.id
            };
            return <CodeChannel>codeChannel;
          })
        );
      });
  }

  /**
   * Recupera los canales de texto de un espacio de trabajo
   * @param workSpaceID ID del espacio de trabajo a recuperar sus canales
   */
  getTextChannels(workSpaceID: string,
     onSnapshot: (textChannels: TextChannel[]) => void
     ): void {
    db.collection(Collection.WORK_SPACE)
      .doc(workSpaceID)
      .collection(Collection.TEXT_CHANNEL)
      .onSnapshot(snapshot => {
        onSnapshot(
          snapshot.docs.map<TextChannel>(doc => {
            const textChannel = {
              ...doc.data(),
              uid: doc.id
            };
            return <TextChannel>textChannel;
          })
        );
      });
  }

  /**
   * Recupera los canales de voz de un espacio de trabajo
   * @param workSpaceID ID del espacio de trabajo a recuperar sus canales
   */
  getVoiceChannels(workSpaceID: string, onSnapshot: (voiceChannels: VoiceChannel[]) => void): void {
    db.collection(Collection.CHANNELS)
      .doc(workSpaceID)
      .collection(Collection.VOICE_CHANNEL)
      .onSnapshot(snapshot => {
        onSnapshot(
          snapshot.docs.map<VoiceChannel>(doc => {
            const voiceChannel = {
              ...doc.data(),
              id: doc.id
            };
            return <VoiceChannel>voiceChannel;
          })
        );
      });
  }
}

export default new ChannelsService();
