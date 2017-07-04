const mongoose = require('mongoose');
const passwordHash = require('password-hash');
const Schema = mongoose.Schema;

const User = new Schema({
    name: String,
    password: String,
    email:String,
    isAdmin:String,
    role:{type: Schema.ObjectId, ref: 'Role'}
});

User.methods.generateHash = (password) => {
    return passwordHash.generate(password);
};

User.methods.verifyPassword = (password) => {
    return passwordHash.verify(password, this.password);
};

module.exports = mongoose.model('User', User);