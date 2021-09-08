import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import MessageService from "@/services/message.service";
import { Message } from "@/models/message";

/**
 * Moduelo de acceso a información de un canal de texto
 */
@Module({ namespaced: true })
class TextChannelModule extends VuexModule {
  /**
   * Lista de mensajes dentro del canal de texto
   */
  public messages: Message[] = [];

  /**
   * ID del espacio de trabajo a consultar
   */
  /**
   * ID del espacio de trabajo a consultar
   */

  public workspaceID!: string;

  /**
   * ID del canal de texto a consultar
   */
  public textChannelID!: string;

  /**
   * Estatos de consulta del canal de texto
   */
  public status = {
    loadingMessages: true,
    messageSent: false,
    messageEdited: false,
    messageDeleted: false
  };

  @Mutation
  public setMessages(messages: Array<Message>): void {
    this.messages = messages;
  }

  @Mutation
  public setLoadingStatus(status: boolean): void {
    this.status.loadingMessages = status;
  }

  @Mutation
  public messageSentSuccess(): void {
    this.status.messageSent = true;
  }

  @Mutation
  public messageSentFail(): void {
    this.status.messageSent = false;
  }

  @Mutation
  public messageEditedSuccess(): void {
    this.status.messageEdited = true;
  }

  @Mutation
  public messageEditedFail(): void {
    this.status.messageEdited = false;
  }

  @Mutation
  public messageDeletedSuccess(): void {
    this.status.messageDeleted = true;
  }

  @Mutation
  public messageDeletedFail(): void {
    this.status.messageDeleted = false;
  }

  @Mutation
  public setWorkspaceID(workspaceID: string): void {
    this.workspaceID = workspaceID;
  }

  @Mutation
  public setTextChannelID(textChannelID: string): void {
    this.textChannelID = textChannelID;
  }

  /**
   * Coloca el ID del espacio de trabajo
   * @param id ID del workspase
   */
  @Action
  setTextChannelIDtoModule(id: string) {
    this.context.commit("setWorkspaceID", id);
  }

  /**
   * Coloca el ID del canal de texto
   * @param id ID del workspase
   */
  @Action
  setWorkspaceIDtoModule(id: string) {
    this.context.commit("setTextChannelID", id);
  }

  /**
   * Envia un mensaje al espacion de trabajo y canal especificado.
   * @param message Mensaje a enviar al canal de texto
   */
  @Action
  async sendMessage(message: Message): Promise<void> {
    return await MessageService.sendMessage(this.workspaceID, this.textChannelID, message)
      .then(() => {
        this.context.commit("messageSentSuccess");
      })
      .catch(() => {
        this.context.commit("messageSentFail");
      });
  }

  /**
   * Editar un mensaje del espacion de trabajo y canal especificado.
   * @param message Mensaje a editar del canal de texto
   */
   @Action
   async editMessage(message: Message): Promise<void> {
     return await MessageService.editMessage(this.workspaceID, this.textChannelID, message)
       .then(() => {
         this.context.commit("messageEditedSuccess");
       })
       .catch(() => {
         this.context.commit("messageEditedFail");
       });
   }

   /**
   * Eliminar un mensaje del espacion de trabajo y canal especificado.
   * @param id  del documento a eliminar
   */
  @Action
  async deleteMessage(id: string): Promise<void> {
    return await MessageService.deleteMessage(this.workspaceID, this.textChannelID, id)
      .then(() => {
        this.context.commit("messageDeletedSuccess");
      })
      .catch(() => {
        this.context.commit("messageDeletedFail");
      });
  }

  /**
   * Recupera los mensajes dentro del canal de texto
   * @param workspaceID ID del espacio de trabajo a consultar
   * @param textChannelID  ID del canal de texto a consultar
   */
  @Action
  fetchMesages() {
    this.context.commit("setLoadingStatus", true);
    MessageService.reciveMessages(this.workspaceID, this.textChannelID, messages => {
      this.context.commit("setMessages", messages);
      this.context.commit("setLoadingStatus", false);
    });
  }

  get isLoadingMessages(): boolean {
    return this.status.loadingMessages;
  }

  get isLoadingMessagesMessageSent(): boolean {
    return this.status.messageSent;
  }

  get isLoadingMessagesMessageEdited(): boolean {
    return this.status.messageEdited;
  }

  get isLoadingMessagesMessageDeleted(): boolean {
    return this.status.messageDeleted;
  }
}

export default TextChannelModule;
