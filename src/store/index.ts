import Vue from 'vue';
import Vuex from 'vuex';
import LoginForm from './modules/login_form.module';
import UserModule from './modules/register.module'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    LoginForm,
    UserModule
  },
});
