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

  public workspaceID!: string;

  /**
   * ID del canal de texto a consultar
   */
  public textChannelID!: string;

  /**
   * Mensaje a mostrar en snackbar
   */
  public snackbarMessage = "";

  /**
   * Mensaje a mostrar error en snackbar
   */
  public snackbarMessageError = "";

  /**
   * Estado de consulta de archivos
   */
  public isLoadingFile: string[] = [];

  /**
   * Estatos de consulta del canal de texto
   */
  public status = {
    loadingMessages: true,
    messageSent: false,
    messageEdited: false,
    messageDeleted: false,
    showSnackbar: false,
    showSnackbarError: false
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

  @Mutation
  public setSnackBarMessage(message: string): void {
    this.snackbarMessage = message;
  }

  @Mutation
  public setSnackBarMessageError(message: string): void {
    this.snackbarMessageError = message;
  }

  @Mutation
  public setShowSnackBarMessage(status: boolean): void {
    this.status.showSnackbar = status;
  }

  @Mutation
  public setShowSnackBarMessageError(status: boolean): void {
    this.status.showSnackbarError = status;
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
        this.context.commit("setSnackBarMessageError", "Error al enviar mensaje");
        this.context.commit("setShowSnackBarMessageError", true);
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
        this.context.commit("setSnackBarMessage", "Mensaje editado correctamente");
        this.context.commit("setShowSnackBarMessage", true);
      })
      .catch(() => {
        this.context.commit("messageEditedFail");
        this.context.commit("setSnackBarMessageError", "Error al editar mensaje");
        this.context.commit("setShowSnackBarMessageError", true);
      });
  }

  /**
   * Eliminar un mensaje del espacion de trabajo y canal especificado.
   * @param id  del documento a eliminar
   */
  @Action
  async deleteMessage(message: Message): Promise<void> {
    return await MessageService.deleteMessage(this.workspaceID, this.textChannelID, message)
      .then(() => {
        this.context.commit("messageDeletedSuccess");
        this.context.commit("setSnackBarMessage", "Mensaje eliminado correctamente");
        this.context.commit("setShowSnackBarMessage", true);
      })
      .catch(() => {
        this.context.commit("messageDeletedFail");
        this.context.commit("setSnackBarMessageError", "Error al eliminar mensaje");
        this.context.commit("setShowSnackBarMessageError", true);
      });
  }

  /*@Action
  async uploadFile(data: {
    workspaceID: string;
    textChannelID: string;
    message: Message;
    file: File;
  }): Promise<void> {

    const message=
    await MessageService.sendMessageFile(
      data.workspaceID,
      data.textChannelID,
      data.message,
      data.file
    );
  }*/

  /**
   * Recupera los mensajes dentro del canal de texto
   * @param workspaceID ID del espacio de trabajo a consultar
   * @param textChannelID  ID del canal de texto a consultar
   */
  @Action
  fetchMesages(callBack: () => void) {
    this.context.commit("setLoadingStatus", true);
    let isFirst = true;
    MessageService.reciveMessages(this.workspaceID, this.textChannelID, messages => {
      this.context.commit("setMessages", messages);
      this.context.commit("setLoadingStatus", false);
      if (isFirst) {
        callBack();
        isFirst = false;
      }
    });
  }

  /**
   * Coloca un mensaje en el snackbar
   * @param message mensaje a mostrar en el snackbar
   */
  @Action
  setMessageOnSnackbar(message: string): void {
    this.context.commit("setSnackBarMessage", message);
  }

  /**
   * Hace visible el snackbar
   */
  @Action
  setVisibleSnackBar(): void {
    this.context.commit("setShowSnackBarMessage", true);
  }

  /**
   * Hace visible el snackbar de error
   */
  @Action
  setVisibleSnackBarError(): void {
    this.context.commit("setShowSnackBarMessageError", true);
  }

  /**
   * Hace no visible el snackbar
   */
  @Action
  setNotVisibleSnackBar(): void {
    this.context.commit("setShowSnackBarMessage", false);
  }

  /**
   * Hace no visible el snackbar de error
   */
  @Action
  setNotVisibleSnackBarError(): void {
    this.context.commit("setShowSnackBarMessageError", false);
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

  get showSnackbar(): boolean {
    return this.status.showSnackbar;
  }
}

export default TextChannelModule;
