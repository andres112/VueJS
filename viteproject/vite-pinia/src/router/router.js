import { createRoute, createWebHistory } from "vue-router";

const routes = [{ path: "/", component: () => import("../views/Home.vue") }];
