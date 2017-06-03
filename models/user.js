var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    name: String,
    password: String,
    email:String,
    isAdmin:String,
    role:[{type: Schema.ObjectId, ref: 'Role'}]
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);