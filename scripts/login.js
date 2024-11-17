// Función para cargar los usuarios desde el archivo JSON
async function loadUsers() {
    const response = await fetch('./utils/usuarios.json'); // Asegúrate de que este archivo esté alojado en el servidor
    const users = await response.json();
    return users;
}

// Función de validación de inicio de sesión
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault(); 

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    loadUsers().then(users => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            console.log('Usuario guardado en localStorage:', user); // Verifica si se guarda correctamente
            window.location.href = 'opciones.html'; 
        } else {
            alert('Correo electrónico o contraseña incorrectos.');
        }
    });
});

// Función para actualizar el menú de navegación y mostrar el nombre del usuario
function updateNav() {
    const user = JSON.parse(localStorage.getItem('loggedInUser')); // Obtener el usuario desde localStorage
    console.log('Usuario recuperado en opciones.html:', user);  // Para verificar si se está recuperando correctamente
    const nav = document.querySelector('.nav ul');
    const userNameSpan = document.getElementById('user-name');

    if (user) {
        const loginLink = nav.querySelector('li a[href="login.html"]');
        if (loginLink) {
            loginLink.parentElement.remove();  // Remueve el enlace de login
        }
        if (userNameSpan) {
            userNameSpan.textContent = user.nombre; // Mostrar el nombre del usuario
        }

        const logoutItem = document.createElement('li');
        logoutItem.innerHTML = `<a href="#" id="logout-btn">Cerrar sesión</a>`;
        nav.appendChild(logoutItem);

        document.getElementById('logout-btn').addEventListener('click', function () {
            localStorage.removeItem('loggedInUser');
            window.location.href = 'login.html';
        });
    } else {
        console.log('No se encontró usuario en localStorage');
    }
}

// Ejecutar la función cuando la página cargue
document.addEventListener('DOMContentLoaded', function () {
    updateNav();  // Asegúrate de que esto se ejecute cuando la página está completamente cargada
});
