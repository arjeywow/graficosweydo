// Abrir y cerrar el menú lateral
const menuIcon = document.getElementById('menu-icon');
const sidebar = document.getElementById('sidebar');

// Bandera para detectar si es un dispositivo táctil
let isTouchDevice = false;

// Detectar si el dispositivo es táctil
document.addEventListener('touchstart', () => {
    isTouchDevice = true;
}, { once: true }); // Solo se ejecuta una vez

// Abrir menú al hacer clic en el ícono
menuIcon.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});

// Cerrar menú al quitar el puntero (solo en dispositivos no táctiles)
if (!isTouchDevice) {
    sidebar.addEventListener('mouseleave', () => {
        sidebar.classList.remove('open');
    });
}

// Cerrar menú al hacer clic fuera de él (funciona en todos los dispositivos)
document.addEventListener('click', (event) => {
    const isClickInsideMenu = sidebar.contains(event.target);
    const isClickOnMenuIcon = menuIcon.contains(event.target);

    if (!isClickInsideMenu && !isClickOnMenuIcon) {
        sidebar.classList.remove('open');
    }
});

// Función para abrir WhatsApp con un mensaje personalizado
function openWhatsApp(productName, price) {
    const phoneNumber = "1234567890"; // Reemplaza con tu número de teléfono
    const message = `Hola, estoy interesado en comprar este producto: ${productName} por un precio de ${price}. ¿Podrías darme más información?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${+18493904282}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

// Agregar evento de clic a los botones de compra
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', () => {
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('.product-name').textContent;
        const price = productCard.querySelector('.price').textContent;
        openWhatsApp(productName, price);
    });
});
