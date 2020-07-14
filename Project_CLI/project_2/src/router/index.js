import Vue from 'vue'
import VueRouter from 'vue-router'
import Menu from '../views/Menu.vue'
import Battle from '@/views/Battle.vue'
import Home from '@/views/Home.vue'
import BattleHistory from '@/views/History.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/battle',
    name: 'Battle',
    component: Battle
  },
  {
    path: '/history',
    name: 'History',
    component: BattleHistory
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
