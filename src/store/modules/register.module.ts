import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import {User} from '@/models/user';
import userService from '@/services/user.service';

/**
 * Clase para el manejo de la información de usuario.
 */
@Module({ namespaced: true })
class UserModule extends VuexModule {
  //States

  /**
   * Usuario actual
   */
  public user? : User = undefined;

  //Mutations

  /**
   * Obtiene la información del usuario autenticado
   */
  @Mutation
  public setUser(user: User): void {
    this.user = user;
  }

  //Actions

  /**
   * Obtiene información de usuario a través de Authentication
   */
  @Action
  async fetchCurrentUser()  {
    const user = await userService.getUserAuthInfo();
    console.log("Modulo.Action: ", user);
    this.context.commit('setUser',user);
  }
}

export default UserModule;