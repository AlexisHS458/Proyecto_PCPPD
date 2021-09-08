import Vue from "vue";
import Vuex from "vuex";
import UserModule from "./modules/user.module";
import MainScreenModule from "./modules/main_screen.module";
import WorkspaceModule from "./modules/workspaces.module";
import ChannelsModule from "./modules/channels.module";
import TextChannelModule from "./modules/text_channels.module";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    UserModule,
    MainScreenModule,
    WorkspaceModule,
    ChannelsModule,
    TextChannelModule
  }
});
