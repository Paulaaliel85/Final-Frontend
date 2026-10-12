import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '../stores/authStore'

import LoginView from '../views/LoginView.vue'
import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import PaymentsView from '../views/PaymentsView.vue'

const routes = [
{
path: '/login',
name: 'login',
component: LoginView
},
{
path: '/',
name: 'home',
component: HomeView,
meta: { requiereAutenticacion: true }
},
{
path: '/productos',
name: 'productos',
component: ProductsView,
meta: { requiereAutenticacion: true }
},
{
path: '/pagos',
name: 'pagos',
component: PaymentsView,
meta: { requiereAutenticacion: true }
}
]

const router = createRouter({
history: createWebHistory(),
routes
})

router.beforeEach((to) => {
const authStore = useAuthStore()

if (to.meta.requiereAutenticacion && !authStore.estaAutenticado) {
return { name: 'login' }
}

if (to.name === 'login' && authStore.estaAutenticado) {
return { name: 'home' }
}
})

export default router
