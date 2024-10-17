// Este código se ejecuta cuando el DOM está listo
$(document).ready(function() {
    let data = [];

    // Cuando el usuario hace clic en el botón para obtener los datos
    $('#btnFetch').click(function() {
        // URL de la API REST
        const apiUrl = 'https://g9e7c4763464a15-umapromises.adb.eu-madrid-1.oraclecloudapps.com/ords/javier_campos/todo_junto/'; // Cambia a la URL de tu API
        // Llamada AJAX a la API REST
        $.ajax({
            url: apiUrl,
            method: 'GET',
            success: function(response) {
                data = response.items;
                renderTable(data);
                calculateStatistics(data);
            },
            error: function() {
                alert('Error al obtener los datos de la API.');
            }
        });



    });

    // Renderiza la tabla con los datos
    function renderTable(data) {
        // Limpiar el cuerpo de la tabla antes de cargar nuevos datos
        $('#dataTable tbody').empty();
        // Iterar sobre los datos recibidos y agregar filas a la tabla
        data.forEach(item => {
            const row = `<tr>
                <td>${item.id}</td>
                <td>${item.ambito_nombre}</td>
                <td>${item.embalse_nombre}</td>
                <td>${item.agua_total}</td>
                <td>${item.electrico_flag}</td>
                <td>${item.codigo}</td>
                <td>${item.nombre}</td>
                <td>${item.embalse}</td>
                <td>${item.x}</td>
                <td>${item.y}</td>
                <td>${item.demarc}</td>
                <td>${item.cauce}</td>
                <td>${item.google}</td>
                <td>${item.openstreetmap}</td>
                <td>${item.wikidata}</td>
                <td>${item.provincia}</td>
                <td>${item.ccaa}</td>
                <td>${item.tipo}</td>
                <td>${item.cota_coron}</td>
                <td>${item.alt_cimien}</td>
                <td>${item.informe}</td>
                <td>${item.liks}</td>
            </tr>`;
            $('#dataTable tbody').append(row);
        });
    }

    // Filtra los datos según el atributo seleccionado y el filtro ingresado
    $('#btnFilter').click(function() {
        const attribute = $('#attribute').val();
        const filterValue = $('#filter').val().toLowerCase();
        const filteredData = data.filter(item => item[attribute].toString().toLowerCase().includes(filterValue));
        renderTable(filteredData);
        calculateStatistics(filteredData);
    });

    // Calcula estadísticas de los datos
    function calculateStatistics(data) {
        if (data.length === 0) return;

        const values = data.map(item => parseFloat(item.valor)).filter(val => !isNaN(val));
        const maxValue = Math.max(...values);
        const minValue = Math.min(...values);
        const meanValue = values.reduce((a, b) => a + b, 0) / values.length;

        $('#maxValue').text(maxValue);
        $('#minValue').text(minValue);
        $('#meanValue').text(meanValue.toFixed(2));
    }
});
