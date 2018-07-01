const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Role = new Schema({
    name: String,
    hasControlAccess: Boolean,
});

Role.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.__v;
    return obj;
};

module.exports = mongoose.model('Role', Role);