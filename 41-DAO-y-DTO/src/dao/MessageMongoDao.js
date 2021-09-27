const IMessageDAO = require('./IMessageDAO');
const Message = require('../models/message');
const MessageDTO = require('../dto/messageDTO');

class MessageMongoDAO extends IMessageDAO {

    constructor() {
        super();
    }

    async create(argv) {
        const { id, text, user, timestamp } = argv;
        const newMessage = { id, text, user, timestamp };
        return await Message.create(newMessage);
    }

    async findById(argv) {
        const { id } = argv;
        let message = await Message.findById(id);
        return new MessageDTO(message);
    }

    async findAll() {
        let messages = await Message.find();
        return messages.map(m => new MessageDTO(m));
    }

    async update(argv) {
        const { id, toUpdate } = argv;
        return await Message.findByIdAndUpdate(id, toUpdate);
    }

    async remove(argv) {
        const { id } = argv;
        return await Message.findByIdAndDelete(id);
    }
}

module.exports = MessageMongoDAO;