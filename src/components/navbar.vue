<script setup>
import { ref } from 'vue'
import { useCartStore } from '../stores/cartStore'
import CartModal from './CartModal.vue'

const cartStore = useCartStore()

const mostrarCarrito = ref(false)
</script>

<template>

  <header class="navbar">
    <div class="navbar-container">

      <RouterLink to="/" class="logo">
        <span class="logo-icon"></span>
        🇦 🇷 🇲 🇦 🇶 🇺 🇮 🇱 🇱 🇦 🇯 🇪
      </RouterLink>

      <nav class="nav-links">

        <RouterLink to="/">
          Inicio
        </RouterLink>

        <RouterLink to="/productos">
          Productos
        </RouterLink>

        <button
          class="text-gray-300 transition hover:text-violet-400"
          @click="mostrarCarrito = true"
        >
          Carrito
          <span class="cart-badge">
            {{ cartStore.cantidadProductos }}
          </span>
        </button>

        <RouterLink to="/pagos">
          Mis pagos
        </RouterLink>

      </nav>

    </div>
  </header>

  <!-- MODAL -->
  <CartModal
    v-if="mostrarCarrito"
    @close="mostrarCarrito = false"
  />

</template>