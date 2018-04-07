const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const passportSocketIo = require("passport.socketio");

const config = require('./server/config');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = require('./db');

const sessionStore = new mongoStore({
    mongooseConnection: mongoose.connection,
    collection: 'sessions'
});

const app = express();
const server = require('http').Server(app);
const io = require('socket.io').listen(server);
const port = process.env.PORT || 5000;

app.locals.rootPath = __dirname;

require('./db/starter-migration')();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/app', express.static(path.join(__dirname, 'app')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/files_storage', express.static(path.join(__dirname, 'files_storage')));

require('./server/auth/passport')(passport);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: config.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000*60*60*24, httpOnly: true},
    store: sessionStore
}));
app.use(passport.initialize());
app.use(passport.session());

io.use(passportSocketIo.authorize({
    cookieParser: cookieParser,
    key:          'connect.sid',
    secret:       config.secret,
    store:        sessionStore
}));

io.use(function(socket, next){
    socket.user = socket.client.request.user;
    return next();
});

require('./server/auth')(app, passport);
require('./server/video')(app, io);
require('./server/explaining')(app, io);
require('./server/data')(app);

app.all('*', function (req, res) {
    res.sendFile(path.resolve('public/dist/index.html'));
});

server.listen(port, function () {
    console.log('Listening on port ' + port);
});

module.exports = app;
