document.addEventListener('DOMContentLoaded', function() {
    fetch('./utils/eventos.json')
        .then(response => response.json())
        .then(data => {
            const contenedorEventos = document.getElementById('contenedor-eventos');
            data.forEach(evento => {
                const tarjeta = document.createElement('div');
                tarjeta.classList.add('tarjeta-evento');

                tarjeta.innerHTML = `
                    <img src="${evento.imagen}" alt="${evento.titulo}" class="tarjeta-image">
                    <div class="tarjeta-content">
                        <h3>${evento.titulo}</h3>
                        <p>${evento.descripcion}</p>
                        <p><strong>Fecha:</strong> ${evento.fecha}</p>
                        <p><strong>Hora:</strong> ${evento.hora}</p>
                        <p><strong>Ubicación:</strong> ${evento.ubicacion}</p>
                        <p><strong>Precio:</strong> ${evento.precio}</p>
                    </div>
                `;
                contenedorEventos.appendChild(tarjeta);
            });
        })
        .catch(error => console.error('Error cargando los eventos:', error));
});