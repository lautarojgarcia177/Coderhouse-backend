const ICRUD = require("./ICRUD");
const fs = require('fs');

class FSCrud extends ICRUD {

    constructor(filePath) {
        console.log(filePath);
        super(filePath);
    }

    async create(item) {
        let _item = item;
        return this.findAll()
            .then((items) => {
                items.length === 0
                    ? (_item.id = 1)
                    : (_item.id = items.length + 1);
                items.push(_item);
                Promise.resolve(items);
            })
            .then((items) => this.saveChanges(items));
    }

    async findById(id) {
        return this.findAll().then((items) =>
            items.find((item) => item.id == id)
        );
    }

    async findAll() {
        return fs.promises
            .readFile(this.pathArchivoDB, "utf8")
            .then((items) => JSON.parse(items));
    }

    async update(id, toUpdate) {
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

    async remove(id) {
        return this.findAll().then(items => this.saveChanges(items.filter(item => item.id != id)));
    }

    async saveChanges(items) {
        return fs.promises.writeFile(this.filePath, JSON.stringify(items));
    }
}

module.exports = FSCrud;
