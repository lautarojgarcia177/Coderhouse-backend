import { FileSystem } from "./file-system.js"
import { MongoDB } from "./mongodb.js"
import dotenv from 'dotenv'
dotenv.config()
class _Fabrica {

    daoProductos
    daoCarritos

    constructor() {
        // Para asegurarse de que cree una sola instancia de cada DAO
        this.yaCreoLosDAO
    }

    crearDAOs(modelo) {
        switch (process.env.PERSISTENCIA) {
            case "FS":
                if (!this.yaCreoLosDAO) {
                    this.daoProductos = new FileSystem('producto')
                    this.daoCarritos = new FileSystem('carrito')
                    this.yaCreoLosDAO = true
                }
            case "MONGO":
                if (!this.yaCreoElDAO) {
                    this.daoProductos = new MongoDB('producto')
                    this.daoCarritos = new MongoDB('carrito')
                    this.yaCreoLosDAO = true
                }
        }
        if (modelo == 'producto') {
            return this.daoProductos
        } else if (modelo == 'carrito') {
            return this.daoCarritos
        }
    }

}

export const Fabrica = new _Fabrica()