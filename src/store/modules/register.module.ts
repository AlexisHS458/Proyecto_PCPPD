import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import {User} from '@/models/user';
import UserService from '@/services/user.service';

/**
 * Clase para el manejo de la información de usuario.
 */
@Module({ namespaced: true })
class RegisterUserModule extends VuexModule {
  //Status

  /**
   * Usuario ha registrar
   */
  public user? : User = undefined;

  /**
   * Status de obtención de información del usuario
   */
  public getUserStatus = 'notLoading';

  /**
   * Status del registro de un usuario
   */
  public saveUserStatus= 'notSaved';

  //Mutations

  @Mutation
  public setUser(user: User): void {
    this.user = user;
  }

  @Mutation
  public setLoadingStatus(status: string): void{
    this.getUserStatus = status;
  }

  @Mutation
  public registerSuccess(status: string): void {
    this.saveUserStatus =  status;
  }

  @Mutation
  public registerFailure(status: string): void {
    this.saveUserStatus =  status;
  }

  //Actions

  /**
   * Obtiene información de usuario a través de Authentication
   */
  @Action
  async fetchCurrentUser(): Promise<void>  {
    this.context.commit('setLoadingStatus', 'loading');
    const user = await UserService.getUserAuthInfo();
    this.context.commit('setLoadingStatus', 'notloading');
    this.context.commit('setUser',user);
  }

  /**
   * Registra usuario en la base de datos
   * @param user Usuario a registrar
   */
  @Action
  async registerUser(user: User): Promise<void> {
    return await UserService.register(user)
      .then((_) => {
        this.context.commit('registerSuccess', 'saved');
      })
      .catch((_) => {
        this.context.commit('registerFailure', 'notSaved');
      })
  }
}

export default RegisterUserModule;