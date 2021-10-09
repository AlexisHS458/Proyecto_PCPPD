import { PermissionsPath } from "@/models/permissions";
import permissionsService from "@/services/permissions.service";
import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";

/**
 * Modulo de acceso a información de espacios de trabajo de un usuario
 *
 */
@Module({ namespaced: true })
class PermissionsModule extends VuexModule {
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
   * Añadir permiso de un canal de texto a un usuario de un espacio de trabajo.
   */
  @Action
  async AddPermission(permissionsPath: PermissionsPath): Promise<void> {
    this.context.commit("setAddpermissionStatus", false);
    permissionsService
      .AddPermission(
        permissionsPath.uidWorkSpace,
        permissionsPath.uidChannel,
        permissionsPath.uidUser
      )
      .then(() => {
        this.context.commit("setAddpermissionStatus", true);
        this.context.commit(
          "setSnackBarMessage",
          "Se ha otorgado permisos de" +
            " " +
            permissionsPath.nameChannel +
            " " +
            "a" +
            " " +
            permissionsPath.nameUser
        );
        this.context.commit("setShowSnackBarMessage", true);
      });
  }

  /**
   * Remover permiso de un canal de texto a un usuario de un espacio de trabajo.
   */
  @Action
  async RemovePermission(permissionsPath: PermissionsPath): Promise<void> {
    this.context.commit("setRemovepermissionStatus", false);
    permissionsService
      .RemovePermission(
        permissionsPath.uidWorkSpace,
        permissionsPath.uidChannel,
        permissionsPath.uidUser
      )
      .then(() => {
        this.context.commit("setRemovepermissionStatus", true);
        this.context.commit(
          "setSnackBarMessage",
          "Se ha removido permiso de" +
            " " +
            permissionsPath.nameChannel +
            " " +
            "a" +
            " " +
            permissionsPath.nameUser
        );
        this.context.commit("setShowSnackBarMessage", true);
      });
  }

  /**
   * Añadir permiso de un canal de voz a un usuario de un espacio de trabajo.
   */
   @Action
   async AddVoicePermission(permissionsPath: PermissionsPath): Promise<void> {
     this.context.commit("setAddpermissionStatus", false);
     permissionsService
       .AddVoicePermission(
         permissionsPath.uidWorkSpace,
         permissionsPath.uidChannel,
         permissionsPath.uidUser
       )
       .then(() => {
         this.context.commit("setAddpermissionStatus", true);
         this.context.commit(
           "setSnackBarMessage",
           "Se ha otorgado permisos de" +
             " " +
             permissionsPath.nameChannel +
             " " +
             "a" +
             " " +
             permissionsPath.nameUser
         );
         this.context.commit("setShowSnackBarMessage", true);
       });
   }
 
   /**
    * Remover permiso de un canal de voz a un usuario de un espacio de trabajo.
    */
   @Action
   async RemoveVoicePermission(permissionsPath: PermissionsPath): Promise<void> {
     this.context.commit("setRemovepermissionStatus", false);
     permissionsService
       .RemoveVoicePermission(
         permissionsPath.uidWorkSpace,
         permissionsPath.uidChannel,
         permissionsPath.uidUser
       )
       .then(() => {
         this.context.commit("setRemovepermissionStatus", true);
         this.context.commit(
           "setSnackBarMessage",
           "Se ha removido permiso de" +
             " " +
             permissionsPath.nameChannel +
             " " +
             "a" +
             " " +
             permissionsPath.nameUser
         );
         this.context.commit("setShowSnackBarMessage", true);
       });
   }

   /**
   * Añadir permiso de un canal de código a un usuario de un espacio de trabajo.
   */
  @Action
  async AddCodePermission(permissionsPath: PermissionsPath): Promise<void> {
    this.context.commit("setAddpermissionStatus", false);
    permissionsService
      .AddCodePermission(
        permissionsPath.uidWorkSpace,
        permissionsPath.uidChannel,
        permissionsPath.uidUser
      )
      .then(() => {
        this.context.commit("setAddpermissionStatus", true);
        this.context.commit(
          "setSnackBarMessage",
          "Se ha otorgado permisos de" +
            " " +
            permissionsPath.nameChannel +
            " " +
            "a" +
            " " +
            permissionsPath.nameUser
        );
        this.context.commit("setShowSnackBarMessage", true);
      });
  }

  /**
   * Remover permiso de un canal de código a un usuario de un espacio de trabajo.
   */
  @Action
  async RemoveCodePermission(permissionsPath: PermissionsPath): Promise<void> {
    this.context.commit("setRemovepermissionStatus", false);
    permissionsService
      .RemoveCodePermission(
        permissionsPath.uidWorkSpace,
        permissionsPath.uidChannel,
        permissionsPath.uidUser
      )
      .then(() => {
        this.context.commit("setRemovepermissionStatus", true);
        this.context.commit(
          "setSnackBarMessage",
          "Se ha removido permiso de" +
            " " +
            permissionsPath.nameChannel +
            " " +
            "a" +
            " " +
            permissionsPath.nameUser
        );
        this.context.commit("setShowSnackBarMessage", true);
      });
  }

  @Action
  setNotVisibleSnackBar(): void {
    this.context.commit("setShowSnackBarMessage", false);
  }
}

export default PermissionsModule;
