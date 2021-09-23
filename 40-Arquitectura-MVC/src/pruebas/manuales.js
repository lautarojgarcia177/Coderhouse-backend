var axios = require('axios');

const URL = "http://localhost:8080";

// Obtener todos los productos
axios.get(URL + "/api/productos/listar").then(function () {
  // Insertar un producto
  axios
    .post(URL + "/api/productos/agregar", {
      timestamp: "",
      nombre: "Regla",
      descripcion: "Regla para medir",
      codigo: "koasfioho",
      foto: "https://th.bing.com/th/id/OIP.lw--bUimP009U15xYwReMwHaHa?pid=ImgDet&rs=1",
      precio: "170",
      stock: "10",
    })
    .then(function () {
      // Modificar un producto
      axios
        .put(URL + "/api/productos/actualizar/3", {
          timestamp: "",
          nombre: "Regla larga",
          descripcion: "Regla para medir",
          codigo: "koasfioho",
          foto: "https://th.bing.com/th/id/OIP.lw--bUimP009U15xYwReMwHaHa?pid=ImgDet&rs=1",
          precio: "170",
          stock: "10",
        })
        .then(function () {
          // Eliminar un producto
          axios
            .delete(URL + "/api/productos/borrar/3")
            .then(function () {
              console.log("La prueba paso con éxito");
            });
        });
    });
});
