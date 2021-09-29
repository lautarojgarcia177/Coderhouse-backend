const ICRUD = require("./ICRUD");
const fs = require('fs');
const CrudException=require("../errors/CrudException");

class FSCrud extends ICRUD {

    constructor(filePath) {
        super(filePath);
    }

    async create(argv) {
        throw new CrudException('falta implementar create');
    }

    async findById(argv) {
        const { id } = argv;
        console.log('been here', id);
        return this.findAll().then((items) =>
            items.find((item) => item.id == id)
        );
    }

    async findAll() {
        return fs.promises
            .readFile(this.filePath, "utf8")
            .then((items) => JSON.parse(items));
    }

    async update(argv) {
        const { id, toUpdate } = argv;
        return this.findAll()
            .then((items) => {
                Object.assign(
                    items.find((i) => i.id == id),
                    toUpdate
                );
                Promise.resolve(items);
            })
            .then((items) => this.saveChanges(items));
    }

    async remove(argv) {
        const { id } = argv;
        return this.findAll().then(items => this.saveChanges(items.filter(item => item.id != id)));
    }

    async saveChanges(items) {
        return fs.promises.writeFile(this.filePath, JSON.stringify(items));
    }
}

module.exports = FSCrud;
