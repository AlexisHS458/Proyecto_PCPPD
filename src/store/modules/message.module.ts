import { Message } from "@/models/message";
import MessageService from "@/services/message.service";
import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import UserModule from "./user.module";

/**
 * Modulo de acceso a información de mensajes de un canal
 *
 */
@Module({ namespaced: true })
class MessageModule extends VuexModule {
  /**
   * Lista de los mensajes del canal.
   */
  public messagesList: Message[] = [];

  /**
   * Status de los mensajes
   * @param loadingList T: Si la lista esta cargando, F: si ya está cargada
   * @param sentMessage T: Si se envio un nuevo mensaje, F: Si no se envio
   * @param deletedMessage T: Si se elimino el mensaje, F: Si no se elimino
   */
  public status = {
    loadingList: true,
    sentMessage: false,
    deletedMessage: false
  };

  @Mutation
  public setMessage(messages: Message[]): void {
    this.messagesList = messages;
  }

  @Mutation
  public setLoadingStatus(status: boolean): void {
    this.status.loadingList = status;
  }

  @Mutation
  public setMessagesList(messages: Array<Message>) {
    this.messagesList = messages;
  }

  @Mutation
  public addMessageToList(message: Message) {
    const lastState = this.messagesList;
    lastState.push(message);
    this.messagesList = lastState;
  }

  @Mutation
  public sentMessageSuccess(): void {
    this.status.sentMessage = true;
  }

  @Mutation
  public sentMessageFailure(): void {
    this.status.sentMessage = false;
  }

  @Mutation
  public deleteMessageSuccess(): void {
    this.status.deletedMessage = true;
  }

  @Mutation
  public deleteMessageFailure(): void {
    this.status.deletedMessage = false;
  }


  /**
   * Elimina un mensaje
   * @param id ID de documento del mensaje
   * @returns
   */
  @Action
  async deletedMessage(id: string): Promise<void> {
    return await MessageService.deleteMessage(id)
      .then(() => {
        this.context.commit("deleteWorkSpaceSuccess");
      })
      .catch(() => {
        this.context.commit("deleteWorkSpaceFailure");
      });
  }


  get isLoadingList(): boolean {
    return this.status.loadingList;
  }

  get isSentMessage(): boolean {
    return this.status.sentMessage;
  }

  get messagessList(): Message[]{
    return this.messagesList;
  }
}

export default MessageModule;
