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

// Función para obtener el país del usuario
function getUserCountry(callback) {
   fetch('https://ipinfo.io/json?token=a0395a25568001') // Reemplaza TU_TOKEN con tu token de ipinfo.io
       .then(response => response.json())
       .then(data => {
           const country = data.country; // Código de país (ejemplo: "US" para Estados Unidos)
           callback(country);
       })
       .catch(error => {
           console.error('Error al obtener la ubicación:', error);
           callback(null); // En caso de error, usar un número por defecto
       });
}

// Función para abrir WhatsApp con un mensaje personalizado
function openWhatsApp(productName, price, country) {
   let phoneNumber;

   // Asignar el número de teléfono según el país
   switch (country) {
       case 'US': // Estados Unidos
           phoneNumber = "+19174313384"; // Reemplaza con el número de EE.UU.
           break;
       case 'DO': // República Dominicana
           phoneNumber = "+18493904282"; // Reemplaza con el número de República Dominicana
           break;
       default: // Número por defecto (puedes cambiarlo)
           phoneNumber = "+182939733600"; // Reemplaza con un número por defecto
           break;
   }

   const message = `Hola, estoy interesado en comprar el producto: ${productName} por un precio de ${price}. ¿Podrías darme más información?`;
   const encodedMessage = encodeURIComponent(message);
   const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
   window.open(whatsappURL, '_self');
}

// Agregar evento de clic a los botones de compra
document.querySelectorAll('.btn-primary').forEach(button => {
   button.addEventListener('click', () => {
       const productCard = button.closest('.product-card');
       const productName = productCard.querySelector('.product-name').textContent;
       const price = productCard.querySelector('.price').textContent;

       // Obtener el país del usuario y abrir WhatsApp
       getUserCountry(country => {
           openWhatsApp(productName, price, country);
       });
   });
});
