//Calcular factura
function mostrarFactura() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const regalos = JSON.parse(localStorage.getItem("regalias")) || [];

  const lista = document.getElementById("lista-productos");
  const detalle = document.getElementById("detalle-costos");

  lista.innerHTML = "";
  detalle.innerHTML = "";

  // FILTRAR perfumes duplicados: eliminar versiones sin "ml"
  const productosFiltrados = carrito.filter(
    (p, i, self) =>
      p.nombre.toLowerCase().includes("ml") ||
      !self.some(
        (o, j) => j > i && o.nombre.split(" ")[0] === p.nombre.split(" ")[0]
      )
  );

  // ORDENAR: primero los perfumes pagos
  let subtotal = 0;
  productosFiltrados.forEach(producto => {
    const item = document.createElement("li");
            subtotal += parseInt(producto.precio);
  });

  // Mostrar perfumes de regalía si existen
  if (regalos.length > 0) {
    const separador = document.createElement("li");
    
    lista.appendChild(separador);

    regalos.forEach(regalo => {
      const item = document.createElement("li");
      item.textContent = `${regalo.nombre} - ₡0`;
      lista.appendChild(item);
    });
  }

  // Calcular costo de envío y monto de regalía
  let costoEnvio = 3500;
  let montoRegalia = 0;

  if (subtotal >= 20000 && subtotal < 55000) {
    costoEnvio = 2000;
    montoRegalia = 3000;
  } else if (subtotal >= 55000) {
    costoEnvio = 0;
    montoRegalia = 6000;
  }

  const totalFinal = parseInt(subtotal) + parseInt(costoEnvio);

  detalle.innerHTML = `
    <hr>
    Subtotal: ₡${subtotal.toLocaleString()}<br>
    Envío: ₡${costoEnvio.toLocaleString()}<br>
    Regalía: ₡${montoRegalia.toLocaleString()}<br>
    <strong>Total a pagar: ₡${totalFinal.toLocaleString()}</strong>
  `;
}


//Calcular factura

document.getElementById("btn-vaciar").addEventListener("click", () => {
  localStorage.removeItem("carrito");
  localStorage.removeItem("regalias");
  mostrarFactura();
});


document.addEventListener('DOMContentLoaded', () => {
     mostrarFactura(); 
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const lista = document.getElementById('lista-productos');
    const total = document.getElementById('total');
    let suma = 0;

    carrito.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nombre} - ${item.cantidad} - ₡${item.precio}`;
        lista.appendChild(li);
        suma += parseInt(item.precio);
    });

    total.textContent = `Total a pagar: ₡${suma}`;
});


function generarYEnviarFactura() {
    const factura = document.getElementById('factura');

    html2canvas(factura).then(canvas => {
        const imgData = canvas.toDataURL('image/png');

        // Descargar como imagen (opcional)
        // let link = document.createElement('a');
        // link.download = 'factura.png';
        // link.href = imgData;
        // link.click();

        // Subir a un servidor o mostrar y copiar base64 (en este caso, usar solo texto en WhatsApp)
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        let mensaje = "📦 *Pedido de Perfumes:*\n\n";

        let total = 0;
        carrito.forEach(item => {
            mensaje += `• ${item.nombre} - ${item.cantidad} - ₡${item.precio}\n`;
            total += parseInt(item.precio);
        });
        mensaje += `\n💰 *Total: ₡${total}*`;

        // Reemplaza el número por el tuyo
        const numero = "+50663150332"; 
        const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

        window.open(url, '_blank');
    });
}
