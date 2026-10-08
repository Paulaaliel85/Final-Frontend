import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {

    const carrito = ref([])

  // Cantidad total de unidades
  const cantidadProductos = computed(() => {
    return carrito.value.reduce(
      (total, producto) => total + (producto.cantidad || 1),
      0
    )
  })

  // Total de dinero del carrito
  const total = computed(() => {
    return carrito.value.reduce(
      (total, producto) =>
        total + producto.precio * (producto.cantidad || 1),
      0
    )
  })

  // Agregar producto al carrito
  function agregarProducto(producto) {
    const productoExistente = carrito.value.find(
      (item) => item.id === producto.id
    )

    if (productoExistente) {
      productoExistente.cantidad++
    } else {
      carrito.value.push({
        ...producto,
        cantidad: 1
      })
    }
  }

  // Aumentar cantidad
  function incrementar(id) {
    const producto = carrito.value.find(
      (item) => item.id === id
    )

    if (producto) {
      producto.cantidad++
    }
  }

  // Disminuir cantidad
  function decrementar(id) {
    const producto = carrito.value.find(
      (item) => item.id === id
    )

    if (producto && producto.cantidad > 1) {
      producto.cantidad--
    }
  }

  // Eliminar producto completamente
  function eliminar(id) {
    carrito.value = carrito.value.filter(
      (producto) => producto.id !== id
    )
  }

  // Vaciar todo el carrito
  function vaciarCarrito() {
    carrito.value = []
  }

  return {
    carrito,
    cantidadProductos,
    total,
    agregarProducto,
    incrementar,
    decrementar,
    eliminar,
    vaciarCarrito
  }
})
