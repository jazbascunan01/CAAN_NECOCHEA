document.addEventListener('DOMContentLoaded', function() {
    fetch('./utils/eventos.json')
        .then(response => response.json())
        .then(data => {
            const contenedorEventos = document.getElementById('contenedor-eventos');
            data.forEach(evento => {
                const tarjeta = document.createElement('div');
                tarjeta.classList.add('tarjeta-evento');

                // Verificar si el evento necesita inscripción
                let botonInscripcion = '';
                if (evento.necesitaInscripcion) {
                    const usuarioLogueado = JSON.parse(localStorage.getItem('loggedInUser'));
                    botonInscripcion = usuarioLogueado 
                        ? `<a href="formulario_eventos.html?evento=${evento.titulo}" class="cta-button">Inscribirse</a>`
                        : `<a href="login.html" class="cta-button">Iniciar sesión para inscribirte</a>`;
                }

                tarjeta.innerHTML = `
                    <img src="${evento.imagen}" alt="${evento.titulo}" class="tarjeta-image">
                    <div class="tarjeta-content">
                        <h3>${evento.titulo}</h3>
                        <p>${evento.descripcion}</p>
                        <p><strong>Fecha:</strong> ${evento.fecha}</p>
                        <p><strong>Hora:</strong> ${evento.hora}</p>
                        <p><strong>Ubicación:</strong> ${evento.ubicacion}</p>
                        <p><strong>Precio:</strong> ${evento.precio}</p>
                        ${botonInscripcion}
                    </div>
                `;
                contenedorEventos.appendChild(tarjeta);
            });
        })
        .catch(error => console.error('Error cargando los eventos:', error));
});
