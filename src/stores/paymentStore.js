
import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const usePaymentStore = defineStore('payments', () => {
  // Recupera las compras guardadas cuando se carga la aplicación.
  const comprasGuardadas = localStorage.getItem('armaquillaje_compras')

  const compras = ref(
    comprasGuardadas ? JSON.parse(comprasGuardadas) : []
  )

  // Guarda automáticamente los cambios en localStorage.
  watch(
    compras,
    (nuevasCompras) => {
      localStorage.setItem(
        'armaquillaje_compras',
        JSON.stringify(nuevasCompras)
      )
    },
    { deep: true }
  )

  // Calcula las fechas de vencimiento de las cuotas.
  function obtenerVencimiento(meses) {
    const fecha = new Date()
    const diaOriginal = fecha.getDate()

    fecha.setDate(1)
    fecha.setMonth(fecha.getMonth() + meses)

    const ultimoDia = new Date(
      fecha.getFullYear(),
      fecha.getMonth() + 1,
      0
    ).getDate()

    fecha.setDate(Math.min(diaOriginal, ultimoDia))

    return fecha.toLocaleDateString('es-AR')
  }

  // Registra una compra y genera sus cuotas.
  function registrarCompra(productos, total, cantidadCuotas) {
    const importeBase = Math.floor(total / cantidadCuotas)
    const resto = Math.round(total - importeBase * cantidadCuotas)

    const cuotas = Array.from(
      { length: cantidadCuotas },
      (_, indice) => ({
        numero: indice + 1,
        importe: importeBase + (indice < resto ? 1 : 0),
        vencimiento: obtenerVencimiento(indice + 1),
        estado: 'Pendiente',
        fechaPago: null
      })
    )

    const nuevaCompra = {
      id: Date.now(),
      fecha: new Date().toLocaleDateString('es-AR'),

      productos: productos.map((producto) => ({
        id: producto.id,
        nombre: producto.nombre,
        cantidad: producto.cantidad || 1,
        precio: producto.precio,
        unidadesPorSet: producto.unidadesPorSet
      })),

      total,
      cantidadCuotas,
      cuotas,
      valorCuota: cuotas[0].importe,
      totalPagado: 0,
      saldoPendiente: total,
      proximaCuota: cuotas[0].vencimiento,
      estado: 'Pendiente'
    }

    compras.value.push(nuevaCompra)
  }

  // Marca una cuota como pagada.
  function pagarCuota(compraId, numeroCuota) {
    const compra = compras.value.find(
      (item) => item.id === compraId
    )

    if (!compra) return

    // Busca la primera cuota pendiente.
    const siguienteCuota = compra.cuotas.find(
      (cuota) => cuota.estado === 'Pendiente'
    )

    // Evita pagar cuotas fuera de orden.
    if (!siguienteCuota || siguienteCuota.numero !== numeroCuota) {
      return
    }

    siguienteCuota.estado = 'Pagada'
    siguienteCuota.fechaPago = new Date().toLocaleDateString('es-AR')

    // Actualiza los importes.
    compra.totalPagado = compra.cuotas
      .filter((cuota) => cuota.estado === 'Pagada')
      .reduce((total, cuota) => total + cuota.importe, 0)

    compra.saldoPendiente = compra.total - compra.totalPagado

    // Comprueba si todas las cuotas fueron pagadas.
    const todasPagadas = compra.cuotas.every(
      (cuota) => cuota.estado === 'Pagada'
    )

    if (todasPagadas) {
  // Elimina la compra de la lista inmediatamente.
  compras.value = compras.value.filter(
    (item) => item.id !== compraId
  )

  return
}

    // Actualiza el estado de la compra.
    if (compra.totalPagado > 0) {
      compra.estado = 'En curso'

      const proxima = compra.cuotas.find(
        (cuota) => cuota.estado === 'Pendiente'
      )

      compra.proximaCuota = proxima.vencimiento
    }
  }

  return {
    compras,
    registrarCompra,
    pagarCuota
  }
})
