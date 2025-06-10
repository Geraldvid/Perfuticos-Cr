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

    carrito.push({ nombre, cantidad, precio });
    
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

// Marcar como agotado
document.getElementById('perfume1').classList.add('agotado');

// Marcar como nuevo (agrega dinámicamente la etiqueta si no está)
const nuevo = document.createElement('span');
nuevo.className = 'nuevo-badge';
nuevo.textContent = 'NUEVO';
document.getElementById('perfume1').appendChild(nuevo);