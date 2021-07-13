import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import Firebase from 'firebase/app';
import userService from '@/services/user.service';

const storedUser = localStorage.getItem('user');

/**
 * Clase para el manejo de la información de usuario.
 */
@Module({ namespaced: true })
class User extends VuexModule {
  //States

  /**
   * Actual usuario de Firebase
   */
  public userAuth = storedUser ? JSON.parse(storedUser) : null;

  //Mutations

  /**
   * Obtiene la información del usuario autenticado
   */
  @Mutation
  public setUser(user: Firebase.User) {
    this.userAuth = user;
  }


  //Actions

  /**
   * Obtiene información de usuario a través de Authentication
   */
  @Action
  fetchCurrentUser(): void {
    var user = userService.getUserAuthInfo;
    this.context.commit('setUser',user);
  }

}

export default User;