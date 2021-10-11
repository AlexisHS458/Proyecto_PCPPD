import store from "@/store";
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
import CodeChannel from "../components/modules/Workspace/Channels/Code/EditCode.vue";
import NavigationDrawer from "../components/modules/Workspace/ViewNavigationDrawer.vue";
import ViewTreeView from "../components/modules/Workspace/ViewTreeView.vue";
import { auth } from "@/utils/firebase";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/Mainscreen",
    name: "MainScreen",
    component: MainScreen,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/Editinformation",
    name: "Edit",
    component: EditInformation,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/space/:id",
    name: "Space",
    components: { default: Workspace, Navigation: NavigationDrawer },
    props: {
      default: false,
      Navigation: false
    },
    meta: {
      requiresAuth: true
    },
    /*   children: [{ name: "navigationDrawer", component: NavigationDrawer, path: "" }] */
    children: [
      /* { name: "navigationDrawer", component: NavigationDrawer, path: "" }, */
      {
        name: "messages",
        path: ":idChannel",
        components: /*  MessagesPage */ {
          default: MessagesPage,
          NavigationDrawer: NavigationDrawer
        },
        props: {
          default: true,
          NavigatonDrawer: false
        },
        meta: {
          requiresAuth: true
        }
      },

      {
        path: "",
        component: NotChannels
      },
      {
        name: "codeChannel",
        path: "code/:idChannelCode",
        components: /* CodeChannel */ { default: CodeChannel, tree: ViewTreeView },
        props: {
          default: true,
          tree: false
        },
        meta: {
          requiresAuth: true
        }
      }
    ]
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

router.beforeEach(
  /* async */ (to, from, next) => {
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
    /*  await store.dispatch("UserModule/fetchCurrentUser");
  const currentUser = store.getters["UserModule/getUser"]; */

    /*  if (!currentUser && requiresAuth) {
    next({ name: "Home" });
  } else if (!requiresAuth && currentUser) {
    next("/Mainscreen");
  } else if (!requiresAuth && !currentUser) next();
  else next(); */

    /* console.log(store.getters["UserModule/getUser"]); */

    /* console.log(store.state["UserModule/user"]); */
    auth.onAuthStateChanged(user => {
      if (!user && requiresAuth) {
        next({ name: "Home" });
      } else if (!requiresAuth && user) {
        next("/Mainscreen");
      } else if (!requiresAuth && !user) next();
      else next();
    });
  }
);

export default router;
