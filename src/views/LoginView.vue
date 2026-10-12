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
  <main class="flex min-h-screen items-center justify-center  px-4">

    <section class="w-full max-w-md rounded-[32px] bg-white px-8 py-12 sm:p-10 sm:px-16 shadow-[0_10px_30px_rgba(236,72,153,0.08)]">

     

        <h1 class="mt-4 h-20 text-center text-xl font-extrabold tracking-[0.25em] text-[#e15b8c]">
          ARMAQUILLAJE
        </h1>

      <h2 class="mt-6 text-center text-base font-medium text-gray-700">
        Iniciar sesión
      </h2>

      <p class="mt-1 h-10 text-center text-xs text-gray-400">
        Ingresá a tu cuenta para continuar.
      </p>

      <form class="mt-6 w-full h-46 mt-6 flex flex-col items-center space-y-6"  
      @submit.prevent="iniciarSesion">

        <div class="relative">
          <span class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
            <svg class="w-10 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/></svg>
          </span>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder=""
            class="w-72 h-7 text-center  text-sm w-72 rounded-l space-y-6 border border-pink-100 bg-white py-3.5 pl-11 pr-4 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#e15b8c] focus:ring-2 focus:ring-pink-100"
          />
        </div>


        <div class="relative">
          <span class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
            <svg class="w-10 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"/></svg>
          </span>
          <input
            id="password"
            v-model="password"
            placeholder=""
            class="w-72 h-7 text-center text-sm w-72 space-y-6 rounded-l border border-pink-100 bg-white py-3.5 pl-11 pr-4 text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-[#e15b8c] focus:ring-2 focus:ring-pink-100"
          />
        </div>

        <p v-if="error" class="rounded-xl bg-red-50 px-4 py-3 text-center text-xs text-red-500">
          {{ error }}
        </p>

        <button
          type="submit"
          class="w-58 h-6 rounded-2xl bg-[#e15b8c] py-3.5 text-sm font-medium text-white transition hover:bg-[#d04a7a] shadow-md shadow-pink-200"
        >
          Iniciar sesión
        </button>

      </form>

      <div class="mt-10 rounded-2xl bg-[#fdf2f4] p-4 text-xs text-gray-500">
        <div class="flex items-center gap-1.5 text-[#e15b8c] font-semibold mb-1">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/></svg>
          Usuario de prueba
        </div>
        <p class="mt-1"
        >Email: cliente@usuario.com</p>
        <p>Contraseña: 123456</p>
      </div>

    </section>
  </main>
</template>