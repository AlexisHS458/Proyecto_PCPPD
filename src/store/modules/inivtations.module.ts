import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";
import InvitationsService from "@/services/inivtations.service";
import { Invitation } from "@/models/invitation";

/**
 * Modulo de invitaciones a espacios de trabajo
 */
@Module({ namespaced: true })
class InivtationsModule extends VuexModule{

    /**
    * Lista de invitaciones
    */
    public invitations: Invitation[] = [];

    /**
    * ID del usuario a invitar
    */
    public userID!: string;

    /**
    * Estatos de consulta de la invitacion
    */
    public status = {
        loadingInvitations: true,
        invitationSent: false,
    };

    @Mutation
    public setInvitations(messages: Array<Invitation>): void {
        this.invitations = messages;
    }

    @Mutation
    public setLoadingStatus(status: boolean): void {
        this.status.loadingInvitations = status;
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

    get isLoadingInvitations(): boolean {
        return this.status.loadingInvitations;
    }
    
    get isLoadingInvitationsInvitationSent(): boolean {
        return this.status.invitationSent;
    }

}

export default InivtationsModule;