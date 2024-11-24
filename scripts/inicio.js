document.addEventListener('DOMContentLoaded', function() {
    // Verificar si el usuario está logueado
    const user = JSON.parse(localStorage.getItem('loggedInUser'));

    const heroContent = document.querySelector('.hero-content');

    if (user) {
        // Si el usuario está logueado, mostrar un mensaje de agradecimiento
        heroContent.innerHTML = `
            <h2>Gracias por ser parte de CAAN, ${user.name}!</h2>
            <p>Tu apoyo ayuda a cambiar la vida de muchos animales necesitados.</p>
            <a href="opciones.html" class="cta-button">Ir a Opciones</a>
        `;
    } else {
        // Si el usuario no está logueado, mostrar el mensaje de registro
        heroContent.innerHTML = `
            <h2>No más perros en la calle, solo en el corazón de un hogar.</h2>
            <p>Únete a nuestra comunidad y ayuda a cambiar la vida de animales necesitados.</p>
            <a href="Registro.html" class="cta-button">Registrarse</a>
        `;
    }
document.querySelector('.adopt-card').addEventListener('click', function() {
    window.location.href = 'adoptar.html';
});
document.querySelector('.event-card').addEventListener('click', function() {
    window.location.href = 'eventos.html';
});
document.querySelector('.volunteer-card').addEventListener('click', function() {
    window.location.href = 'login.html';
});
document.querySelector('.donar-card').addEventListener('click', function() {
    window.location.href = 'donar.html';
});
});