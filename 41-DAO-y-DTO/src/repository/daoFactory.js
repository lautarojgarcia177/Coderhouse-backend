const MessageFsDAO = require('../dao/MessageFSDao');
const MessageMongoDAO = require('../dao/MessageMongoDAO');
const UserFsDAO = require('../dao/MessageFSDao');
const UserMongoDAO = require('../dao/MessageFSDao');

module.exports = function(collection, persistenceType) {
    try {
        switch (collection.toLowerCase()) {
            case "messages":
                switch(persistenceType.toLowerCase) {
                    case "fs":
                        return new MessageFsDAO();
                    case "mongo":
                        require("./database/connection");
                        return new MessageMongoDAO();
                }
                break;
            case "users":
                switch(persistenceType.toLowerCase()) {
                    case "fs":
                        return new UserFsDAO();
                    case "mongo":
                        require("./database/connection");
                        return new UserMongoDAO();
                }
                break;
            default:
                console.error("Invalid argument/s", collection, persistenceType);
                throw new Error("Invalid arguments");
        }
    } catch (error) {
        console.error(error);
    }
}
