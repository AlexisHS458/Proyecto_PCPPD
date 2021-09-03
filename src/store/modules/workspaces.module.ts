import { Workspace } from "@/models/workspace";
import WorkSpaceService from "@/services/work_space.service";
import { CodeChannel } from "@/models/codeChannel";
import { TextChannel } from "@/models/textChannel";
import { VoiceChannel } from "@/models/voiceChannel";
import ChannelService from "@/services/channel.service";
import { ChannelsTypes } from "@/utils/channelsTypes";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

/**
 * Modulo de acceso a información de un solo espacio de trabajo
 */
@Module({ namespaced: true })
class WorkspaceModule extends VuexModule {
  /**
   * Espacio de trabajo
   */
  public workspace?: Workspace = undefined;

  /**
   * Status de la consulta del espacio de trabajo
   */
  public status = {
    loadingWorkspace: true
  };

  @Mutation
  public setMyWorkspace(workspace: Workspace): void {
    this.workspace = workspace;
  }

  @Mutation
  public setLoadingStatus(status: boolean): void {
    this.status.loadingWorkspace = status;
  }

  /**
   * Consulta la información de un espacio de trabajo.
   * @param uid ID único del espacio de trabajo a consultar
   */
  @Action
  async fetchMyWorkspace(uid: string): Promise<void> {
    this.context.commit("setLoadingStatus", true);
    const workspace = await WorkSpaceService.getWorkspaceInfo(uid);
    ChannelService.getTextChannels(uid, textChannels => {
      workspace.canales_texto = textChannels;
      this.context.commit("setLoadingStatus", false);
      this.context.commit("setMyWorkspace", workspace);
    });
  }

  /*
  createChannel(uid: string, name: string, type: ChannelsTypes, channel:CodeChannel){
    switch(type){
      case ChannelsTypes.CODE: {
          ChannelService.createCodeChannel(codeChannel).then(() => {
            this.context.commit("createWorkSpaceSuccess");
          })
      break;
      }
      case ChannelsTypes.TEXT: {
        uid: 
      break;
      }
      case ChannelsTypes.VOICE: {
       uid: 
      break;
      }
    }
  }
  */

  get isLoadingMyWorkspace(): boolean {
    return this.status.loadingWorkspace;
  }

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
   public channelStatus = {
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
   public setLoadingChannelStatus(status: boolean): void {
     this.channelStatus.loadingList = status;
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
     this.channelStatus.createdChannel = true;
   }
 
   @Mutation
   public createChannelFailure(): void {
     this.channelStatus.createdChannel = false;
   }
 
   @Mutation
   public deleteChannelSuccess(): void {
     this.channelStatus.deletedChannel = true;
   }
 
   @Mutation
   public deleteChannelFailure(): void {
     this.channelStatus.deletedChannel = false;
   }
 
   /**
    * Agrega un canal de codigo a la db
    * @param codeChannel canal de codigo a agregar
    */
   @Action
   async addCodeChannel(workSpaceID: string, name: string, codeChannel: CodeChannel, ) {
     return await ChannelService.createCodeChannel(workSpaceID, name, codeChannel)
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
    async addtextChannel(workSpaceID: string, name: string, textChannel: TextChannel) {
      return await ChannelService.createTextChannel(workSpaceID, name, textChannel)
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
   async addVoiceChannel(workSpaceID: string, name: string, voiceChannel: VoiceChannel) {
     return await ChannelService.createVoiceChannel(workSpaceID, name, voiceChannel)
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
    * Recupera los canales de texto de un espacio de trabajo
    * @param workSpaceID ID del espacio de trabajo
    */
   @Action
   fetchTextChannels(workSpaceID: string): void {
     this.context.commit("setLoadingStatus", true);
     ChannelService.getTextChannels(workSpaceID, textChannels => {
       this.context.commit("setTextChannels", textChannels);
       this.context.commit("setLoadingStatus", false);
     });
   }
 
   /**
    * Recupera los canales de voz de un espacio de trabajo
    * @param workSpaceID ID del espacio de trabajo
    */
   @Action
   fetchVoiceChannels(workSpaceID: string): void {
     this.context.commit("setLoadingStatus", true);
     ChannelService.getTextChannels(workSpaceID, voiceChannels => {
       this.context.commit("setVoiceChannels", voiceChannels);
       this.context.commit("setLoadingStatus", false);
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
     return this.channelStatus.loadingList;
   }
 
   get isCreatedChannel(): boolean {
     return this.channelStatus.createdChannel;
   }
 
   get codeChannelList(): CodeChannel[] {
     return this.codeChannelsList;
   }
 
   get textChannelList(): TextChannel[] {
     return this.textChannelsList;
   }
 
   get voiceChannelList(): VoiceChannel[] {
     return this.voiceChannelsList;
   }
}

export default WorkspaceModule;
