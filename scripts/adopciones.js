let perrosData = []; // Variable para guardar los datos de los perros

document.addEventListener('DOMContentLoaded', function () {
  const contenedor = document.getElementById('contenedor-perros');
  const detalle = document.getElementById('perro-detalle');
  const volverLista = document.createElement('button'); // Botón para volver a la lista
  volverLista.textContent = "Volver a la lista";
  volverLista.classList.add('volver-lista');
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
    `;
    detalle.appendChild(detalleContenido);

    // Mostrar el contenedor de detalles y ocultar el contenedor de la lista
    detalle.style.display = 'block';
    contenedor.style.display = 'none';
  }

  // Evento para volver a la lista de perros
  volverLista.addEventListener('click', function () {
    window.location.href = "/adoptar.html";
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