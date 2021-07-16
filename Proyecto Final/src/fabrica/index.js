import { FileSystem } from "./file-system.js";

export default class Fabrica {

    constructor() {}

    crearDAO(modelo) {
        switch (process.env.PERSISTENCIA) {
            case "FS":
                return new FileSystem(modelo);
            default:
                return new FileSystem(modelo);
        }
    }

}