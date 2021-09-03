import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import MessageService from '@/services/message.service';
import { TextChannel } from "@/models/textChannel";
import { Message } from "@/models/message";




/**
 * Moduelo de acceso a información de un canal de texto
 */
@Module({namespaced: true})
class TextChannelModule extends VuexModule{
 
    /**
     * Lista de mensajes dentro del canal de texto
     */
    public messages: Message[] = [];

    /**
     * Estatos de consulta del canal de texto
     */
    public status = {
        loadingMessages: true,
        messageSent: false
    }


    @Mutation 
    public setMessages(messages: Array<Message>): void{
        this.messages = messages;
    }

    @Mutation
    public setLoadingStatus(status: boolean){
        this.status.loadingMessages = status;
    }

    @Mutation
    public messageSentSuccess(){
        this.status.messageSent = true;
    }
    @Mutation
    public messageSentFail(){
        this.status.messageSent = false;
    }


    /**
     * Envia un mensaje al espacion de trabajo y canal especificado.
     * @param workspaceID ID del espacio de trabajo correspondiente
     * @param textChannelID ID del canal de texto
     * @param message Mensaje a enviar al canal de texto
     */
    @Action
    async sendMessage(workspaceID: string, textChannelID: string, message: Message): Promise<void>{
        return await MessageService.sendMessage(workspaceID,textChannelID,message)
            .then(()=>{
                this.context.commit("messageSentSuccess");
            })
            .catch(()=>{
                this.context.commit("messageSentFail");
            });
    }


    /**
     * Recupera los mensajes dentro del canal de texto
     * @param workspaceID ID del espacio de trabajo a consultar
     * @param textChannelID  ID del canal de texto a consultar
     */
    @Action
    fetchMesages(workspaceID: string, textChannelID: string){
        this.context.commit("setLoadingStatus", true);
        MessageService.reciveMessages(workspaceID,textChannelID, messages => {
            this.context.commit("setMessages",messages);
            this.context.commit("setLoadingStatus", false);
        });

    }






}

export default TextChannelModule;