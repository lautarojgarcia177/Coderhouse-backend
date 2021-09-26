const minimist = require("minimist");

async function runCmds() {
    const argv = minimist(process.argv.slice(2));
    const { collection, persistenceType, cmd, data } = argv;
    try {
        let dao = require("./repository/daoFactory")(collection, persistenceType)
        switch (cmd.toLowerCase()) {
            case "create":
                console.log(cmd);
                console.log(await dao.create(data));
                break;
            case "findbyid":
                console.log(cmd);
                console.log(await dao.findById(data));
                break;
            case "findall":
                console.log(cmd);
                console.log(await dao.findAll(data));
                break;
            case "update":
                console.log(cmd);
                console.log(await dao.update(data));
                break;
            case "remove":
                console.log(cmd);
                console.log(await dao.remove(data));
                break;
            default:
                console.error("Invalid command", cmd);
        }
    } catch (error) {
        console.error(error);
    }
}

runCmds();
