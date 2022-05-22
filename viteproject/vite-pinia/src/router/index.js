// import the hooks from vue-router
import { createRouter, createWebHistory } from "vue-router";
import { isSignInWithEmailLink, onAuthStateChanged, signInWithEmailLink } from "firebase/auth";
import { auth } from "../firebase.config";
import { useUserStore } from "../stores/user";

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
router.beforeEach(async (to, from, next) => {
  const store = useUserStore();
  if (!to.meta?.requiresAuth) {
    next();
  } else {
    // TODO: Change auth.currentUser for onAuthStateChanged
    if (!auth.currentUser) {
      // If route is email link
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem("emailForSignIn");
        if (!email) {
          email = window.prompt("Please provide your email for confirmation");
        } // Clear email from storage.
        signInWithEmailLink(auth, email, window.location.href)
          .then((result) => {
            if (result.user) store.setUserInfo(auth.currentUser);
            window.localStorage.removeItem("emailForSignIn");
            next();
          })
          .catch((error) => {
            console.log(error);
            next({ path: "/login" });
          });
        return;
      } else {
        next({ path: "/login" });
      }
    } else {
      store.setUserInfo(auth.currentUser);
      next();
    }
  }
});

export default router;
