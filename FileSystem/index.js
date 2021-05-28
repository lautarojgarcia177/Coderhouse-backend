const archivos = require("./archivos.js");
const Archivo = archivos.Archivo;

const archivo = new Archivo("productos");

archivo
    .guardar({
        title: "Globo Terráqueo",
        price: "345.67",
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
    })
    .then(() => {
        archivo
            .leer()
            .then((a) => {
                console.log(a);
                archivo
                    .borrar()
                    .then(() => {})
                    .catch(console.warn);
            })
            .catch(console.warn);
    })
    .catch(console.warn);

process.on("uncaughtException", (err) => {
    console.error("Hubo un error no capturado", err);
    process.exit(1);
});