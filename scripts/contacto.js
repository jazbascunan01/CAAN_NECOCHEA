 // Coordenadas de la intersección de las calles 107 y 66 en Necochea
 var coordenadas = [-38.568917, -58.766749];
    
 // Inicializar el mapa
 var map = L.map('map').setView(coordenadas, 15);

 // Añadir capa base (mapa) desde OpenStreetMap
 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
     attribution: '© OpenStreetMap contributors'
 }).addTo(map);

 // Añadir un marcador en la ubicación deseada
 L.marker(coordenadas).addTo(map)
     .bindPopup('Intersección de las calles 107 y 66, Necochea, Buenos Aires')
     .openPopup();