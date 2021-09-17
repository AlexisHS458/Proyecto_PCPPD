import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import MainScreen from "../views/MainScreen.vue";
import EditInformation from "../views/EditInformation.vue";
import Workspace from "../views/Workspace.vue";
import MessagesPage from "../components/modules/Workspace/ViewMessages.vue";
import NotFound from "../views/PageNotFound.vue";
import NotChannels from "../components/modules/Workspace/NotChannels.vue";
/* import { firebase } from "@/utils/firebase"; */
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
    /* meta: {
      guest: true
    } */
  },
  {
    path: "/register",
    name: "Register",
    component: Register
    /*  meta: {
      auth: true
    } */
  },
  {
    path: "/Mainscreen",
    name: "MainScreen",
    component: MainScreen
    /*   meta: {
      auth: true
    } */
  },
  {
    path: "/Editinformation",
    name: "Edit",
    component: EditInformation
    /* meta: {
      auth: true
    } */
  },
  {
    path: "/space/:id",
    name: "Space",
    component: Workspace,

    children: [
      { name: "messages", path: ":idChannel", component: MessagesPage, props: true },
      {
        path: "",
        component: NotChannels
      }
    ]
    /* meta: {
      auth: true
    } */
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

/* router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.auth)) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        next()
      } else {
        next({
          path: "/",
        })
      }
    })
  } else if (to.matched.some(record => record.meta.guest)) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        next({
          path: "/dashboard",
        })
      } else {
        next()
      }
    })

  } else {
    next()
  }

}) */

export default router;
