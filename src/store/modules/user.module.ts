import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import {User} from '@/models/user';
import UserService from '@/services/user.service';

/**
 * Clase para el manejo de la información de usuario.
 */
@Module({ namespaced: true })
class UserModule extends VuexModule {
  /**
   * Usuario a registrar
   */
  public user? : User = undefined;

  /**
   * Status del registro
   */
  public status = { logged: false, loading: true};


  @Mutation
  public setUser(user: User): void {
    this.user = user;
    if(user.boleta != '')
      this.status.logged = true;
  }

  @Mutation
  public setLoadingStatus(status: boolean): void{
    this.status.loading = status;
  }

  @Mutation
  public saveUserSuccess(): void {
    this.status.logged = true;
  }

  @Mutation
  public saveUserFailure(): void {
    this.status.logged = false;
  }

  /**
   * Obtiene información de usuario.
   */
  @Action
  async fetchCurrentUser(): Promise<void>  {
    this.context.commit('setLoadingStatus',true);
    const user = await UserService.getUserAuthInfo();
    this.context.commit('setUser', user);
    this.context.commit('setLoadingStatus', false);
  }

  /**
   * Almcena la información del usuario en la base de datos
   * @param user Usuario a registrar
   */
  @Action
  async saveUser(user: User): Promise<void> {
    return await UserService.register(user)
      .then((_) => {
        this.context.commit('saveUserSuccess');
      })
      .catch((_) => {
        this.context.commit('saveUserFailure');
      })
  }

  get isLoggedIn(): boolean{
    return this.status.logged;
  }

  get isLoading(): boolean{
    return this.status.loading;
  }
}

export default UserModule;