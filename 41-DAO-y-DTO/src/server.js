const config = require("./config/config.json");
const minimist = require("minimist");
const messagesController = require("./api/messages");
const usersController = require("./api/users");

require("./database/connection");

async function runCmds() {
    const argv = minimist(process.argv.slice(2));
    const { collection, cmd, data } = argv;
    try {
        let controller;
        switch (collection.toLowerCase) {
            case "users":
                controller = usersController;
                break;
            case "messages":
                controller = messagesController;
                break;
            default:
                console.error("Invalid collection", collection);
                throw new Error("Invalid collection");
        }
        switch (cmd.toLowerCase()) {
            case "create":
                console.log(cmd);
                console.log(await controller.create(data));
                break;
            case "findById":
                console.log(cmd);
                console.log(await controller.findById(data));
                break;
            case "findAll":
                console.log(cmd);
                console.log(await controller.findAll(data));
                break;
            case "update":
                console.log(cmd);
                console.log(await controller.update(data));
                break;
            case "remove":
                console.log(cmd);
                console.log(await controller.remove(data));
                break;
            default:
                console.error("Invalid command", cmd);
        }
    } catch (error) {
        console.error(error);
    }
}

runCmds();
