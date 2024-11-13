import { createRouter, createWebHistory } from 'vue-router'
import ContactBook from '../views/ContactBook.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: ContactBook
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
