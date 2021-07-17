import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import {User} from '@/models/user';
import UserService from '@/services/user.service';
import Vue from "vue";
/**
 * Clase para el manejo de la información de usuario.
 */
@Module({ namespaced: true })
class PantallaPrincipalModule extends VuexModule {
  //Status

  /**
   * Usuario
   */
  public user? : User = undefined;

  /**
   * Status de obtención de información del usuario
   */
  public getUserStatus = 'notLoading';

  //Mutations

  @Mutation
  public setUser(user: User): void {
    this.user = user;
  }

  @Mutation
  public setLoadingStatus(status: string): void{
    this.getUserStatus = status;
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

}

export default PantallaPrincipalModule;