import fs from "fs";
const pathArchivoItems = new URL("../db/json/productos.json", import.meta.url);

export class ControladorProductos {
  constructor() {
    this.pathArchivoDB = pathArchivoItems;
  }

  obtenerTodos(callback) {
    return fs.readFile(this.pathArchivoDB, "utf8", (err, items) => {
      err ? callback(err) : callback(null, JSON.parse(items));
    });
  }

  obtenerUno(id, callback) {
    this.obtenerTodos((err, items) => {
      if (err) {
        callback(err);
      } else {
        const item = items.find((item) => item.id == id);
        callback(null, item);
      }
    });
  }

  agregarUno(item, callback) {
    let _item = item;
    this.obtenerTodos((err, items) => {
      if (err) {
        callback(err);
      }
      items.length === 0 ? (_item.id = 1) : (_item.id = items.length + 1);
      items.push(_item);
      this.guardarCambiosEnArchivo(items, (err) => {
        err ? callback(err) : callback(null, _item);
      });
    });
  }

  actualizarItem(id, item, callback) {
    this.obtenerTodos((err, items) => {
      if (err) {
        callback(err);
      } else {
        const itemActualizado = Object.assign(
          items.find((p) => p.id == id),
          item
        );
        this.guardarCambiosEnArchivo(items, (err) =>
          err ? callback(err) : callback(null, itemActualizado)
        );
      }
    });
  }

  borrarItem(id, callback) {
    this.obtenerTodos((err, items) => {
      if (err) {
        callback(err);
      } else {
        this.guardarCambiosEnArchivo(
          items.filter((p) => p.id != id),
          (err) => (err ? callback(err) : callback(null))
        );
      }
    });
  }

  guardarCambiosEnArchivo(items, callback) {
    return fs.writeFile(this.pathArchivoDB, JSON.stringify(items), callback);
  }
}
