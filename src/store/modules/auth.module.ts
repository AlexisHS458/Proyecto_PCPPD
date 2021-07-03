import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import AuthService from '@/services/auth.service';
import Firebase from 'firebase/app';

const storedUser = localStorage.getItem('user');

@Module({ namespaced: true })
class User extends VuexModule {
  public status = storedUser ? { loggedIn: true } : { loggedIn: false };
  public user = storedUser ? JSON.parse(storedUser) : null;

  @Mutation
  public loginSuccess(user: Firebase.User): void {
    this.status.loggedIn = true;
    this.user = user;
  }

  @Mutation
  public loginFailure(): void {
    this.status.loggedIn = false;
    this.user = null;
  }

  @Mutation
  public logout(): void {
    this.status.loggedIn = false;
    this.user = null;
  }

  @Action
  signOut(): void {
    AuthService.logout();
    //this.context.commit('logout');
  }

  get isLoggedIn(): boolean {
    return this.status.loggedIn;
  }
}

export default User;