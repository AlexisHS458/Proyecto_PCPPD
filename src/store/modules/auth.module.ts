import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';
import AuthService from '@/services/auth.service';
import Firebase from 'firebase/app';
import * as firebaseui from 'firebaseui'
import {firebase} from '@/utils/firebase';

const storedUser = localStorage.getItem('user');

@Module({ namespaced: true })
class User extends VuexModule {
  public status = storedUser ? { loggedIn: true } : { loggedIn: false };
  public user = storedUser ? JSON.parse(storedUser) : null;
  private ui: firebaseui.auth.AuthUI | undefined;

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

  @Mutation
  public setAuthUI(ui : firebaseui.auth.AuthUI): void {
    this.ui = ui
  }

  @Mutation
  public start(target: String, successURL: String): void{
    this.ui?.start(
      target.valueOf(),
      {
        signInOptions: [
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.TwitterAuthProvider.PROVIDER_ID
        ],
        signInSuccessUrl: successURL.valueOf(),
        siteName: "Kun",
      }
    );
  }

  @Action
  signOut(): void {
    AuthService.logout();
    this.context.commit('logout');
  }

  @Action
  initAuthUI(): void{
    let authUI = AuthService.initLoginUI;
    this.context.commit('setAuthUI',authUI);
  }

  get isLoggedIn(): boolean {
    return this.status.loggedIn;
  }
}

export default User;