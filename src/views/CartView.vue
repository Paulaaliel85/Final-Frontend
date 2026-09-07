<script setup>
import { useCartStore } from '../stores/cartStore'

const cartStore = useCartStore()
</script>

<template>
  <main>
    <h1>Mi carrito</h1>

    <p v-if="cartStore.carrito.length === 0"> 
      // Si el carrito está vacío, muestra un mensaje
      Tu carrito está vacío.
    </p>

    <div v-else>
      <div
        v-for="producto in cartStore.carrito"  
        
        :key="producto.id"
      > // muestra los productos agregados en el carrito
        <h3>{{ producto.nombre }}</h3>
        <p>Precio: ${{ producto.precio }}</p>
      </div>
    </div>
  </main>
</template>