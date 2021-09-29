const CrudException=require("../errors/CrudException");

module.exports = class ICRUD {
    constructor(filePath) {
        this.filePath = filePath;
    }
    async create(data) {
        throw new CrudException('falta implementar create()');
    }
    async findById(id) {
        throw new CrudException('falta implementar findById()')
    }
    async findAll() {
        throw new CrudException('falta implementar findAll()');
    }
    async update() {
        throw new CrudException('falta implementar update()');
    }
    async remove() {
        throw new CrudException('falta implementar remove()');
    }
}

