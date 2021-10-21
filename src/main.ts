import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

/* eslint-disable */
// @ts-ignore
/* import vueSiteGuide from "vue-site-guide"; */
/* eslint-enable */
import { TooltipPlugin } from "@syncfusion/ej2-vue-popups";

Vue.use(TooltipPlugin);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
