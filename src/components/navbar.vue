<script setup>
import { useCartStore } from '../stores/cartStore'

const cartStore = useCartStore()
</script>

<template>
  <nav>
    <RouterLink to="/">Inicio</RouterLink>
    <RouterLink to="/productos">Productos</RouterLink>

    <RouterLink to="/carrito">
      Carrito ({{ cartStore.cantidadProductos }})
    </RouterLink>

    <RouterLink to="/pagos">Mis pagos</RouterLink>
  </nav>
</template>