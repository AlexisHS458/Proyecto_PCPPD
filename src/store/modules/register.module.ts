import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import {User} from '@/models/user';
import UserService from '@/services/user.service';

/**
 * Clase para el manejo de la información de usuario.
 */
@Module({ namespaced: true })
class RegisterUserModule extends VuexModule {
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
  public registerSuccess(): void {
    this.status.logged = true;
  }

  @Mutation
  public registerFailure(): void {
    this.status.logged = false;
  }

  /**
   * Obtiene información de usuario a través de Authentication
   */
  @Action
  async fetchCurrentUser(): Promise<void>  {
    this.context.commit('setLoadingStatus',true);
    const user = await UserService.getUserAuthInfo();
    this.context.commit('setUser', user);
    this.context.commit('setLoadingStatus', false);
  }

  /**
   * Registra usuario en la base de datos
   * @param user Usuario a registrar
   */
  @Action
  async registerUser(user: User): Promise<void> {
    return await UserService.register(user)
      .then((_) => {
        this.context.commit('registerSuccess');
      })
      .catch((_) => {
        this.context.commit('registerFailure');
      })
  }

  get isLoggedIn(): boolean{
    return this.status.logged;
  }

  get isLoading(): boolean{
    return this.status.loading;
  }
}



export default RegisterUserModule;