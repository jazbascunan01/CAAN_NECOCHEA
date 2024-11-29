// Obtener todos los botones de 'Ser Voluntario' y 'Asociarte'
const voluntarioBtn = document.querySelector('a[href="login.html"][data-action="voluntario"]');
const asociarseBtn = document.querySelector('a[href="login.html"][data-action="asociarse"]');

// Función para manejar el clic en los botones
function handleButtonClick(event) {
    // Prevenir que el enlace siga su comportamiento predeterminado
    event.preventDefault();

    // Verificar si el usuario está logueado
    const user = JSON.parse(localStorage.getItem('loggedInUser')); 

    // Redirigir dependiendo de si el usuario está logueado o no
    if (user) {
        if (event.target.dataset.action === 'voluntario') {
            // Redirigir a la página de voluntariado
            window.location.href = "voluntario.html";  // Cambia por la URL correcta
        } else if (event.target.dataset.action === 'asociarse') {
            // Redirigir a la página de asociarse
            window.location.href = "asociarte.html";  // Cambia por la URL correcta
        }
    } else {
        // Si no está logueado, redirigir al login
        window.location.href = "login.html";
    }
}

// Añadir el manejador de eventos a ambos botones
voluntarioBtn.addEventListener('click', handleButtonClick);
asociarseBtn.addEventListener('click', handleButtonClick);
