import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import CartView from '../views/CartView.vue'
import PaymentsView from '../views/PaymentsView.vue'

const routes = [
{
path: '/',
name: 'home',
component: HomeView
},
{
path: '/productos',
name: 'productos',
component: ProductsView
},
{
path: '/carrito',
name: 'carrito',
component: CartView
},
{
path: '/pagos',
name: 'pagos',
component: PaymentsView
}
]

const router = createRouter({
history: createWebHistory(),
routes
})

export default router
