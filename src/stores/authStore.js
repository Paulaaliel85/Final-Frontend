import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {

  const usuario = ref(null)

    const estaAutenticado = computed(() => {
    return usuario.value !== null
  })

  // Iniciar sesión
  function login(email, password) {

    // Usuario de prueba
    if (email === 'cliente@usuario.com' && password === '123456') {

      usuario.value = {
        id: 1,
        nombre: 'Paula',
        email: email
      }

      return true
    }

    return false
  }

  function logout() {
    usuario.value = null
  }

  return {
    usuario,
    estaAutenticado,
    login,
    logout
  }
})