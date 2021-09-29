const FSCrud=require("../repository/fscrud");
const path = require("path");
const pathToMessagesFile = path.join(
    __dirname,
    "../database/filesystem/messages.json"
);

class MessageFsDAO extends FSCrud {
    constructor() {
        super(pathToMessagesFile);
    }

    async create(argv) {
        const { id, name, username, password } = argv;
        let _item = { id, name, username, password};
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
}

module.exports = MessageFsDAO;
