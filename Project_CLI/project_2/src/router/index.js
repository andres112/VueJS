import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Battle from '@/views/Battle.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/battle',
    name: 'Battle',
    component: Battle
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/pokemon/:id',
    name: 'Pokemon',
    component: () => import(/* webpackChunkName: "photo" */ '../views/Photo.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
