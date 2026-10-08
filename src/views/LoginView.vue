<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const error = ref('')

function iniciarSesion() {
  error.value = ''

  const loginCorrecto = authStore.login(
    email.value,
    password.value
  )

  if (loginCorrecto) {
    router.push('/')
  } else {
    error.value = 'El email o la contraseña son incorrectos.'
  }
}
</script>

<template>
  <main class="min-h-screen bg-pink-50 px-4 py-12">

    <section class="mx-auto flex max-w-5xl items-center justify-center">

      <div
        class="grid w-full overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2"
      >

        <div
          class="hidden min-h-[500px] items-center justify-center bg-pink-200 p-10 md:flex"
        >
          <div class="text-center">

            <div class="mb-6 text-6xl">
              
            </div>

            <h1 class="text-4xl font-bold text-pink-800">
              ARMAQUILLAJE
            </h1>

            <p class="mt-4 text-pink-700">
              Comprá maquillaje por mayor
              y organizá tus pagos fácilmente.
            </p>

          </div>
        </div>


        <div class="flex items-center p-8 sm:p-12">

          <div class="w-full">

            <h2 class="text-3xl font-bold text-gray-800">
              Iniciar sesión
            </h2>

            <p class="mt-2 text-sm text-gray-500">
              Ingresá a tu cuenta para continuar.
            </p>


            <form
              class="mt-8 space-y-5"
              @submit.prevent="iniciarSesion"
            >

              <!-- Email -->
              <div>

                <label
                  for="email"
                  class="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email
                </label>

                <input
                  id="email"
                  v-model="email"
                  type="email"
                  placeholder="cliente@usuario.com"
                  class="w-full rounded-xl border border-pink-100 px-4 py-3 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                />

              </div>


              <div>

                <label
                  for="password"
                  class="mb-2 block text-sm font-medium text-gray-700"
                >
                  Contraseña
                </label>

                <input
                  id="password"
                  v-model="password"
                  type="password"
                  placeholder="••••••••"
                  class="w-full rounded-xl border border-pink-100 px-4 py-3 outline-none transition focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
                />

              </div>


              <p
                v-if="error"
                class="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-500"
              >
                {{ error }}
              </p>


            
              <button
                type="submit"
                class="w-full rounded-xl bg-pink-400 px-6 py-3 font-semibold text-white transition hover:bg-pink-500"
              >
                Iniciar sesión
              </button>

            </form>


        
            <div
              class="mt-6 rounded-xl bg-pink-50 p-4 text-sm text-gray-500"
            >
              <p class="font-semibold text-pink-700">
                Usuario de prueba
              </p>

              <p class="mt-1">
                Email: cliente@usuario.com
              </p>

              <p>
                Contraseña: 123456
              </p>
            </div>

          </div>

        </div>

      </div>

    </section>

  </main>
</template>