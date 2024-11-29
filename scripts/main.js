document.addEventListener('DOMContentLoaded', () => {
    AOS.init();
    new WOW().init();
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
    document.querySelector('.logo-container').addEventListener('click', function () {
        window.location.href = 'index.html';
    });
    // Obtiene la URL de la página actual
    const currentPage = window.location.pathname.split("/").pop();

    // Selecciona todos los enlaces de navegación
    const navLinks = document.querySelectorAll(".nav a");

    // Itera sobre los enlaces para comprobar cuál coincide con la página actual
    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active"); // Añade la clase 'active' al enlace actual
        }
    });
});

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
        // Reemplazar el enlace de "Registrarse" por "Opciones"
        const registerLink = nav.querySelector('li a[href="Registro.html"]');
        if (registerLink) {
            registerLink.textContent = 'Opciones';
            registerLink.href = 'opciones.html';
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
        // Si no hay usuario, mostrar el enlace de "Iniciar sesión"
        userNameLink.innerHTML = `<a href="login.html">Iniciar sesión</a>`;  // Mostrar el enlace de login
        logoutDropdown.style.display = 'none';  // Ocultar el dropdown de logout
    }
}

// Ejecutar la función cuando la página cargue
document.addEventListener('DOMContentLoaded', function () {
    updateNav();  // Asegúrate de que esto se ejecute cuando la página está completamente cargada
});
function setOrigin(origin) {
    localStorage.setItem('origin', origin);
}
