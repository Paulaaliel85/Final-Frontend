<script setup>
import { computed } from 'vue'
import { useCartStore } from '../stores/cartStore'


const cartStore = useCartStore()


const emit = defineEmits(['close'])


const META_ENVIO_GRATIS = 50000


const totalCarrito = computed(() => {
  if (cartStore.total) {
    return cartStore.total
  }


  return cartStore.carrito.reduce(
    (total, producto) =>
      total + producto.precio * (producto.cantidad || 1),
    0
  )
})


const restanteEnvio = computed(() => {
  const diferencia = META_ENVIO_GRATIS - totalCarrito.value


  return diferencia > 0 ? diferencia : 0
})


const porcentajeEnvio = computed(() => {
  const porcentaje =
    (totalCarrito.value / META_ENVIO_GRATIS) * 100


  return Math.min(porcentaje, 100)
})


const incrementarCantidad = (producto) => {
  if (typeof cartStore.incrementar === 'function') {
    cartStore.incrementar(producto.id)
  } else {
    producto.cantidad = (producto.cantidad || 1) + 1
  }
}


const decrementarCantidad = (producto) => {
  if (typeof cartStore.decrementar === 'function') {
    cartStore.decrementar(producto.id)
  } else if ((producto.cantidad || 1) > 1) {
    producto.cantidad--
  }
}


const eliminarProducto = (id) => {
  if (typeof cartStore.eliminar === 'function') {
    cartStore.eliminar(id)
  } else {
    cartStore.carrito = cartStore.carrito.filter(
      (producto) => producto.id !== id
    )
  }
}
</script>


<template>
  <!-- Fondo transparente/oscurecido -->
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
    @click.self="emit('close')"
  >


    <!-- CARRITO -->
    <div
      class="w-full max-w-[600px] max-h-[200vh] overflow-hidden rounded-[17px] bg-white shadow-2xl"
    >


      <!-- HEADER -->
      <div class="flex items-center justify-between px-7 pt-6 pb-4">


        <div class="flex items-center gap-4">


          <!-- Icono carrito -->
          <div
            class="flex h-12 w-15 items-center justify-center rounded-full bg-pink-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-pink-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 2h13m-9 4a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
              />
            </svg>
          </div>


          <div>
            <h2 class="text-[22px] font-bold text-gray-800">
              Mi carrito
            </h2>


            <p class="text-sm text-gray-400">
              {{ cartStore.carrito.length }} productos
            </p>
          </div>


        </div>


        <!-- CERRAR -->
        <button
          @click="emit('close')"
          class="text-2xl font-light text-pink-400 transition hover:text-pink-600"
        >
          ×
        </button>


      </div>



      <!-- PRODUCTOS -->
      <div
        class="max-h-300px] space-y-3 overflow-y-auto px-7 pb-5"
      >


        <!-- CARRITO VACÍO -->
        <div
          v-if="cartStore.carrito.length === 0"
          class="py-10 text-center"
        >


          <div class="mb-3 text-4xl">
           
          </div>


          <p class="text-sm text-gray-400">
            Tu carrito está vacío.
          </p>

        </div>




        <!-- PRODUCTO -->
        <div
          v-for="producto in cartStore.carrito"
          :key="producto.id"
          class="flex items-center justify-between rounded-2xl border border-pink-50 bg-white p-3.5 shadow-sm"
        >


          <!-- IMAGEN + INFO -->
          <div class="flex items-center gap-4">


            <!-- Imagen -->
            <div
              class="flex h-[130px] w-[90px] shrink-0 items-center justify-center overflow-hidden rounded-xl bg-pink-50"
            >


              <img
                v-if="producto.image || producto.imagen"
                :src="producto.image || producto.imagen"
                :alt="producto.nombre"
                class="h-full w-full object-contain p-2"
              />


              <span v-else class="text-2xl">
               
              </span>


            </div>




            <!-- Datos -->
            <div>


              <h3 class="text-sm font-semibold text-gray-800">
                {{ producto.nombre }}
              </h3>


              <p class="mt-1 text-xs text-gray-400">
                {{ producto.marca || 'Maquillaje' }}
              </p>


              <p class="mt-1 text-sm font-semibold text-pink-500">
                ${{ producto.precio.toLocaleString('es-AR') }}
              </p>


            </div>


          </div>




          <!-- CANTIDAD + PRECIO + ELIMINAR -->
          <div class="flex items-center gap-4">


            <!-- Cantidad -->
            <div
              class="flex items-center overflow-hidden rounded-xl border border-pink-100"
            >


              <button
                @click="decrementarCantidad(producto)"
                class="flex h-8 w-8 items-center justify-center text-pink-500 hover:bg-pink-50"
              >
                −
              </button>


              <span
                class="flex h-8 w-8 items-center justify-center border-x border-pink-100 text-sm font-medium text-gray-700"
              >
                {{ producto.cantidad || 1 }}
              </span>


              <button
                @click="incrementarCantidad(producto)"
                class="flex h-8 w-8 items-center justify-center text-pink-500 hover:bg-pink-50"
              >
                +
              </button>


            </div>




            <!-- Precio -->
            <span
              class="hidden text-sm font-medium text-gray-700 sm:block "
            >
              $
              {{
                (
                  producto.precio * (producto.cantidad || 1)
                ).toLocaleString('es-AR')
              }}
            </span>




            <!-- Eliminar -->
            <button
              @click="eliminarProducto(producto.id)"
              class="text-pink-300 transition hover:text-red-400"
            >


              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>


            </button>


          </div>


        </div>


      </div>




      <!-- RESUMEN -->
      <div class="border-t w-140 border-pink-100 px-7 py-5">


        <!-- Subtotal -->
        <div class="flex justify-center w-260 text-sm text-gray-500">


          <span>
          Subtotal:
          </span>


          <span class="font-medium text-gray-700">
            ${{ totalCarrito.toLocaleString('es-AR') }}
          </span>


        </div>




        <!-- Envío -->
        <div class="mt-2 flex justify-center w-270 text-sm text-gray-500">


          <span>
            Envío:  
          </span>


          <span class="font-semibold text-pink-300">
            {{ restanteEnvio === 0 ? 'Gratis' : 'A calcular' }}
          </span>


        </div>




        <!-- TOTAL -->
        <div class="mt-4 flex items-center justify-center text-pink-200">


          <span class="text-sx font-bold text-black">
            Total  |
          </span>


          <span class="text-1xl font-extrabold text-black">
            ${{ totalCarrito.toLocaleString('es-AR') }}
          </span>


        </div>




       <div class="flex w-full justify-center">


  <button
    class="flex w-72 items-center justify-center rounded-xl bg-pink-300 px-6 py-2.5 text-xs font-semibold text-white hover:bg-pink-400"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="mr-2 h-7 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
      />
    </svg>
    Finalizar compra
  </button>


</div>


      </div>


    </div>


  </div>
</template>
