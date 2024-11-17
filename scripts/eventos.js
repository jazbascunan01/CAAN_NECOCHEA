document.addEventListener('DOMContentLoaded', function() {
    let eventosData = []; // Variable para guardar los datos de los eventos

    const contenedorEventos = document.getElementById('contenedor-eventos');
    const detalle = document.getElementById('evento-detalle');
    const volverLista = document.createElement('button'); // Botón para volver a la lista
    volverLista.textContent = "Volver a la lista";
    volverLista.classList.add('volver-lista');
    volverLista.classList.add('event-button');
    volverLista.style.marginBottom = '20px';

    // Función para mostrar los detalles de un evento
    function mostrarDetalle(evento) {
        detalle.innerHTML = ''; // Limpiar contenido previo
        detalle.appendChild(volverLista); // Agregar botón "Volver a la lista"

        const detalleContenido = document.createElement('div');
        detalleContenido.classList.add('detalle-contenido');
        detalleContenido.innerHTML = `
            <img src="${evento.imagen}" alt="${evento.titulo}" class="detalle-image">
            <h2>${evento.titulo}</h2>
            <p>${evento.descripcion}</p>
            <p><strong>Fecha:</strong> ${evento.fecha}</p>
            <p><strong>Hora:</strong> ${evento.hora}</p>
            <p><strong>Ubicación:</strong> ${evento.ubicacion}</p>
            <p><strong>Precio:</strong> ${evento.precio}</p>
            <button class="event-button" data-id="${evento.id}">Participar</button>
        `;
        detalle.appendChild(detalleContenido);

        // Mostrar el contenedor de detalles y ocultar el contenedor de la lista
        detalle.style.display = 'block';
        contenedorEventos.style.display = 'none';
    }

    // Evento para volver a la lista de eventos
    volverLista.addEventListener('click', function () {
        window.location.href = "/eventos.html";
    });

    fetch('./utils/eventos.json')
        .then(response => response.json())
        .then(data => {
            eventosData = data; // Actualizar eventosData con los datos obtenidos
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
                        <button class="event-button" data-id="${evento.id}">Ver más</button>
                    </div>
                `;
                contenedorEventos.appendChild(tarjeta);
            });

            // Agregar evento de clic a los botones "Participar"
            agregarEventosParticipar();
        })
        .catch(error => console.error('Error cargando los eventos:', error));

    // Función para agregar eventos a los botones "Participar"
    function agregarEventosParticipar() {
        const botonesParticipar = document.querySelectorAll('.event-button');
        botonesParticipar.forEach(button => {
            button.addEventListener('click', function () {
                const id = this.getAttribute('data-id');
                const eventoSeleccionado = eventosData.find(evento => evento.id.toString() === id);
                if (eventoSeleccionado) {
                    mostrarDetalle(eventoSeleccionado);
                } else {
                    console.error('Evento no encontrado con id:', id);
                }
            });
        });
    }
});