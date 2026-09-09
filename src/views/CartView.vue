<script setup>
import { useCartStore } from '../stores/cartStore'

const cartStore = useCartStore()
</script>

<template>
  <main class="page">

    <h1 class="page-title">Mi carrito</h1>

    <p class="page-subtitle">
      Revisá los productos antes de continuar con tu compra.
    </p>

    <section class="cart-container">

      <div
        v-if="cartStore.carrito.length === 0"
        class="empty-cart"
      >
        <h2>Tu carrito está vacío</h2>
        <p>Agregá productos para comenzar tu compra.</p>
      </div>

      <div v-else>

        <article
          v-for="producto in cartStore.carrito"
          :key="producto.id"
          class="cart-item"
        >
          <div class="cart-item-info">
            <h3>{{ producto.nombre }}</h3>
            <p>{{ producto.categoria }}</p>
          </div>

          <strong>
            ${{ producto.precio.toLocaleString('es-AR') }}
          </strong>
        </article>

        <div class="cart-total">
          Total:
          ${{ cartStore.carrito
            .reduce((total, producto) => total + producto.precio, 0)
            .toLocaleString('es-AR') }}
        </div>

      </div>

    </section>

  </main>
</template>