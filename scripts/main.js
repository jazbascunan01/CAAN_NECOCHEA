document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
});
fetch('./utils/perros.json')
  .then(response => response.json())
  .then(perros => {
    const contenedor = document.getElementById('contenedor-perros');
    perros.forEach(perro => {
      const tarjeta = document.createElement('div');
      tarjeta.classList.add('tarjeta-perro');
      tarjeta.innerHTML = `
        <img src="${perro.imagen}" alt="Imagen de ${perro.nombre}">
        <h3>${perro.nombre}</h3>
        <p>Raza: ${perro.raza}</p>
        <p>Edad: ${perro.edad} años</p>
        <p>${perro.descripcion}</p>
      `;
      contenedor.appendChild(tarjeta);
    });
  })
  .catch(error => console.error('Error cargando los datos:', error));
