let map; // Variable para el mapa
let circle; // Variable para el círculo

function initMap(lat, lng, radius) {
    const location = [lat, lng];

    // Si el mapa no ha sido creado, lo inicializamos
    if (!map) {
        map = L.map('map').setView(location, 8); // Ajusta el nivel de zoom según sea necesario

        // Capa de mapa de OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    } else {
        // Si el mapa ya existe, solo lo centramos en la nueva ubicación
        map.setView(location);
    }

    // Eliminar el círculo anterior si existe
    if (circle) {
        map.removeLayer(circle);
    }

    // Crear un nuevo círculo con el radio especificado por el usuario
    circle = L.circle(location, {
        color: 'blue',
        fillColor: '#30f',
        fillOpacity: 0.5,
        radius: radius * 1000 // Convertir a metros
    }).addTo(map);
}

document.getElementById("showMapBtn").addEventListener("click", function () {
    const lat = parseFloat(document.getElementById("lat").value);
    const lng = parseFloat(document.getElementById("lng").value);
    const radius = parseFloat(document.getElementById("radius").value);
    initMap(lat, lng, radius);
});

// Función para cargar los datos de la API
// Función para cargar los datos de la API
function loadEmbalses() {
    $.ajax({
        url: 'https://g9e7c4763464a15-umapromises.adb.eu-madrid-1.oraclecloudapps.com/ords/javier_campos/todo_junto/', // URL de la API
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log(data); // Para verificar la estructura de la respuesta

            // Asegúrate de que la estructura de los datos sea correcta
            if (data.items) { // Cambia 'items' si el nombre del array es diferente
                data.items.forEach(function(item) {
                    const lat = item.y; // Cambia esto si tu JSON tiene un nombre diferente
                    const lng = item.x; // Cambia esto si tu JSON tiene un nombre diferente
                    console.log(`Añadiendo marcador en: ${lat}, ${lng}`); // Para verificar las coordenadas
                    // Agregar un marcador en el mapa
                    L.marker([lat, lng], {
                        icon: L.icon({
                            iconUrl: 'ruta/a/icono_rojo.png', // Asegúrate de que la ruta sea correcta
                            iconSize: [25, 41]
                        })
                    }).addTo(map);
                });
            } else {
                console.error('No se encontró el array de items en la respuesta.');
            }
        },
        error: function(err) {
            console.error('Error al cargar datos:', err);
        }
    });
}

// Evento para cargar embalses al hacer clic en el botón
document.getElementById("loadDataBtn").addEventListener("click", loadEmbalses);
