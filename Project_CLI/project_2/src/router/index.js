import Vue from "vue";
import VueRouter from "vue-router";
import Menu from "../views/Menu.vue";
import Battle from "@/views/Battle.vue";
import Home from "@/views/Home.vue";
import Register from "@/views/Register.vue";

import { auth } from "@/firebase"; // import firebase singleton

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Menu",
    component: Menu,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/battle",
    name: "Battle",
    component: Battle,
    meta: { requiresAuth: true },
  },
  {
    path: "/history",
    name: "History",
    component: () =>
      import(/* webpackChunkName: "history" */ "../views/History.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/pokemon/:id",
    name: "Pokemon",
    component: () =>
      import(/* webpackChunkName: "photo" */ "../views/Photo.vue"),
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// this iterate for all the routes asking if requiresAuth exist
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const user = auth.currentUser;
    if (!user) {
      next({ path: "/" });
    } else {
      next();
    }
  } else {
    // if route doesnt have meta.requiresAuth let the user in the route
    next();
  }
});

export default router;
