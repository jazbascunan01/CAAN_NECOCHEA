document.addEventListener('DOMContentLoaded', function () {
  let perrosData = []; // Variable para guardar los datos de los perros
  const contenedor = document.getElementById('contenedor-perros');
  const detalle = document.getElementById('perro-detalle');
  const confirmacion = document.getElementById('confirmacion-adopcion');
  const mensajeConfirmacion = document.getElementById('mensaje-confirmacion');
  const volverLista = document.createElement('button'); // Botón para volver a la lista
  volverLista.textContent = "Volver a la lista";
  volverLista.classList.add('volver-lista');
  volverLista.classList.add('adoption-button');
  volverLista.style.marginBottom = '20px';

  // Función para mostrar los detalles de un perro
  function mostrarDetalle(perro) {
    detalle.innerHTML = ''; // Limpiar contenido previo
    detalle.appendChild(volverLista); // Agregar botón "Volver a la lista"

    const detalleContenido = document.createElement('div');
    detalleContenido.classList.add('detalle-contenido');
    detalleContenido.innerHTML = `
      <img src="${perro.imagen}" alt="Imagen de ${perro.nombre}">
      <h2>${perro.nombre}</h2>
      <p>Raza: ${perro.raza}</p>
      <p>Edad: ${perro.edad} años</p>
      <p>${perro.descripcion}</p>
      <button id="adoptar-button" class="adoption-button" data-id="${perro.id}">Adoptar</button>
    `;
    detalle.appendChild(detalleContenido);

    // Mostrar el contenedor de detalles y ocultar el contenedor de la lista
    detalle.style.display = 'block';
    contenedor.style.display = 'none';
  // Agregar evento al botón "Adoptar"
  const botonAdoptar = detalle.querySelector('#adoptar-button');
  botonAdoptar.addEventListener('click', function () {
    mostrarConfirmacion(perro);
  });
}

// Función para mostrar la pantalla de confirmación
function mostrarConfirmacion(perro) {
  confirmacion.innerHTML = `
    <h2>Confirmación de Adopción</h2>
    <p>¿Estás seguro de que deseas adoptar a ${perro.nombre}?</p>
    <button id="confirmar-adopcion" class="adoption-button" >Confirmar</button>
    <button id="cancelar-adopcion" class="adoption-button" >Cancelar</button>
  `;

  // Mostrar la pantalla de confirmación y ocultar el contenedor de detalles
  confirmacion.style.display = 'block';
  detalle.style.display = 'none';

  // Agregar eventos a los botones de confirmación y cancelación
  document.getElementById('confirmar-adopcion').addEventListener('click', function () {
    mostrarMensajeConfirmacion(perro);
  });

  document.getElementById('cancelar-adopcion').addEventListener('click', function () {
    confirmacion.style.display = 'none';
    detalle.style.display = 'block';
  });
}

// Función para mostrar el mensaje de confirmación
function mostrarMensajeConfirmacion(perro) {
  mensajeConfirmacion.innerHTML = `
    <h2>¡Adopción Confirmada!</h2>
    <p>¡Has adoptado a ${perro.nombre}!</p>
    <button id="volver-inicio" class="adoption-button">Volver al inicio</button>
  `;

  // Mostrar el mensaje de confirmación y ocultar el contenedor de confirmación
  mensajeConfirmacion.style.display = 'block';
  confirmacion.style.display = 'none';
                
 


  // Agregar evento al botón "Volver al inicio"
  document.getElementById('volver-inicio').addEventListener('click', function () {
    mensajeConfirmacion.style.display = 'none';
    contenedor.style.display = 'flex';
  });
}

// Evento para volver a la lista de perros
volverLista.addEventListener('click', function () {
  detalle.style.display = 'none';
  contenedor.style.display = 'flex';
});

  fetch('./utils/perros.json')
    .then(response => response.json())
    .then(perros => {
      perrosData = perros; // Actualizar perrosData con los datos obtenidos
      perros.forEach(perro => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta-perro');
        tarjeta.innerHTML = `
          <img src="${perro.imagen}" alt="Imagen de ${perro.nombre}">
          <h3>${perro.nombre}</h3>
          <p>Raza: ${perro.raza}</p>
          <p>Edad: ${perro.edad} años</p>
          <p>${perro.descripcion}</p>
          <button class="adoption-button" data-id="${perro.id}">Ver más</button>
        `;
        contenedor.appendChild(tarjeta);
      });

      // Agregar evento de clic a los botones "Ver más"
      agregarEventosVerMas();
    })
    .catch(error => console.error('Error cargando los datos:', error));

  // Función para agregar eventos a los botones "Ver más"
  function agregarEventosVerMas() {
    const botonesVerMas = document.querySelectorAll('.adoption-button');
    botonesVerMas.forEach(button => {
      button.addEventListener('click', function () {
        const id = this.getAttribute('data-id');
        const perroSeleccionado = perrosData.find(perro => perro.id.toString() === id);
        if (perroSeleccionado) {
          console.log('Perro seleccionado:', perroSeleccionado);
          mostrarDetalle(perroSeleccionado);
        } else {
          console.error('Perro no encontrado con id:', id);
        }
      });
    });
  }
});