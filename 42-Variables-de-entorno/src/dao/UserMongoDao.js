const IUserDAO = require('./IUserDAO');
const User = require('../models/user');
const UserDTO = require('../dto/userDTO');

class UserMongoDAO extends IUserDAO {

    constructor() {
        super();
    }

    async create(argv) {
        const { id, name, username, password } = argv;
        const newUser = { id, text, user, timestamp };
        return await User.create(newUser);
    }

    async findById(argv) {
        const { id } = argv;
        let user = await User.findById(id);
        return new UserDTO(user);
    }

    async findAll() {
        let users = await User.find();
        return users.map(m => new UserDTO(m));
    }

    async update(argv) {
        const { id, toUpdate } = argv;
        return await User.findByIdAndUpdate(id, toUpdate);
    }

    async remove(argv) {
        const { id } = argv;
        return await User.findByIdAndDelete(id);
    }
}

module.exports = UserMongoDAO;