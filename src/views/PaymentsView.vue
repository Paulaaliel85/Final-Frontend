<template>
  <main class="page">

    <h1 class="page-title">Mis pagos</h1>

    <p class="page-subtitle">
      Consultá el estado de tus compras y cuotas.
    </p>

    <section class="payment-summary">

      <h2>Compra #0001</h2>

      <p>Brochas + Mascara Lash Sensational</p>

      <p>
        <strong>Total:</strong> $97000
      </p>

      <p>
        <strong>Plan:</strong> 6 cuotas
      </p>

      <div class="progress">
        <div class="progress-bar"></div>
      </div>

      <p>1 de 6 cuotas pagadas</p>

    </section>

    <table class="payment-table">

      <thead>
        <tr>
          <th>Cuota</th>
          <th>Vencimiento</th>
          <th>Importe</th>
          <th>Estado</th>
        </tr>
      </thead>

      <tbody>

        <tr>
          <td>1</td>
          <td>10/09/2026</td>
          <td>$161.667</td>
          <td class="status-paid">✓ Pagada</td>
        </tr>

        <tr>
          <td>2</td>
          <td>10/10/2026</td>
          <td>$161.667</td>
          <td class="status-pending"> Pendiente</td>
        </tr>

        <tr>
          <td>3</td>
          <td>10/11/2026</td>
          <td>$161.667</td>
          <td class="status-pending"> Pendiente</td>
        </tr>

        <tr>
          <td>4</td>
          <td>10/12/2026</td>
          <td>$161.667</td>
          <td class="status-pending"> Pendiente</td>
        </tr>

        <tr>
          <td>5</td>
          <td>10/01/2027</td>
          <td>$161.667</td>
          <td class="status-pending"> Pendiente</td>
        </tr>

        <tr>
          <td>6</td>
          <td>10/02/2027</td>
          <td>$161.667</td>
          <td class="status-pending"> Pendiente</td>
        </tr>

      </tbody>

    </table>

  </main>
</template>