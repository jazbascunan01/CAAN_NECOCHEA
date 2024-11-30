const user = JSON.parse(localStorage.getItem('loggedInUser')); // Obtener el usuario desde localStorage
console.log('Usuario recuperado en opciones.html:', user);  // Verificar si se está recuperando correctamente

const userNameLink = document.getElementById('user-name-saludo'); // El enlace del nombre del usuario

if (user) {
    userNameLink.innerHTML = user.name;
}