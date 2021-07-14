import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import Dashboard from '../views/Dashboard.vue';
import EditInformation from '../views/Edit.vue';
import { firebase } from "@/utils/firebase";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  /*   meta: {
      guest: true
    } */
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
   /*  meta: {
      auth: true
    } */
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
   /*  meta: {
      auth: true
    } */
  },
  {
    path: '/edit',
    name: 'Edit',
    component: EditInformation,
    /* meta: {
      auth: true
    } */
  },
  
];

const router = new VueRouter({
  mode: 'history',
  routes,
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
