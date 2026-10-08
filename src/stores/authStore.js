import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {

  // Usuario actualmente autenticado
  const usuario = ref(null)

  // Indica si existe una sesión iniciada
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

  // Cerrar sesión
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