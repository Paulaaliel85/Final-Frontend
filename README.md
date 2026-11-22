# ARMAQUILLAJE

Aplicación web de una tienda de maquillaje orientada a la **venta mayorista** y a la **compra financiada en cuotas**. 

El usuario puede:

- Ver el catálogo de productos con sus precios y características.
- Agregar productos al carrito y modificar sus cantidades.
- Consultar el total de la compra.
- Elegir la cantidad de cuotas y registrar la compra.
- Consultar las cuotas en la sección **Mis pagos** y pagarlas en orden.
- Ver las compras ya realizadas en **Compras finalizadas**.

## Tecnologías utilizadas

| Tecnología | 
|---|---|
| **Vue 3** | Construcción de la interfaz con componentes y vistas (`ref`, `computed`, `onMounted`, `v-if`, `v-for`, `v-model`). |
| **Pinia** | Estado global: carrito, compras, cuotas e historial. |
| **Vue Router** | Navegación entre vistas sin recargar la página. |
| **Tailwind CSS** | Estilos mediante clases, con una identidad visual en tonos rosados, blanco y grises. |
| **LocalStorage** | Persistencia de compras e historial al recargar la página. |
| **Vite** | Servidor de desarrollo y compilación para producción. |

## Rutas

| Ruta | Vista |
|---|---|
| `/` | Página principal |
| `/productos` | Catálogo de productos |
| `/pagos` | Mis pagos y compras finalizadas |

## Estructura del proyecto

```text
Final-Frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── navbar.vue
│   │   └── CartModal.vue       # Modal del carrito: resumen, cuotas y confirmación
│   ├── router/
│   │   └── index.js            # Definición de rutas
│   ├── stores/
│   │   ├── cartStore.js        # Estado del carrito
│   │   └── paymentStore.js     # Compras, cuotas e historial
│   ├── views/
│   │   ├── HomeView.vue
│   │   ├── ProductsView.vue
│   │   └── PaymentsView.vue    # Mis pagos y Compras finalizadas
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── index.html
├── package.json
└── vite.config.js
```
## Cómo ejecutar el proyecto

```bash
# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```
