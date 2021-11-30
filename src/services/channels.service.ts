import { db } from "@/utils/firebase";
import { CodeChannel } from "@/models/codeChannel";
import { TextChannel } from "@/models/textChannel";
import { VoiceChannel } from "@/models/voiceChannel";
import { Collection } from "@/utils/collections";
import { ChannelType } from "@/utils/channels_types";
import PermissionsService from "./permissions.service";
import WorkspaceService from "./work_space.service";

/**
 * Conexión a servicios de información de los canales.
 */
class ChannelsService {
  public permisos: string[] = [];

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
  async editTextChannel(workspaceID: string, textChannel: TextChannel): Promise<void> {
    await db
      .collection(Collection.WORK_SPACE)
      .doc(workspaceID)
      .collection(Collection.TEXT_CHANNEL)
      .doc(textChannel.uid)
      .update(textChannel);
  }

  /**
   * Elimina un canal de texto
   * @param workspaceID ID del espacio de trabajo
   * @param textChannelID ID del canal de texto a eliminar
   */
  async deleteTextChannel(workspaceID: string, textChannelID: string): Promise<void> {
    await db
      .collection(Collection.WORK_SPACE)
      .doc(workspaceID)
      .collection(Collection.TEXT_CHANNEL)
      .doc(textChannelID)
      .delete();
  }

  /**
   * Recupera los canales de texto de un espacio de trabajo
   * @param workSpaceID ID del espacio de trabajo a recuperar sus canales
   */
  getTextChannels(workSpaceID: string, onSnapshot: (textChannels: TextChannel[]) => void): void {
    db.collection(Collection.WORK_SPACE)
      .doc(workSpaceID)
      .collection(Collection.TEXT_CHANNEL)
      .onSnapshot(snapshot => {
        onSnapshot(
          snapshot.docs.map<TextChannel>(doc => {
            const textChannel: TextChannel = {
              ...doc.data(),
              uid: doc.id
            } as TextChannel;
            if (textChannel.permisos.length === 0) {
              WorkspaceService.getWorkspaceInfo(workSpaceID).then(value => {
                PermissionsService.AddPermission(workSpaceID, textChannel.uid!, value.usuarios[0]);
              });
            }
            return textChannel;
          })
        );
      });
  }

  async getFirstTextChannelID(workspaceID: string): Promise<string> {
    console.log("entro");

    const snapshot = await db
      .collection(Collection.WORK_SPACE)
      .doc(workspaceID)
      .collection(Collection.TEXT_CHANNEL)
      .get();

    let channelId = ""
    snapshot.forEach(doc => {
      channelId = doc.id  
    });

    return channelId;
    
  }

  /**
   * Agrega un nuevo canal de voz
   * @param workSpaceID ID del espacio de trabajo
   * @param voiceChannel Canal de voz a agregar a la DB
   * @returns VoiceChannel. Referencia del canal de texto creado.
   */
  async createVoiceChannel(workSpaceID: string, voiceChannel: VoiceChannel): Promise<VoiceChannel> {
    const voiceChannelRef = (
      await db
        .collection(Collection.WORK_SPACE)
        .doc(workSpaceID)
        .collection(Collection.VOICE_CHANNEL)
        .add(voiceChannel)
    ).get();
    return <VoiceChannel>(await voiceChannelRef).data();
  }

  /**
   * Edita un canal de voz
   * @param workspaceID ID del espacio de trabajo
   * @param voiceChannel VoiceChannel del canal a editar
   */
  async editVoiceChannel(workspaceID: string, voiceChannel: VoiceChannel): Promise<void> {
    await db
      .collection(Collection.WORK_SPACE)
      .doc(workspaceID)
      .collection(Collection.VOICE_CHANNEL)
      .doc(voiceChannel.uid)
      .update(voiceChannel);
  }

  /**
   * Elimina un canal de voz
   * @param workspaceID ID del espacio de trabajo
   * @param voiceChannelID ID del canal de voz a eliminar
   */
  async deleteVoiceChannel(workspaceID: string, voiceChannelID: string): Promise<void> {
    await db
      .collection(Collection.WORK_SPACE)
      .doc(workspaceID)
      .collection(Collection.VOICE_CHANNEL)
      .doc(voiceChannelID)
      .delete();
  }

  /**
   * Recupera los canales de voz de un espacio de trabajo
   * @param workSpaceID ID del espacio de trabajo a recuperar sus canales
   */
  getVoiceChannels(workSpaceID: string, onSnapshot: (voiceChannels: VoiceChannel[]) => void): void {
    db.collection(Collection.WORK_SPACE)
      .doc(workSpaceID)
      .collection(Collection.VOICE_CHANNEL)
      .onSnapshot(snapshot => {
        onSnapshot(
          snapshot.docs.map<VoiceChannel>(doc => {
            const voiceChannel: VoiceChannel = {
              ...doc.data(),
              uid: doc.id
            } as VoiceChannel;
            if (voiceChannel.permisos.length === 0) {
              WorkspaceService.getWorkspaceInfo(workSpaceID).then(value => {
                PermissionsService.AddVoicePermission(
                  workSpaceID,
                  voiceChannel.uid!,
                  value.usuarios[0]
                );
              });
            }
            return voiceChannel;
          })
        );
      });
  }

