// import the hooks from vue-router
import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/user";

// Navigation guard to check if the user is authenticated
const requireAuth = async (to, from, next) => {
  const userStore = useUserStore();
  const user = await userStore.getCurrentUser();
  if (user) {
    next();
  } else {
    next("/login");
  }
};

const redirectIfAuthenticated = async (to, from, next) => {
  const userStore = useUserStore();
  const user = await userStore.getCurrentUser();
  if (user) {
    next("/");
  } else {
    next();
  }
};

// define the routes
const routes = [
  {
    path: "/",
    component: () => import("../views/Home.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/about",
    component: () => import("../views/About.vue"),
    beforeEnter: requireAuth,
  },
  {
    path: "/login",
    component: () => import("../views/Login.vue"),
    beforeEnter: redirectIfAuthenticated,
  },
];

// create the router instance and pass the `routes` option
const router = createRouter({
  routes,
  history: createWebHistory(),
});

// validate if email link is signed in
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  if ("mode" in to.query && to.query.mode === "singIn") {
    await userStore.isLinkEmail();
    next("/");
  } else {
    next();
  }
});

export default router;
