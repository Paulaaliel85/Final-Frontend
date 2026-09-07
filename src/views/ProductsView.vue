<script setup>
import { useCartStore } from '../stores/cartStore'

const cartStore = useCartStore()

const producto = {
  id: 1,
  nombre: 'Notebook Lenovo',
  precio: 850000
}
</script>

<template>
  <main>
    <h1>Productos</h1>

    <h2>{{ producto.nombre }}</h2>
    <p>Precio: ${{ producto.precio }}</p>

    <button @click="cartStore.agregarProducto(producto)">
      Agregar al carrito
    </button>
  </main>
</template>