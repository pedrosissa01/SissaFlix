import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/Index.vue'
import Detalhe from '../views/detalhe/[id].vue'
import Checkout from '../views/checkout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index,
    },
     {
      path: '/detalhe/:id',
      name: 'detalhe',
      component: Detalhe,
    },
     {
      path: '/checkout',
      name: 'Checkout',
      component: Checkout,
    },
    {
      path: '/about',
      name: 'about',

    },
  ],
})

export default router
