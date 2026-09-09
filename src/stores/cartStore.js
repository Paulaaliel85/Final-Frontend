import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const carrito = ref([])

  const cantidadProductos = computed(() => carrito.value.length)
// Recibe un producto y se agrega al carrito
  function agregarProducto(producto) {
    carrito.value.push(producto)
  }

  return {
    carrito,
    cantidadProductos,
    agregarProducto
  }
})