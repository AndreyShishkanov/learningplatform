const Mongoose = require('mongoose');
const config = require('../server/config');

Mongoose.connect(config.database);

const db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log("Connection with database succeeded.");
});

exports.db = db;