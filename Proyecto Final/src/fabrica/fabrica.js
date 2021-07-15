export const nrosPersistencia = {
    'MEMORIA': 0,
    'FS': 1,
}

export class fabrica {
    nroPersistencia;

    constructor(nroPersistencia) {
        this.nroPersistencia = nroPersistencia;
    }

    crearControlador() {
        switch (this.nroPersistencia) {
            case nrosPersistencia.FS:
                // return new C
                break;
            default:

        }
    }
}