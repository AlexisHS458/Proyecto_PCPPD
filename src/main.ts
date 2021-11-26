import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import apolloClient from "@/utils/apollo_client";

/* eslint-disable */
// @ts-ignore
import VueImg from "v-img";
/* eslint-enable */

Vue.use(VueImg);
/* eslint-disable */
// @ts-ignore
/* import vueSiteGuide from "vue-site-guide"; */
/* eslint-enable */
import { TooltipPlugin } from "@syncfusion/ej2-vue-popups";
import { provideApolloClient } from "@vue/apollo-composable";

Vue.use(TooltipPlugin);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  setup() {
    provideApolloClient(apolloClient as any);
  },
  render: h => h(App)
}).$mount("#app");
