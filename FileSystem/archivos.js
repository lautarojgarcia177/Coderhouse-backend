const fs = require("fs");

class Archivo {
  nombre;
  constructor(nombre) {
    this.nombre = nombre;
  }
  async leer() {
    return JSON.parse(await fs.promises.readFile("./" + this.nombre + '.txt', 'utf8'));
  }
  async guardar(objetoAGuardar) {
    try {
      // Cargo el archivo
      let arregloGuardadoEnElArchivo = JSON.parse(await fs.promises.readFile("./" + this.nombre + '.txt', 'utf8'));
      // Obtengo el ultimo Id, genero el nuevo objeto a y lo inserto en el array
      objetoAGuardar.id = Number(arregloGuardadoEnElArchivo[arregloGuardadoEnElArchivo.length - 1 ].id) + 1;
      arregloGuardadoEnElArchivo.push(objetoAGuardar);
      // Convierto el objeto a string para guardarlo en un archivo
      const archivo = JSON.stringify(arregloGuardadoEnElArchivo);
      // Guardo el archivo
      return fs.promises.writeFile("./" + this.nombre + '.txt', archivo);
    } catch (error) { 
      throw error;
    }
  }
  borrar() {
    return fs.promises.unlink("./" + this.nombre + '.txt');
  }
};

module.exports = {
  Archivo: Archivo
}