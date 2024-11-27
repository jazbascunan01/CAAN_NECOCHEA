const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const images = document.querySelector('.carousel-images');
const imageWidth = images.children[0].offsetWidth;
const visibleCount = 3; // Mostrar 3 imágenes a la vez
let currentIndex = 0;
let totalImages = images.children.length;

// Clonar las imágenes para crear un efecto de "ciclo continuo"
const cloneImages = () => {
    for (let i = 0; i < totalImages; i++) {
        const clone = images.children[i].cloneNode(true);
        images.appendChild(clone);
    }
};

cloneImages(); // Llamamos a la función de clonación de imágenes

// Desplazar hacia la derecha
next.addEventListener('click', () => {
    if (currentIndex <= totalImages) {
        currentIndex++;
        updateCarousel();
    }
});

// Desplazar hacia la izquierda
prev.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

// Actualizar el desplazamiento
function updateCarousel() {
    images.style.transition = 'transform 0.5s ease';
    images.style.transform = `translateX(-${currentIndex * imageWidth}px)`;

    // Si llega al final, mover rápidamente al inicio sin transición
    if (currentIndex === totalImages) {
        setTimeout(() => {
            images.style.transition = 'none';
            currentIndex = 0;
            images.style.transform = `translateX(0)`;
            setTimeout(() => {
                images.style.transition = 'transform 0.5s ease';
            }, 50); // Agrega un pequeño delay para evitar "flickering"
        }, 500); // Tiempo para completar la transición antes de resetear
    }

    // Si retrocede desde el inicio, mover rápidamente al final del ciclo
    if (currentIndex < 0) {
        setTimeout(() => {
            images.style.transition = 'none';
            currentIndex = totalImages - 1;
            images.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
            setTimeout(() => {
                images.style.transition = 'transform 0.5s ease';
            }, 50);
        }, 500);
    }
}
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-image');
const imagesArray = document.querySelectorAll('.carrusel_img');
const closeBtn = document.querySelector('.close');
const prevModalBtn = document.querySelector('.prev-modal');
const nextModalBtn = document.querySelector('.next-modal');
let currentImageIndex = 0;

// Función para abrir el modal con la imagen seleccionada
function openModal(index) {
    currentImageIndex = index;
    modal.style.display = 'block';
    modalImg.src = imagesArray[currentImageIndex].src;
}

// Evento para cerrar el modal
closeBtn.onclick = () => {
    modal.style.display = 'none';
};

// Eventos para los botones de navegación dentro del modal
prevModalBtn.onclick = () => {
    currentImageIndex = (currentImageIndex - 1 + imagesArray.length) % imagesArray.length;
    modalImg.src = imagesArray[currentImageIndex].src;
};

nextModalBtn.onclick = () => {
    currentImageIndex = (currentImageIndex + 1) % imagesArray.length;
    modalImg.src = imagesArray[currentImageIndex].src;
};

// Añadir eventos a cada imagen del carrusel para abrir el modal
imagesArray.forEach((img, index) => {
    img.addEventListener('click', () => openModal(index));
});

// Cerrar el modal si se hace clic fuera de la imagen
window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};
