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
