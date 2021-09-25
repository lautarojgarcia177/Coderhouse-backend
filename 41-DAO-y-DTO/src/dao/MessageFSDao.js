const IMessageDAO = require("./IMessageDAO");
const fs = require("fs");
const path = require("path");
const pathToMessagesFile = path.join(
    __dirname,
    "../database/filesystem/messages.json"
);
const MessageDTO = require("../dto/messageDTO");

class MessageFsDAO extends IMessageDAO {
    constructor() {
        super();
    }

    async create(data) {
        // return await Message.create(data);
    }

    async findById(id) {
        let messages = await fs.promises.readFile(pathToMessagesFile, "utf-8");
        return new MessageDTO(messages.find((message) => message.id == id));
    }

    async findAll() {
        let messages = await fs.promises.readFile(pathToMessagesFile, "utf-8");
        return messages.map((m) => new MessageDTO(m));
    }

    async update(id, toUpdate) {
        return await Message.findByIdAndUpdate(id, toUpdate);
    }

    async remove(id) {
        return await Message.findByIdAndDelete(id);
    }

    saveChanges(items, callback) {
        return fs.writeFile(
            this.pathArchivoDB,
            JSON.stringify(items),
            callback
        );
    }
}

module.exports = MessageMongoDAO;
