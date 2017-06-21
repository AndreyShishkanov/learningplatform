var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Role = new Schema({
    name: String,
    hasControlAccess: Boolean,
});

module.exports = mongoose.model('Role', Role);