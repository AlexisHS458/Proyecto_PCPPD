import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import InvitationsService from "@/services/inivtations.service";
import { Invitation } from "@/models/invitation";
import inivtationsService from "@/services/inivtations.service";
import { User } from "@/models/user";

/**
 * Modulo de invitaciones a espacios de trabajo
 */
@Module({ namespaced: true })
class InivtationsModule extends VuexModule{
    /**
    * ID del usuario a invitar
    */
    public userID!: string;

    /**
    * Lista de usuarios
    */
    public users: User[] = [];

    /**
    * Estatos de consulta de la invitacion
    */
    public status = {
        loadingInvitations: true,
        loadingUserNamesList: true,
        invitationSent: false,
    };

   

    @Mutation
    public setLoadingStatus(status: boolean): void {
        this.status.loadingInvitations = status;
    }

    @Mutation
    public setUserNamesList(users: Array<User>): void {
        this.users = users;
    }

    @Mutation
    public setLoadingUserNamesStatus(status: boolean): void {
        this.status.loadingUserNamesList = status;
    }

    @Mutation
    public invitationSentSuccess(): void {
        this.status.invitationSent = true;
    }

    @Mutation
    public invitationSentFail(): void {
        this.status.invitationSent = false;
    }

    /**
    * Envia un mensaje al espacion de trabajo y canal especificado.
    * @param userID ID del usuario a invitar
    * @param invitation Invitacion a enviar al usuario
    */
    @Action
    async sendInvitation(invitation: Invitation): Promise<void> {
        return await InvitationsService.sendInivitation(this.userID, invitation)
        .then(() => {
            this.context.commit("invitationSentSuccess");
        })
        .catch(() => {
            this.context.commit("invitationSentFail");
        });
    }

    /**
    * Recupera las invitaciones del usuario
    * @param name nombre del usuario
    */
    @Action
    fetchUserNames(name: string): void{
        this.context.commit("setLoadingUserNamesStatus",true);
        inivtationsService.getUserNames(name, users => {
            this.context.commit("setUserNamesList", users);
            this.context.commit("setLoadingUserNamesStatus",true);
        });
    }

    get isLoadingInvitations(): boolean {
        return this.status.loadingInvitations;
    }
    
    get isLoadingInvitationsInvitationSent(): boolean {
        return this.status.invitationSent;
    }

    get isLoadingUserNames(): boolean {
        return this.status.loadingUserNamesList;
      }

}

export default InivtationsModule;