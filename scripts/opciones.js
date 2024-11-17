// Función para actualizar el menú de navegación y mostrar el nombre del usuario
function updateNav() {
    const user = JSON.parse(localStorage.getItem('loggedInUser')); // Obtener el usuario desde localStorage
    console.log('Usuario recuperado en opciones.html:', user);  // Verificar si se está recuperando correctamente

    const nav = document.querySelector('.nav ul'); // Selecciona la barra de navegación
    const userNameLink = document.getElementById('user-name-link'); // El enlace del nombre del usuario
    const logoutDropdown = document.getElementById('logout-dropdown'); // El contenedor desplegable para cerrar sesión

    if (user) {
        // Remover el enlace de login
        const loginLink = nav.querySelector('li a[href="login.html"]');
        if (loginLink) {
            loginLink.parentElement.remove();  // Remueve el enlace de login si existe
        }

        // Actualizar el texto con el nombre del usuario
        userNameLink.innerHTML = `<a href="#">${user.name}</a>`;  // Mostrar el nombre del usuario usando "name"

        // Hacer visible el contenedor de opciones de cierre de sesión al hacer clic en el nombre del usuario
        userNameLink.addEventListener('click', function () {
            logoutDropdown.classList.toggle('show'); // Toggle para mostrar/ocultar el dropdown
        });

        // Crear el enlace de "Cerrar sesión" solo cuando el usuario esté logueado
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function () {
                localStorage.removeItem('loggedInUser');  // Eliminar el usuario del localStorage
                window.location.href = 'login.html';  // Redirigir al login
            });
        }

    } else {
        console.log('No se encontró usuario en localStorage, redirigiendo a login');
        window.location.href = 'login.html';  // Si no hay usuario, redirigir al login
    }
}

// Ejecutar la función cuando la página cargue
document.addEventListener('DOMContentLoaded', function () {
    updateNav();  // Asegúrate de que esto se ejecute cuando la página está completamente cargada
});