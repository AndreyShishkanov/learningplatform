const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const passport = require('passport');
const flash = require('connect-flash');
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

require('./db/starter-migration')();

const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/app', express.static(path.join(__dirname, 'app')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/files', express.static(path.join(__dirname, 'files_storage')));
app.use(favicon(__dirname + '/public/images/favicon.ico'));

require('./server/auth/passport')(passport);

app.use(fileUpload());
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
app.use(flash());

const io = require('socket.io').listen(server);

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
require('./server/video')(app, io, __dirname);
require('./server/explaining')(app, io);
require('./server/data')(app);

app.all('*', function (req, res) {
  if(process.env.NODE_ENV === 'producion'){
    res.sendFile(path.resolve('app/index.html'));
  }else {
    res.redirect('http://localhost:4200' + req.originalUrl);
  }
});

server.listen(port, function () {
    console.log('Listening on port ' + port);
});

module.exports = app;
