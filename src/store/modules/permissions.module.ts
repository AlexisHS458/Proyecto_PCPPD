import { PermissionsPath } from "@/models/permissions";
import permissionsService from "@/services/permissions.service";
import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";

/**
 * Modulo de acceso a información de espacios de trabajo de un usuario
 *
 */
@Module({ namespaced: true })
class MainScreenModule extends VuexModule {

    /**
     * Mensaje a mostrar en snackbar
     */
    public snackbarMessage = "";

    /**
     * Mensaje a mostrar error en snackbar
     */
    public snackbarMessageError = "";

    public status = {
        showSnackbar: false,
        showSnackbarError: false,
        addpermission: false,
        removepermission: false
    };

    @Mutation
    public setAddpermissionStatus(status: boolean): void {
        this.status.addpermission = status;
    }

    @Mutation
    public setRemovepermissionStatus(status: boolean): void {
        this.status.removepermission = status;
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
    public setShowSnackBarMessageError(status: boolean): void {
        this.status.showSnackbarError = status;
    }

    @Mutation
    public setShowSnackBarMessage(status: boolean): void {
        this.status.showSnackbar = status;
    }

    /**
     * 
     */
    @Action
    async AddPermission(permissionsPath: PermissionsPath): Promise<void> {
        this.context.commit("setAddpermissionStatus", false);
        permissionsService.AddPermission(permissionsPath.uidWorkSpace, permissionsPath.uidChannel, permissionsPath.uidUser).then(() => {
            this.context.commit("setAddpermissionStatus", true);
            this.context.commit("setSnackBarMessage",
            "Se ha otorgado permisos de" + " " + permissionsPath.uidChannel + " " + "a"+ " " + permissionsPath.uidUser);
            this.context.commit("setShowSnackBarMessage", true);
        });
    }

    /**
     * 
     */
     @Action
     async RemovePermission(permissionsPath: PermissionsPath): Promise<void> {
         this.context.commit("setRemovepermissionStatus", false);
         permissionsService.AddPermission(permissionsPath.uidWorkSpace, permissionsPath.uidChannel, permissionsPath.uidUser).then(() => {
             this.context.commit("setRemovepermissionStatus", true);
             this.context.commit("setSnackBarMessage",
             "Se ha removido permiso de" + " " + permissionsPath.uidChannel + " " + "a"+ " " + permissionsPath.uidUser);
             this.context.commit("setShowSnackBarMessage", true);
         });
     }
 }