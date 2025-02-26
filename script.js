// Abrir y cerrar el menú lateral
const menuIcon = document.getElementById('menu-icon');
const sidebar = document.getElementById('sidebar');

// Abrir menú al hacer clic en el ícono
menuIcon.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});

// Cerrar menú al quitar el puntero
sidebar.addEventListener('mouseleave', () => {
    sidebar.classList.remove('open');
});
