import { FileSystem } from "./file-system.js"
import { MongoDB } from "./mongodb.js"
import dotenv from 'dotenv'
dotenv.config()
class _Fabrica {

    daoProductos
    daoCarritos

    constructor() {
        this.crearDAOs()
    }

    crearDAOs() {
        switch (process.env.PERSISTENCIA) {
            case "FS":
                this.daoProductos = new FileSystem('producto')
                this.daoCarritos = new FileSystem('carrito')
            case "MONGO":
                this.daoProductos = new MongoDB('producto')
                this.daoCarritos = new MongoDB('carrito')
        }
    }

}

export const Fabrica = new _Fabrica()