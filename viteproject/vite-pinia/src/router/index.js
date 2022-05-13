// import the hooks from vue-router
import { createRouter, createWebHistory } from "vue-router";
import { isSignInWithEmailLink } from "firebase/auth";
import { auth } from "../firebase.config";
// define the routes
const routes = [
  {
    path: "/",
    component: () => import("../views/Home.vue"),
    meta: { requiresAuth: true },
  },
  { path: "/login", component: () => import("../views/Login.vue") },
];

// create the router instance and pass the `routes` option
const router = createRouter({
  routes,
  history: createWebHistory(),
});

// validate if email link is signed in
router.beforeEach((to, from, next) => {
  if (isSignInWithEmailLink(auth, window.location.href)) {
    const email = window.localStorage.getItem("emailForSignIn");
    if (to.meta?.requiresAuth && !email) {
      next("/login");
    } else {
      // Clear email from storage.
      window.localStorage.removeItem("emailForSignIn");
      next();
    }
  } else if (to.path === "/login") {
    next();
  } else {
    next("/login");
  }
});

export default router;
