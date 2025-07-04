import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import BackgroundTasks from '../views/BackgroundTasks.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/background-tasks',
    name: 'BackgroundTasks',
    component: BackgroundTasks
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 