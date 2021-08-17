import { CodeChannel } from "@/models/codeChannel";
import { TextChannel } from "@/models/textChannel";
import { VoiceChannel } from "@/models/voiceChannel";
import ChannelService from "@/services/channel.service";
import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";

/**
* Modulo de acceso a información de canales de un espacio de trabajo
*
*/
@Module({ namespaced: true })
class ChannelModule extends VuexModule {
    /**
    * Lista de los canales de codigo del espacio de trabajo.
    */
    public codeChannelsList: CodeChannel[] = [];

    /**
    * Lista de los canales de texto del espacio de trabajo.
    */
    public textChannelsList: TextChannel[] = [];

    /**
    * Lista de los canales de voz del espacio de trabajo.
    */
    public voiceChannelsList: VoiceChannel[] = [];

  /**
   * Status de los canales
   * @param loadingList T: Si la lista esta cargando, F: si ya está cargada
   * @param createdChannel T: Si se creó un nuevo canal, F: Si no se creó
   * @param deletedChannel T: Si se elimino el canal, F: Si no se elimino
   */
  public status = {
    loadingList: true,
    createdChannel: false,
    deletedChannel: false
  };

  @Mutation
  public setCodeChannels(codeChannels: CodeChannel[]): void {
    this.codeChannelsList = codeChannels;
  }

  @Mutation
  public setTextChannels(textChannels: TextChannel[]): void {
    this.textChannelsList = textChannels;
  }

  @Mutation
  public setVoiceChannels(voiceChannels: VoiceChannel[]): void {
    this.voiceChannelsList = voiceChannels;
  }

  @Mutation
  public setLoadingStatus(status: boolean): void {
    this.status.loadingList = status;
  }

  @Mutation
  public setCodeChannelList(codeChannels: Array<CodeChannel>) {
    this.codeChannelsList = codeChannels;
  }

  @Mutation
  public setTextChannelList(textChannels: Array<TextChannel>) {
    this.textChannelsList = textChannels;
  }

  @Mutation
  public setVoiceChannelList(voiceChannels: Array<VoiceChannel>) {
    this.voiceChannelsList = voiceChannels;
  }

  @Mutation
  public addCodeChannelToList(codeChannel: CodeChannel) {
    const lastState = this.codeChannelsList;
    lastState.push(codeChannel);
    this.codeChannelsList = lastState;
  }

  @Mutation
  public addTextChannelToList(textChannel: TextChannel) {
    const lastState = this.textChannelsList;
    lastState.push(textChannel);
    this.textChannelsList = lastState;
  }

  @Mutation
  public addVoiceChannelToList(voiceChannel: VoiceChannel) {
    const lastState = this.voiceChannelsList;
    lastState.push(voiceChannel);
    this.voiceChannelsList = lastState;
  }

  @Mutation
  public createChannelSuccess(): void {
    this.status.createdChannel = true;
  }

  @Mutation
  public createChannelFailure(): void {
    this.status.createdChannel = false;
  }

  @Mutation
  public deleteChannelSuccess(): void {
    this.status.deletedChannel = true;
  }

  @Mutation
  public deleteChannelFailure(): void {
    this.status.deletedChannel = false;
  }

  /**
   * Agrega un canal de codigo a la db
   * @param codeChannel canal de codigo a agregar
   */
  @Action
  async addCodeChannel(codeChannel: CodeChannel) {
    return await ChannelService.createCodeChannel(codeChannel)
      .then(() => {
        this.context.commit("createChannelSuccess");
      })
      .catch(() => {
        this.context.commit("createChannelFailure");
      });
  }

  /**
   * Agrega un canal de texto a la db
   * @param textChannel canal de texto a agregar
   */
   @Action
   async addtextChannel(textChannel: TextChannel) {
     return await ChannelService.createTextChannel(textChannel)
       .then(() => {
         this.context.commit("createChannelSuccess");
       })
       .catch(() => {
         this.context.commit("createChannelFailure");
       });
   }
  
   /**
   * Agrega un canal de voz a la db
   * @param voiceChannel canal de voz a agregar
   */
  @Action
  async addVoiceChannel(voiceChannel: VoiceChannel) {
    return await ChannelService.createVoiceChannel(voiceChannel)
      .then(() => {
        this.context.commit("createChannelSuccess");
      })
      .catch(() => {
        this.context.commit("createChannelFailure");
      });
  }

  /**
   * Elimina un canal
   * @param id ID de documento del canal (Channel.uid)
   * @returns
   */
  @Action
  async deletedChannel(id: string): Promise<void> {
    return await ChannelService.deleteChannel(id)
      .then(() => {
        this.context.commit("deleteChannelSuccess");
      })
      .catch(() => {
        this.context.commit("deleteChannelFailure");
      });
  }

  /**
   * Recupera los canales de un espacio de trabajo
   * @param id ID del espacio de trabajo
   */
  @Action
  fetchChannels(id: string): void {
    this.context.commit("setLoadingStatus", true);
    ChannelService.getCodeChannels(id, codeChannels => {
      this.context.commit("setWorkSpacesList", codeChannels);
      this.context.commit("setLoadingStatus", false);
    });
    ChannelService.getTextChannels(id, textChannels => {
        this.context.commit("setWorkSpacesList", textChannels);
        this.context.commit("setLoadingStatus", false);
    });
    ChannelService.getVoiceChannels(id, voiceChannels => {
        this.context.commit("setWorkSpacesList", voiceChannels);
        this.context.commit("setLoadingStatus", false);
    });
  }

  get isLoadingList(): boolean {
    return this.status.loadingList;
  }

  get isCreatedChannel(): boolean {
    return this.status.createdChannel;
  }

  get codeChannelList(): CodeChannel[]{
    return this.codeChannelsList;
  }

  get textChannelList(): TextChannel[]{
    return this.textChannelsList;
  }

  get voiceChannelList(): VoiceChannel[]{
    return this.voiceChannelsList;
  }
}

export default ChannelModule;
