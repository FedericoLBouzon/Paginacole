document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/kiosco')
        .then(response => response.json())
        .then(data => {
            const productos = data.productos;
            let tablaProductos = document.getElementById('tablaProductos');
            let productoSelect = document.getElementById('productoSelect');

            // Función para actualizar la tabla con los productos
            function actualizarTabla(productos) {
                // Limpiar tabla antes de agregar nuevos productos
                tablaProductos.innerHTML = `
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                    </tr>
                `;
                
                productos.forEach(producto => {
                    let fila = tablaProductos.insertRow();
                    let celdaNombre = fila.insertCell(0);
                    let celdaPrecio = fila.insertCell(1);
                    celdaNombre.textContent = producto.nombre;
                    celdaPrecio.textContent = producto.precio;
                });
            }

            // Cargar todos los productos inicialmente
            actualizarTabla(productos);

            // Agregar opciones al select
            productos.forEach(producto => {
                let opcion = document.createElement('option');
                opcion.value = producto.id;
                opcion.textContent = `ID ${producto.id}: ${producto.nombre}`;
                productoSelect.appendChild(opcion);
            });

            // Manejar cambio en el select
            productoSelect.addEventListener('change', function(event) {
                const idSeleccionado = event.target.value;
                if (idSeleccionado === 'todos') {
                    actualizarTabla(productos);
                } else {
                    const productoSeleccionado = productos.find(p => p.id == idSeleccionado);
                    if (productoSeleccionado) {
                        actualizarTabla([productoSeleccionado]);
                    }
                }
            });
        })
        .catch(error => {
            console.error('Error al obtener los datos del kiosco:', error);
        });
});
