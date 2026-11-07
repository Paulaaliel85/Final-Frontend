
<script setup>
import { usePaymentStore } from '../stores/paymentStore'

const paymentStore = usePaymentStore()
</script>

<template>
  <main class="min-h-screen px-4 py-10 sm:px-6">
    <section class="mx-auto max-w-4xl">

      <!-- Encabezado -->
      <div class="mb-8 flex items-center gap-4">
        <div
          class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pink-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-7 w-7 text-pink-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 10h18M5 6h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2zm2 8h4"
            />
          </svg>
        </div>

        <div>
          <h1 class="text-2xl font-bold text-gray-800 sm:text-2xl">
            Mis pagos
          </h1>

          <p class="mt-1 text-sm text-gray-500 sm:text-base">
            Consultá el estado de tus compras y cuotas.
          </p>
        </div>
      </div>

      <!-- Mensaje cuando no hay compras -->
      <div
        v-if="paymentStore.compras.length === 0"
        class="rounded-3xl bg-white p-12 text-center shadow-sm"
      >
        <h2 class="mt-4 font-semibold text-gray-700">
          No tenés compras registradas
        </h2>

        <p class="mt-2 text-sm text-gray-400">
          Realizá tu primera compra para ver el estado de tus pagos aquí.
        </p>
      </div>

      <!-- Listado de compras -->
      <div v-else class="space-y-6">

        <article
          v-for="compra in paymentStore.compras"
          :key="compra.id"
          class="overflow-hidden rounded-lg border border-pink-200 bg-rose-50 shadow-sm"
        >

          <!-- Encabezado de la compra -->
          <div
            class="flex min-h-18 flex-col gap-4 border-b border-gray-100 px-8 py-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <div class="flex items-center w-120 gap-4">
              <div
                class="flex w-16 h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pink-50"
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
                    d="M6 8V6a6 6 0 0112 0v2m-14 0h16l1 13H3L4 8z"
                  />
                </svg>
              </div>

              <div>
                <h2 class="text-sm font-bold text-gray-700">
                  Compra #{{ compra.id }}
                </h2>

                <p class="mt-1 text-sm text-gray-400">
                  {{ compra.fecha }}
                </p>
              </div>
            </div>

            <span
              class="self-start w-22 text-center rounded-full px-4 py-2 text-sm font-semibold sm:self-center"
              :class="{
                'text-amber-400': compra.estado === 'Pendiente',
                'text-blue-400': compra.estado === 'En curso',
                'text-green-400': compra.estado === 'Pagada'
              }"
            >
              {{ compra.estado }}
            </span>
          </div>

          <!-- Información general de la compra -->
          <div class="grid gap-6 px-6 py-6 text-center sm:grid-cols-2 lg:grid-cols-3">

            <div class="lg:border-r lg:border-gray-300">
              <p class="text-sm text-gray-400">
                Total de la compra
              </p>

              <p class="mt-2 text-lg font-bold text-gray-800">
                ${{ compra.total.toLocaleString('es-AR') }}
              </p>
            </div>

            <div class="lg:border-r lg:border-gray-300">
              <p class="text-sm text-gray-400">
                Plan de pago
              </p>

              <p class="mt-2 text-lg font-semibold text-gray-800">
                {{ compra.cantidadCuotas }}
                {{ compra.cantidadCuotas === 1 ? 'cuota' : 'cuotas' }}
              </p>
            </div>

            <div>
              <p class="text-sm text-gray-400">
                Próximo vencimiento
              </p>

              <p class="mt-2 text-lg font-semibold text-gray-800">
                {{ compra.proximaCuota }}
              </p>
            </div>

          </div>

          <!-- Total pagado y saldo pendiente -->
          <div class="mx-auto grid max-w-lg grid-cols-2 px-6 pb-6 text-center">

            <div class="border-r w-120 border-gray-300 px-4">
              <p class="text-sm text-gray-400">
                Total pagado
              </p>

              <p class="mt-2 text-lg font-bold text-green-600">
                ${{ compra.totalPagado.toLocaleString('es-AR') }}
              </p>
            </div>

            <div class="px-4 w-160">
              <p class="text-sm text-gray-400">
                Saldo pendiente
              </p>

              <p class="mt-2 text-lg font-bold text-pink-500">
                ${{ compra.saldoPendiente.toLocaleString('es-AR') }}
              </p>
            </div>

          </div>

          <!-- Detalle de cuotas -->
          <section
            class="mx-4 mb-6 rounded-xl bg-rose-200 px-5 py-5 sm:mx-6"
          >

            <h3 class="mb-5 text-center font-bold text-gray-700">
              Detalle de cuotas
            </h3>

            <div class="mb-4 flex items-center justify-between">
              <span class="text-sm text-gray-500">
                Cuotas pagadas
              </span>

              <span class="text-sm font-medium text-gray-500">
                {{ compra.cuotas.filter(c => c.estado === 'Pagada').length }}
                de {{ compra.cantidadCuotas }} pagadas
              </span>
            </div>

            <!-- Barra de progreso -->
            <div class="mb-5 h-2 overflow-hidden rounded-full bg-white">
              <div
                class="h-full rounded-full bg-pink-400 transition-all"
                :style="{
                  width: `${compra.total ? (compra.totalPagado / compra.total) * 100 : 0}%`
                }"
              ></div>
            </div>

            <!-- Listado de cuotas -->
            <div class="space-y-3 w-220">

              <div
                v-for="cuota in compra.cuotas"
                :key="cuota.numero"
                class="flex flex-col  h-14 gap-4 rounded-xl bg-rose-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
              >

                <div>
                  <p class="font-semibold text-gray-700">
                    Cuota {{ cuota.numero }}
                  </p>

                  <p
                    v-if="cuota.fechaPago"
                    class="mt-1 text-xs text-green-600"
                  >
                    Pagada el {{ cuota.fechaPago }}
                  </p>
                </div>

                <div class="flex flex-wrap items-center gap-3">

                  <span class="font-bold text-gray-700">
                    ${{ cuota.importe.toLocaleString('es-AR') }}
                  </span>

                  <span
                    class="rounded-full px-3 py-2 text-sm font-semibold"
                    :class="cuota.estado === 'Pagada'
                      ? 'text-green-400'
                      : 'text-amber-600'"
                  >
                    {{ cuota.estado }}
                  </span>

                  <button
                    v-if="cuota.estado === 'Pendiente'"
                    :disabled="compra.cuotas.find(c => c.estado === 'Pendiente')?.numero !== cuota.numero"
                    @click="paymentStore.pagarCuota(compra.id, cuota.numero)"
                    class="rounded-lg h-8 bg-pink-400 px-5 py-3 text-base text-white transition hover:bg-pink-500 disabled:cursor-not-allowed disabled:bg-gray-300"
                  >
                    Pagar cuota
                  </button>

                </div>
              </div>

            </div>
          </section>

          <!-- Productos de la compra -->
          <div class="w-full px-6 pb-6 pt-2">

            <h3
              class="mb-4 text-center text-base font-bold text-pink-400"
            >
              Productos de la compra
            </h3>

            <div class="overflow-hidden rounded-2xl border border-gray-100">

              <div
                v-for="producto in compra.productos"
                :key="producto.id"
                class="flex flex-col items-center justify-between gap-3 border-b border-gray-100 px-5 py-4 last:border-b-0 sm:flex-row"
              >

                <div class="flex flex-wrap items-center justify-center gap-4 sm:justify-start">

                  <p class="text-sm font-semibold text-gray-600">
                    {{ producto.nombre }}
                  </p>

                  <p class="text-sm text-gray-400">
                    {{ producto.cantidad }}
                    {{ producto.cantidad === 1 ? 'set' : 'sets' }}

                    ·

                    {{ (producto.unidadesPorSet || 1) * producto.cantidad }}
                    unidades
                  </p>

                </div>

                <span class="font-semibold text-gray-700">
                  ${{
                    (producto.precio * producto.cantidad).toLocaleString('es-AR')
                  }}
                </span>

              </div>
            </div>
          </div>

        </article>
      </div>

    </section>
  </main>
</template>
