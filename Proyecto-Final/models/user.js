const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    email: String,
    name: String,
    address: String,
    age: Number,
    phone: String,
    photoFileName: String
});

User.plugin(passportLocalMongoose, {
    // usernameField: 'username',
    // usernameLowerCase: true,
    session: false
});

module.exports = mongoose.model('user', User);
