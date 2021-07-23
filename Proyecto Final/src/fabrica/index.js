import { FileSystem } from "./file-system.js"
import { MongoDB } from "./mongodb.js"
import { SqlLite } from "./sqllite.js"

import dotenv from 'dotenv'
dotenv.config()
class _Fabrica {

    daoProductos
    daoCarritos

    constructor() {
        this.crearDAOs()
    }

    // Para cambiar el tipo de persistencia, setear la variable en .env, las posibilidades son FS, MONGO o SQL
    crearDAOs() {
        switch (process.env.PERSISTENCIA) {
            case "FS":
                this.daoProductos = new FileSystem('producto')
                this.daoCarritos = new FileSystem('carrito')
            case "MONGO":
                this.daoProductos = new MongoDB('producto')
                this.daoCarritos = new MongoDB('carrito')
            case "SQL":
                this.daoProductos = new SqlLite('producto')
                this.daoCarritos = new SqlLite('carrito')
        }
    }

}

export const Fabrica = new _Fabrica()