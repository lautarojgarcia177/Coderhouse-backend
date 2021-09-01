import Crud from "../repositorio/crud.js";
import knex from 'knex';

export class SqlLite extends Crud {

    constructor(modelo) {
        super(modelo);
        this.sqlite3Knex = knex({
            client: 'sqlite3',
            connection: {
                filename: '../db/sql/ecommerce.db'
            },
            useNullAsDefault: true
        })
    }

    obtenerTodos(callback) {
        this.sqlite3Knex(this.modelo).select('*')
            .then(items => callback(null, productos))
            .catch((err) => callback(err, null));
    }

    obtenerUno(id, callback) {
        this.sqlite3Knex(this.modelo).select('*').where('id', id)
            .then((item) => callback(null, item))
            .catch((err) => callback(err, null));
    }

    agregarUno(item, callback) {
        this.sqlite3Knex(this.modelo).insert(item)
            .then((producto) => callback(null, producto))
            .catch((err) => callback(err, null));
    }

    actualizarItem(id, item, callback) {
        this.sqlite3Knex(this.modelo).where('id', id).update(item)
            .then((item) => callback(null, item))
            .catch((err) => callback(err, null));
    }

    borrarItem(id, callback) {
        this.sqlite3Knex(this.modelo).where('id', id).del()
            .then((item) => callback(null, item))
            .catch((err) => callback(err, null));
    }
}