class UserDTO {

    constructor(userData) {
        this.id = userData._id;
        this.name = userData.name;
        this.username = userData.username;
        this.password = userData.password;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getUsername() {
        return this.username;
    }

    getPassword() {
        return this.password;
    }
}

module.exports = UserDTO;