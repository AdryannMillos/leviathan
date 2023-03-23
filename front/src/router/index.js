import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FrequencyView from '../views/FrequencyView.vue'
import WinnerView from '../views/WinnerView.vue'
import Top4View from '../views/Top4View.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/frequency',
    name: 'frequency',
    component: FrequencyView
  },
  {
    path: '/winner',
    name: 'winner',
    component: WinnerView
  },
  {
    path: '/top4',
    name: 'top4',
    component: Top4View
  },
  {
    path: '/event/:id',
    name: 'event',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/EventView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_FRONT_URL),
  routes
})

export default router
