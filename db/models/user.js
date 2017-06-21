var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    name: String,
    password: String,
    email:String,
    isAdmin:String,
    role:[{type: Schema.ObjectId, ref: 'Role'}]
});

module.exports = mongoose.model('User', User);