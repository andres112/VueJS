// import the hooks from vue-router
import { createRouter, createWebHistory } from "vue-router";

// define the routes
const routes = [
  { path: "/", component: () => import("../views/Home.vue") },
  { path: "/login", component: () => import("../views/Login.vue") },
  { path: "/register", component: () => import("../views/Register.vue") },
];

// create the router instance and pass the `routes` option
const router = createRouter({
  routes,
  history: createWebHistory(),
});

export default router;
