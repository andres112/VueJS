import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Landing from "../views/Landing.vue";
import store from "@/store/index.js";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Landing",
    component: Landing,
  },
  {
    path: "/:id/:slug",
    name: "Home",
    component: Home,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Home,
    beforeEnter: (to, from, next) => {
      store
        .dispatch("signIn")
        .then(() => {
          next("/");
        })
        .catch(() => {});
    },
  },
  {
    path: "/signout",
    name: "Signout",
    component: Home,
    beforeEnter: (to, from, next) => {
      store
        .dispatch("signOut")
        .then(() => {
          next("/");
        })
        .catch(() => {});
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
