
document.addEventListener('DOMContentLoaded', () => {
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

