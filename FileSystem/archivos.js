const fs = require("fs");
class Archivo {
    nombre;
    constructor(nombre) {
        this.nombre = nombre;
    }
    async leer() {
        try {
            return JSON.parse(
                await fs.promises.readFile("./" + this.nombre + ".txt", "utf8")
            );
        } catch (err) {
            // Si el archivo no existe, entonces retorna null
            if (err.code == "ENOENT") {
                return null;
            } else {
                throw new Error(err);
            }
        }
    }
    async guardar(objetoAGuardar) {
        try {
            // Cargo el archivo
            let archivoCargado = await this.leer();
            if (archivoCargado === null) {
                // Si el archivo no existe, entonces lo crea
                fs.writeFileSync('./' + this.nombre + '.txt', '[]', 'utf8');
                archivoCargado = await this.leer();
            }
            // Obtengo el ultimo Id, genero el nuevo objeto a y lo inserto en el array
            if (archivoCargado.length === 0) {
                objetoAGuardar.id = 1;
            } else {
                objetoAGuardar.id = Number(archivoCargado[archivoCargado.length - 1].id) + 1;
            }
            archivoCargado.push(objetoAGuardar);
            // Convierto el objeto a string para guardarlo en un archivo
            const archivo = JSON.stringify(archivoCargado);
            // Guardo el archivo
            return fs.promises.writeFile("./" + this.nombre + ".txt", archivo, 'utf8');
        } catch (err) {
            throw new Error(err);
        }
    }
    borrar() {
        try {
            return fs.promises.unlink("./" + this.nombre + ".txt");
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = {
    Archivo: Archivo,
};