  /**
   * Agrega un nuevo canal de codigo
   * @param workSpaceID ID del espacio de trabajo
   * @param codeChannel Canal de codigo a agregar a la DB
   * @returns CodeChannel. Referencia del canal de texto creado.
   */
  async createCodeChannel(workSpaceID: string, codeChannel: CodeChannel): Promise<CodeChannel> {
    const codeChannelRef = (
      await db
        .collection(Collection.WORK_SPACE)
        .doc(workSpaceID)
        .collection(Collection.CODE_CHANNEL)
        .add(codeChannel)
    ).get();
    return <CodeChannel>(await codeChannelRef).data();
  }

  /**
   * Edita un canal de codigo
   * @param workspaceID ID del espacio de trabajo
   * @param codeChannel CodeChannel del canal a editar
   */
  async editCodeChannel(workspaceID: string, codeChannel: CodeChannel): Promise<void> {
    await db
      .collection(Collection.WORK_SPACE)
      .doc(workspaceID)
      .collection(Collection.CODE_CHANNEL)
      .doc(codeChannel.uid)
      .update(codeChannel);
  }

  /**
   * Elimina un canal de codigo
   * @param workspaceID ID del espacio de trabajo
   * @param codeChannelID ID del canal de codigo a eliminar
   */
  async deleteCodeChannel(workspaceID: string, codeChannelID: string): Promise<void> {
    await db
      .collection(Collection.WORK_SPACE)
      .doc(workspaceID)
      .collection(Collection.CODE_CHANNEL)
      .doc(codeChannelID)
      .delete();
  }

  /**
   * Recupera los canales de codigo de un espacio de trabajo
   * @param workSpaceID ID del espacio de trabajo a recuperar sus canales
   */
  getCodeChannels(workSpaceID: string, onSnapshot: (codeChannels: CodeChannel[]) => void): void {
    db.collection(Collection.WORK_SPACE)
      .doc(workSpaceID)
      .collection(Collection.CODE_CHANNEL)
      .onSnapshot(snapshot => {
        onSnapshot(
          snapshot.docs.map<CodeChannel>(doc => {
            const codeChannel: CodeChannel = {
              ...doc.data(),
              uid: doc.id
            } as CodeChannel;
            if (codeChannel.permisos.length === 0) {
              WorkspaceService.getWorkspaceInfo(workSpaceID).then(value => {
                PermissionsService.AddCodePermission(
                  workSpaceID,
                  codeChannel.uid!,
                  value.usuarios[0]
                );
              });
            }
            return <CodeChannel>codeChannel;
          })
        );
      });
  }

  async getChannelName(
    type: ChannelType,
    workspaceUID: string,
    channelUID: string
  ): Promise<string> {
    switch (type) {
      case ChannelType.TEXT: {
        const snapshot = await db
          .collection(Collection.WORK_SPACE)
          .doc(workspaceUID)
          .collection(Collection.TEXT_CHANNEL)
          .doc(channelUID)
          .get();
        return (<TextChannel>snapshot.data()).nombre;
      }
      case ChannelType.VOICE: {
        const snapshot = await db
          .collection(Collection.WORK_SPACE)
          .doc(workspaceUID)
          .collection(Collection.VOICE_CHANNEL)
          .doc(channelUID)
          .get();
        return (<VoiceChannel>snapshot.data()).nombre;
      }
      case ChannelType.CODE: {
        const snapshot = await db
          .collection(Collection.WORK_SPACE)
          .doc(workspaceUID)
          .collection(Collection.CODE_CHANNEL)
          .doc(channelUID)
          .get();
        const codeData = <CodeChannel>snapshot.data();

        return codeData.nombre;
      }
      default: {
        return "";
      }
    }
  }

  async getUsersInChannel(
    UserUID: string,
    type: ChannelType,
    workspaceUID: string,
    channelUID: string
  ): Promise<boolean> {
    switch (type) {
      case ChannelType.TEXT:
        {
          const snapshot = await db
            .collection(Collection.WORK_SPACE)
            .doc(workspaceUID)
            .collection(Collection.TEXT_CHANNEL)
            .doc(channelUID)
            .get();
          this.permisos = (<TextChannel>snapshot.data()).permisos;
        }
        break;
      case ChannelType.VOICE:
        {
          const snapshot = await db
            .collection(Collection.WORK_SPACE)
            .doc(workspaceUID)
            .collection(Collection.VOICE_CHANNEL)
            .doc(channelUID)
            .get();
          this.permisos = (<VoiceChannel>snapshot.data()).permisos;
        }
        break;
      case ChannelType.CODE:
        {
          const snapshot = await db
            .collection(Collection.WORK_SPACE)
            .doc(workspaceUID)
            .collection(Collection.CODE_CHANNEL)
            .doc(channelUID)
            .get();
          const codeData = <CodeChannel>snapshot.data();
          this.permisos = codeData.permisos;
        }
        break;
      default: {
        this.permisos = [];
      }
    }
    const hasAccess = this.permisos.find(UID => UID === UserUID);

    if (hasAccess) {
      return true;
    } else {
      return false;
    }
  }
}

export default new ChannelsService();
