import { db } from "@/utils/firebase";
import { CodeChannel } from "@/models/codeChannel";
import { TextChannel } from "@/models/textChannel";
import { VoiceChannel } from "@/models/voiceChannel";
import { Collection } from "@/utils/collections";

/**
 * Conexión a servicios de información de los canales.
 */
class ChannelService {
  /**
   * Agrega un nuevo canal de codigo
   * @param codeChannel
   * @returns CodeChannel. Referencia del canal de codigo creado.
   */
  async createCodeChannel(codeChannel: CodeChannel): Promise<CodeChannel> {
    const codeChannelRef = (await db.collection(Collection.CHANNELS).add(codeChannel)).get();
    return <CodeChannel>(await codeChannelRef).data();
  }

  /**
   * Agrega un nuevo canal de texto
   * @param textChannel
   * @returns CodeChannel. Referencia del canal de texto creado.
   */
   async createTextChannel(textChannel: TextChannel): Promise<TextChannel> {
    const textChannelRef = (await db.collection(Collection.CHANNELS).add(textChannel)).get();
    return <TextChannel>(await textChannelRef).data();
  }

  /**
   * Agrega un nuevo canal de voz
   * @param voiceChannel
   * @returns CodeChannel. Referencia del canal de voz creado.
   */
   async createVoiceChannel(voiceChannel: VoiceChannel): Promise<VoiceChannel> {
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
        onSnapshot(snapshot.docs.map<CodeChannel>((doc) => {
          const codeChannel = {
            ...doc.data(),
            id: doc.id
          }
          return <CodeChannel>codeChannel;
        }));
      });
  }

  /**
   * Recupera los canales de texto de un espacio de trabajo
   * @param uid ID del espacio de trabajo a recuperar sus canales
   */
   getTextChannels(uid: string, onSnapshot: (textChannels: TextChannel[]) => void): void {
    db.collection(Collection.CHANNELS)
      .where("uid_usuario", "==", uid)
      .onSnapshot(snapshot => {
        onSnapshot(snapshot.docs.map<TextChannel>((doc) => {
          const textChannel = {
            ...doc.data(),
            id: doc.id
          }
          return <TextChannel>textChannel;
        }));
      });
  }

  /**
   * Recupera los canales de voz de un espacio de trabajo
   * @param uid ID del espacio de trabajo a recuperar sus canales
   */
   getVoiceChannels(uid: string, onSnapshot: (voiceChannels: VoiceChannel[]) => void): void {
    db.collection(Collection.CHANNELS)
      .where("uid_usuario", "==", uid)
      .onSnapshot(snapshot => {
        onSnapshot(snapshot.docs.map<VoiceChannel>((doc) => {
          const voiceChannel = {
            ...doc.data(),
            id: doc.id
          }
          return <VoiceChannel>voiceChannel;
        }));
      });
  }
}

export default new ChannelService();
