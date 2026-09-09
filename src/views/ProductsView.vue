<script setup>
import { useCartStore } from '../stores/cartStore'

const cartStore = useCartStore()

const productos = [
  {
    id: 1,
    nombre: 'Labial Maybelline ',
    categoria: 'Labiales de 12 Unidades',
    precio: 44000,
    image: './src/assets/labial.jpg'
  },
  {
    id: 2,
    nombre: 'Labial Girl Power',
    categoria: 'Labiales de 12 Unidades',
    precio: 60000,
    image: './src/assets/labial2.png'
  },
  {
    id: 3,
    nombre: 'Mascara Lash Sensational',
    categoria: 'Mascaras de 8 Unidades',
    precio: 70000,
    image: './src/assets/mascaras.jpg'
  },
  {
    id: 4,
    nombre: 'Set de Brochas',
    categoria: 'Accesorios 10 Brochas',
    precio: 45000,
    image: './src/assets/brochass.jpg'
  }
]

function agregarAlCarrito(producto) {
  cartStore.agregarProducto(producto)
}
</script>

<template>
  <main class="page">

    <h1 class="page-title">Productos</h1>

    <p class="page-subtitle">
      Encontrá los productos de maquillaje que necesitás.
    </p>

    <section class="products-grid">

      <article
        v-for="producto in productos"
        :key="producto.id"
        class="product-card"
      >

        <div class="product-image" overflow-hidden flex items-center justify-center rounded-xl bg-gray-100 text-3xl>
          <img
            v-if="producto.image"
            :src="producto.image"
            :alt="producto.nombre"
            class="h-full w-full object-cover"
          />
          <span v-else>🛍️</span>
          
        </div>

        <h3>{{ producto.nombre }}</h3>

        <p class="product-category">
          {{ producto.categoria }}
        </p>

        <p class="product-price">
          ${{ producto.precio.toLocaleString('es-AR') }}
        </p>

        <button
          class="product-button"
          @click="agregarAlCarrito(producto)"
        >
          Agregar al carrito
        </button>

      </article>

    </section>

  </main>
</template>