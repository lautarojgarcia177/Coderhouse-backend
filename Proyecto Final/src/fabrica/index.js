import { FileSystem } from "./file-system.js";

export class Fabrica {

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