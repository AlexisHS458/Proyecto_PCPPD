import { VuexModule, Module, Action } from 'vuex-module-decorators';

@Module({ namespaced: true })
class LoginForm extends VuexModule {
  @Action
  public sendAlert() : void {
    alert('Hello world!');
  }
}
export default LoginForm;
