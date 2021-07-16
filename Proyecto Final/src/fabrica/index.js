import { FileSystem } from "./file-system.js"
import { MongoDB } from "./mongodb.js"
import dotenv from 'dotenv'
dotenv.config()
class _Fabrica {

    dao

    constructor() {
        // Para asegurarse de que cree una sola instancia
        this.yaCreoElDAO = false
    }

    crearDAO(modelo) {
        switch (process.env.PERSISTENCIA) {
            case "FS":
                if (!this.yaCreoElDAO) {
                    this.dao = new FileSystem(modelo)
                    this.yaCreoElDAO = true
                }
                return this.dao
            case "MONGO":
                if (!this.yaCreoElDAO) {
                    this.dao = new MongoDB(modelo)
                    this.yaCreoElDAO = true
                }
                return this.dao
            default:
                if (!this.yaCreoElDAO) {
                    this.dao = new FileSystem(modelo)
                    this.yaCreoElDAO = true
                }
                return this.dao
        }
    }

}

export const Fabrica = new _Fabrica()