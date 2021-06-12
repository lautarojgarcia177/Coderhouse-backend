// Websocket
var socket = io();

document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    socket.emit("insertarProducto", {
        title: document.getElementById("nombre").value,
        price: document.getElementById("precio").value,
        thumbnail: document.getElementById("foto").value,
    });
});

socket.on("actualizarListado", (listado) => {
    actualizarListado(listado);
});

function actualizarListado(listado) {
    function generarProductoHtml(producto) {
        return `
        <tr>
            <td>${producto.title}</td>
            <td>${producto.price}</td>
            <td><img width="50" src=${producto.thumbnail} alt="not found" /></td>
        </tr>
    `;
    }
    let productos = "";
    listado.forEach((p) => {
        productos += generarProductoHtml(p);
    });
    document.querySelector(".table").innerHTML = `
        <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Foto</th>
        </tr>
        ${productos}
    `;
}