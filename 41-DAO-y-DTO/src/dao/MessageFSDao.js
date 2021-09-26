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
}

module.exports = MessageFsDAO;
