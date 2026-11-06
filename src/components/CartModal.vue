<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import { useCartStore } from '../stores/cartStore'
import { usePaymentStore } from '../stores/paymentStore'

const cartStore = useCartStore() 
const paymentStore = usePaymentStore()
const router = useRouter()

const mostrarCuotas = ref(false)
const cantidadCuotas = ref(3)

const emit = defineEmits(['close'])

const META_ENVIO_GRATIS = 150000


const totalCarrito = computed(() => {
  if (cartStore.total) {
    return cartStore.total
  }  // 


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

function mostrarOpcionesDePago() {

  if (cartStore.carrito.length === 0) {
    return
  }

  mostrarCuotas.value = true
}


function confirmarCompra() {

  paymentStore.registrarCompra(
    cartStore.carrito,
    totalCarrito.value,
    cantidadCuotas.value
  )

  cartStore.vaciarCarrito()

  emit('close')

  router.push('/pagos')
}

</script>


<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
    @click.self="emit('close')"
  >
  <div
      class="w-full max-w-[600px] max-h-[90vh] overflow-hidden rounded-[17px] bg-white shadow-2xl">
      <div class="flex items-center justify-between px-7 pt-6 pb-4">
        <div class="flex items-center gap-4">
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
            <h2 class="text-[22px] font-bold text-gray-800">  Mi carrito </h2>
            <p class="text-sm text-gray-400">
              {{ cartStore.carrito.length }} productos
            </p>
          </div>
        </div>


        <button
          @click="emit('close')"
          class="text-2xl font-light text-pink-400 transition hover:text-pink-600"
        >
          ×
        </button>
      </div>

      <div class="max-h-[300px] space-y-3 overflow-y-auto px-7 pb-5">
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

        <div
          v-for="producto in cartStore.carrito"
          :key="producto.id"
          class="flex items-center justify-between rounded-2xl border border-pink-50 bg-white p-3.5 shadow-sm">
          <div class="flex items-center gap-4">
            <div
              class="flex h-[130px] w-[90px] shrink-0 items-center justify-center overflow-hidden rounded-xl bg-pink-50">
              <img
                v-if="producto.image || producto.imagen"
                :src="producto.image || producto.imagen"
                :alt="producto.nombre"
                class="h-full w-full object-contain p-2"
              />


              <span v-else class="text-2xl">
              </span>
            </div>

            <div>
              <h3 class="text-sm font-semibold text-gray-800">
                {{ producto.nombre }}
              </h3>

              <p class="mt-1 text-xs text-gray-400">
                {{ producto.cantidad || 1 }} set (s)
                {{ (producto.unidadesPorSet || 12) * (producto.cantidad || 1) }} unidades
              </p>

              <p class="mt-1 text-sm font-semibold text-pink-500">
                ${{ producto.precio.toLocaleString('es-AR') }}
              </p>


            </div>
          </div>

          <div class="flex items-center gap-4">
            <div class="flex items-center overflow-hidden rounded-xl border border-pink-100">
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
                class="flex h-8 w-8 items-center justify-center text-pink-500 hover:bg-pink-50">
                +
              </button>
            </div>

            <span
              class="hidden text-sm font-medium text-gray-700 sm:block " >
              $
              {{
                (
                  producto.precio * (producto.cantidad || 1)
                ).toLocaleString('es-AR')
              }}
            </span>

            <button
              @click="eliminarProducto(producto.id)"
              class="text-pink-300 transition hover:text-red-400">

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

      <div class="border-t w-full border-pink-100 px-7 py-5">
        <div class="flex justify-center w-260 text-sm text-gray-500">
          <span>
          Subtotal:
          </span>
          <span class="font-medium text-gray-700">
            ${{ totalCarrito.toLocaleString('es-AR') }}
          </span>
        </div>

        <div class="mt-2 flex justify-center w-270 text-sm text-gray-500">
          <span>
            Envío:  
          </span>
          <span class="w-85 font-semibold w text-pink-300">
            {{ restanteEnvio === 0 ? 'Gratis' : 'Gratis superando los $' + META_ENVIO_GRATIS.toLocaleString('es-AR') }}
          </span>
        </div>

        <div class="mt-4 flex items-center justify-center text-pink-200">
          <span class="text-sx font-extrabold text-black">
            Total : 
          </span>
          <span class="text-1xl font-extrabold text-black">
            ${{ totalCarrito.toLocaleString('es-AR') }}
          </span>
        </div>

         <div v-if="mostrarCuotas"
        class="mb-5 h-25 rounded-2xl bg-pink-50 p-5">
        <p class="text-center text-sm font-semibold text-gray-700">
        Elegí tu plan de pago
        </p>

        <div class="mt-4 w-full grid grid-cols-3 gap-3">
      <button type="button"
      @click="cantidadCuotas = 1"
      :class="[
        'rounded-xl border px-3 py-3 text-sm transition',
        cantidadCuotas === 1
          ? 'border-pink-400 bg-pink-400 text-white'
          : 'border-pink-200 bg-white text-gray-600'
      ]"
        >  1 cuota
      </button>

    <button type="button"
      @click="cantidadCuotas = 3"
      :class="[
        'rounded-xl border px-3 py-3 text-sm transition',
        cantidadCuotas === 3
          ? 'border-pink-400 bg-pink-400 text-white'
          : 'border-pink-200 bg-white text-gray-600'
      ]"
    >
      3 cuotas
    </button>

    <button type="button"
      @click="cantidadCuotas = 6"
      :class="[
        'rounded-xl border px-3 py-3 text-sm transition',
        cantidadCuotas === 6
          ? 'border-pink-400 bg-pink-400 text-white'
          : 'border-pink-200 bg-white text-gray-600'
      ]"
    >
      6 cuotas
    </button>
  </div>

  <p class="mt-4 text-center text-sm text-gray-500">
    {{
      cantidadCuotas === 1
        ? 'Pago único'
        : cantidadCuotas + ' cuotas de'
    }}

    <strong class="text-pink-500">
      ${{
        Math.ceil(
          totalCarrito / cantidadCuotas
        ).toLocaleString('es-AR')
      }}
    </strong>
  </p>

  <button
    type="button"
    @click="confirmarCompra"
    class="mt-4 w-full h-6 rounded-xl bg-pink-400 px-4 py-3 text-sm font-semibold text-white transition hover:bg-pink-500"
  >
    Confirmar compra
  </button> 
</div>

<div class="flex w-full h-10 justify-center">
  <button v-if="!mostrarCuotas"
  :disabled="cartStore.carrito.length === 0"
  @click="mostrarOpcionesDePago"
    class="flex w-72 h-6 items-center justify-center rounded-xl bg-pink-300 px-6 py-2.5 text-xs font-semibold text-white hover:bg-pink-400"
  >  Finalizar compra
</button>

     </div>
   </div>
  </div>
</div>
</template>
