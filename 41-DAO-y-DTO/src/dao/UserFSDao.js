const FSCrud=require("../repository/fscrud");
const path = require("path");
const pathToUsersFile = path.join(
    __dirname,
    "../database/filesystem/users.json"
);

class UserFsDAO extends FSCrud {
    constructor() {
        super(pathToUsersFile);
    }
}

module.exports = UserFsDAO;
