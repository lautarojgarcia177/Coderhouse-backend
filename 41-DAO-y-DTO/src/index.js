const minimist = require("minimist");

async function runCmds() {
    const argv = minimist(process.argv.slice(2));
    const { collection, persistenceType, cmd } = argv;
    try {
        let dao = require("./repository/daoFactory")(collection, persistenceType)
        switch (cmd.toLowerCase()) {
            case "create":
                console.log(cmd);
                console.log(await dao.create(argv));
                break;
            case "findbyid":
                console.log(cmd);
                console.log(await dao.findById(argv));
                break;
            case "findall":
                console.log(cmd);
                console.log(await dao.findAll(argv));
                break;
            case "update":
                console.log(cmd);
                console.log(await dao.update(argv));
                break;
            case "remove":
                console.log(cmd);
                console.log(await dao.remove(argv));
                break;
            default:
                console.error("Invalid command", cmd);
        }
    } catch (error) {
        console.error(error);
    }
}

runCmds();
