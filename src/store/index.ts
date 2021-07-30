import Vue from "vue";
import Vuex from "vuex";
import UserModule from "./modules/user.module";
import WorkSpaceModule from "./modules/work_space.module";
import GatoModule from "./modules/gato.module";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    UserModule,
    WorkSpaceModule,
    GatoModule
  }
});
