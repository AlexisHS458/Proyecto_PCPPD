import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { User } from "@/models/user";
import UserService from "@/services/user.service";
import AuthService from "@/services/auth.service";
import presenceServices from "@/services/presence.service";
import { Status } from "@/models/status";


/**
 * Clase para el manejo de la información de usuario.
 */
@Module({ namespaced: true })
class UserModule extends VuexModule {
  /**
   * Usuario actual autenticado
   */
  public user?: User = undefined;

  /**
   * Mensaje a mostrar en snackbar
   */
  public snackbarMessage = "";

  /**
   * Mensaje a mostrar error en snackbar
   */
  public snackbarMessageError = "";

  /**
   * Status del usuario
   */
  public status = {
    logged: false,
    loading: true,
    showSnackbar: false,
    showSnackbarError: false
  };

  @Mutation
  public setUser(user: User): void {
    this.user = user;
    if (user.boleta != "") {
      if (user.uid) {
        presenceServices.waitUntilDisconnect(user.uid);
      }
      document.onvisibilitychange = () => {
        if (document.visibilityState === "hidden") {
          presenceServices.setPresence(Status.AWAY, user?.uid);
        } else {
          presenceServices.setPresence(Status.ONLINE, user?.uid);
        }
      };
      this.status.logged = true;
    }
  }

  @Mutation
  public setLoadingStatus(status: boolean): void {
    this.status.loading = status;
  }

  @Mutation
  public saveUserSuccess(user: User): void {
    this.user = user;
    this.status.logged = true;
  }

  @Mutation
  public saveUserFailure(): void {
    this.status.logged = false;
  }
  @Mutation
  public logoutSuccess(): void {
    this.status.loading = true;
  }

  @Mutation
  public logoutFailure(): void {
    this.status.logged = false;
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
   * Obtiene información de usuario.
   */
  @Action
  async fetchCurrentUser(): Promise<void> {
    this.context.commit("setLoadingStatus", true);
    await UserService.getUserAuthInfo(user => {
      this.context.commit("setUser", user);
      this.context.commit("setLoadingStatus", false);
    });
  }

  /**
   * Almcena la información del usuario en la base de datos
   * @param user Usuario a registrar
   */
  @Action
  async saveUser(user: User): Promise<void> {
    return await UserService.saveUser(user)
      .then(() => {
        this.context.commit("saveUserSuccess", user);
        this.context.commit("setSnackBarMessage", "Exito al registrar usuario");
        this.context.commit("setShowSnackBarMessage", true);
      })
      .catch(() => {
        this.context.commit("saveUserFailure");
        this.context.commit("setSnackBarMessageError", "Error al registrar usuario");
        this.context.commit("setShowSnackBarMessageError", true);
      });
  }

  @Action
  async logout(): Promise<void> {
    return await AuthService.logout()
      .then(() => {
        this.context.commit("logoutSuccess");
      })
      .catch(() => {
        this.context.commit("logoutFailure");
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

  get isLoggedIn(): boolean {
    return this.status.logged;
  }

  get isLoading(): boolean {
    return this.status.loading;
  }

  get showSnackbar(): boolean {
    return this.status.showSnackbar;
  }

  get getUser(): User {
    return this.user!;
  }
}

export default UserModule;
