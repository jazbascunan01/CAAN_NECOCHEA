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

  // Verificar si el usuario está logueado
  const user = JSON.parse(localStorage.getItem('loggedInUser'));

  // Función para mostrar los detalles de un perro
  function mostrarDetalle(perro) {
    detalle.innerHTML = ''; // Limpiar contenido previo
    detalle.appendChild(volverLista); // Agregar botón "Volver a la lista"

    const detalleContenido = document.createElement('div');
    detalleContenido.classList.add('detalle-contenido');
    detalleContenido.innerHTML = `
    <div class="detalle-contenido-container">
      <img src="${perro.imagen}" alt="Imagen de ${perro.nombre}">
      <div class="detalle-info">
        <h2>${perro.nombre}</h2>
        <p>Raza: ${perro.raza}</p>
        <p>Edad: ${perro.edad} años</p>
        <p>${perro.descripcion}</p>
        <button id="adoptar-button" class="adoption-button" data-id="${perro.id}">Adoptar</button>
        </div>
      </div>
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
    <div class="pantalla-confirmacion">
      <img src="${perro.imagen}" alt="Imagen de ${perro.nombre}">
      <div>
      <h2>Confirmación de Adopción</h2>
      <p>¿Estás seguro de que deseas adoptar a ${perro.nombre}?</p>
      <button id="cancelar-adopcion" class="btn-adopcion-cancelar" >Cancelar</button>
      <button id="confirmar-adopcion" class="btn-adopcion-confirmar" >Confirmar</button>
      </div>

    <div
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
    <div class="mensaje-confirmacion">
      <h2>¡Solicitud de adopción confirmada!</h2>
      <p>¡Has pedido adoptar a ${perro.nombre}!</p>
      <p>A la brevedad, uno de nuestros voluntarios se contactará con vos para indicarte como continuar.</p>
      <p>¡Gracias por tu compromiso!</p>
      <button id="volver-inicio" class="adoption-button">Volver al inicio</button>
    <div>
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
      perrosData = perros;
      let offsetMultiplier = 100; // Comienza con 100 para el primer ciclo

      const tarjetasHTML = perros.map((perro, index) => {
          // Calcula el offset, aumentando 50 en cada iteración
          const offset = index * offsetMultiplier;
          
          // Aumenta el offsetMultiplier en 50 para el siguiente ciclo
          offsetMultiplier += 10;

          return `
              <div class="tarjeta-perro" 
                  data-aos="zoom-in-up" 
                  data-aos-duration="1000" 
                  data-aos-offset="${offset}">
                  <img src="${perro.imagen}" alt="Imagen de ${perro.nombre}">
                  <h3>${perro.nombre}</h3>
                  <p>Raza: ${perro.raza}</p>
                  <p>Edad: ${perro.edad} años</p>
                  <p>${perro.descripcion}</p>
                  ${user ? `<button class="adoption-button" data-id="${perro.id}">Ver más</button>` : ''}
              </div>
          `;
      }).join('');

      contenedor.innerHTML = tarjetasHTML;

      // Asegúrate de llamar a AOS.refresh después de modificar el DOM
      AOS.refresh();

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

          mostrarDetalle(perroSeleccionado);
        } else {
          console.error('Perro no encontrado con id:', id);
        }
      });
    });
  }
});