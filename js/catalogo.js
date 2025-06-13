/*Boton Flotante*/
document.getElementById('envio-info-btn').addEventListener('click', function () {
  const box = document.getElementById('envio-info-box');
  box.style.display = box.style.display === 'block' ? 'none' : 'block';
});



/*Regalias*/
document.addEventListener("DOMContentLoaded", function () {
  
  // Obtener el carrito desde localStorage
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Lista de perfumes disponibles para regalía (precio ≤ 6000)
  const perfumesRegalables = [
    { id: 1, nombre: "Dior Sauvage EDT 1ml", precio: 3000 },
    { id: 2, nombre: "Bleu de Chanel 2ml", precio: 4000 },
    { id: 3, nombre: "Creed Aventus 1ml", precio: 4000 },
    { id: 4, nombre: "Fahrenheit 2ml", precio: 6000 },
    { id: 5, nombre: "Alexandria II 1ml", precio: 4000 },
    { id: 6, nombre: "6 Place Saint Sulpice 1ml", precio: 4000 },
    { id: 7, nombre: "Eau de Parfum Intense 2ml", precio: 3000 },
    { id: 8, nombre: "Light Blue Summer 5ml", precio: 5000 },
    { id: 9, nombre: "Imagine Poseidon Chilling At 2ml", precio: 3000 },
    { id: 10, nombre: "Paragon 1ml", precio: 4000 },
    { id: 11, nombre: "Ani X 2ml", precio: 6000 }
  ];

 

  // Calcular total de compra
  const total = carrito.reduce((sum, p) => sum + Number(p.precio), 0);
  

  // Definir límites y costo de envío
  let limiteRegalia = 0;
  let costoEnvio = 3500;

  if (total >= 20000 && total < 55000) {
    limiteRegalia = 3000;
    costoEnvio = 2000;
  } else if (total >= 55000) {
    limiteRegalia = 6000;
    costoEnvio = 0;
  }

  // Mostrar botón de regalía si aplica
  const btn = document.getElementById("btn-regalia");
  const modal = document.getElementById("modal-regalia");
  const lista = document.getElementById("lista-regalos");
  const totalDisplay = document.getElementById("regalo-total");
  const limiteDisplay = document.getElementById("limite-regalo");

  if (limiteRegalia > 0) {
    btn.style.display = "block";
    // Toggle modal display on button click
    btn.addEventListener("click", () => {
      if (modal.style.display === "flex") {
        modal.style.display = "none";
      } else {
        abrirModal(perfumesRegalables, limiteRegalia);
      }
    });
  } else {
    btn.style.display = "none";
  }

  // Modal para elegir regalos
 function abrirModal(productos, limite) {
  modal.style.display = "flex";
  lista.innerHTML = "";
  totalDisplay.textContent = "0";
  limiteDisplay.textContent = limite;

  // Filtrar perfumes que cumplan con el límite
  const perfumesPermitidos = productos.filter(p => Number(p.precio) <= Number(limite));

  perfumesPermitidos.forEach(p => {
    const div = document.createElement("div");
    div.innerHTML = `
      <label>
        <input type="checkbox" data-precio="${p.precio}" data-nombre="${p.nombre}"> 
        ${p.nombre} - ₡${Number(p.precio).toLocaleString()}
      </label>
    `;
    lista.appendChild(div);
  });

  // Controlar total seleccionado en vivo
  lista.addEventListener("change", () => {
    let totalRegalo = 0;
    lista.querySelectorAll("input[type='checkbox']:checked").forEach(chk => {
      totalRegalo += Number(chk.dataset.precio);
    });

    totalDisplay.textContent = totalRegalo;

    if (totalRegalo > limite) {
      alert("Has excedido el monto permitido para regalías.");
    }
  });

  document.getElementById("confirmar-regalos").onclick = () => {
    const seleccionados = [];
    let totalRegalo = 0;

    lista.querySelectorAll("input[type='checkbox']:checked").forEach(chk => {
      const precio = Number(chk.dataset.precio);
      if (totalRegalo + precio <= limite) {
        totalRegalo += precio;
        seleccionados.push({ nombre: chk.dataset.nombre, precio: 0 });
      }
    });

    localStorage.setItem("regalias", JSON.stringify(seleccionados));
    cerrarModal();
    mostrarFactura();
  };
}


  window.cerrarModal = () => {
    modal.style.display = "none";
  };

  // Mostrar resumen de factura
  function mostrarFactura() {
    const contenedor = document.getElementById("factura");
    contenedor.innerHTML = "<h3>Factura</h3>";
    let subtotal = 0;

    carrito.forEach(p => {
      contenedor.innerHTML += `<p>${p.nombre}: ${p.cantidad}: ₡${p.precio}</p>`;        //REVISIÓN 
      subtotal += p.precio;
    });

    const regalos = JSON.parse(localStorage.getItem("regalias")) || [];
    if (regalos.length > 0) {
      contenedor.innerHTML += "<h4>Perfumes de regalía:</h4>";
      regalos.forEach(r => {
        contenedor.innerHTML += `<p>${r.nombre}: ₡0</p>`;
      });
    }

    contenedor.innerHTML += `<hr><p>Subtotal: ₡${subtotal}</p>`;
    contenedor.innerHTML += `<p>Costo de envío: ₡${costoEnvio}</p>`;
    contenedor.innerHTML += `<h4>Total: ₡${subtotal + costoEnvio}</h4>`;
    contenedor.innerHTML += `<button onclick="window.print()">🖨 Imprimir factura</button>`;
  }

  // Mostrar la factura de una vez si ya existen regalías
  mostrarFactura();
});



document.getElementById('casaPerfumera').addEventListener('change', function () {
    const casaSeleccionada = this.value.toLowerCase();
    const tarjetas = document.querySelectorAll('.casa-perfumera'); // Ajusta si usas otra clase

    tarjetas.forEach(tarjeta => {
        const casa = tarjeta.getAttribute('data-casa').toLowerCase();
        if (casaSeleccionada === 'todas' || casa === casaSeleccionada) {
            tarjeta.style.display = 'block';
        } else {
            tarjeta.style.display = 'none';
        }
    });
});

document.querySelectorAll('.ver-mas-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const section = btn.closest('.casa-perfumera');
        const cards = section.querySelectorAll('.producto-card');
        const mostrar = btn.innerText === 'Ver más';

        if (mostrar) {
            // Mostrar todos
            cards.forEach(card => card.style.display = 'block');
            btn.innerText = 'Ver menos';
        } else {
            // Ocultar según resolución
            cards.forEach((card, index) => {
                card.style.display = 'none'; // Ocultar todos primero
            });

            let cantidadVisible = 4; // PC por defecto

            if (window.innerWidth <= 768) {
                cantidadVisible = 2; // Móvil
            } else if (window.innerWidth <= 1024) {
                cantidadVisible = 3; // Tablet
            }

            for (let i = 0; i < cantidadVisible; i++) {
                if (cards[i]) cards[i].style.display = 'block';
            }

            btn.innerText = 'Ver más';
        }
    });
});
    function agregarAlCarrito(nombre, cantidad, precio) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    carrito.push({ nombre, cantidad, precio });           //REVISAR
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contador = document.getElementById('contador-carrito');
    if (contador) {
        contador.textContent = carrito.length;
    }
}

document.addEventListener('DOMContentLoaded', actualizarContadorCarrito);



// Marcar como nuevo (agrega dinámicamente la etiqueta si no está)
const nuevo = document.createElement('span');
nuevo.className = 'nuevo-badge';
nuevo.textContent = 'NUEVO';





