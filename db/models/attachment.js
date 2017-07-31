const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Attachment = new Schema({
    name: String,
    type: String,
    href: String,
    selected: Boolean
});

module.exports = mongoose.model('Attachment', Attachment);