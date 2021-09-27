const DaoException = require('../errors/DaoException');

class IMessageDAO {

    constructor() { }

    async create(argv) {
        throw new DaoException('falta implementar create()');
    }

    async findById(argv) {
        throw new DaoException('falta implementar findById()');
    }

    async findAll() {
        throw new DaoException('falta implementar findAll()');
    }

    async update(argv) {
        throw new DaoException('falta implementar update()');
    }

    async remove(argv) {
        throw new DaoException('falta implementar remove()');
    }
}

module.exports = IMessageDAO;