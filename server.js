const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);

const config = require('./server/config');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = require('./db');

const app = express();
const server = require('http').Server(app);

const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/app', express.static(path.join(__dirname, 'app')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/images/favicon.ico'));

require('./server/auth/passport')(passport);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: config.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000*60*60*24*7, httpOnly: false},
    store: new mongoStore({
        mongooseConnection: mongoose.connection,
        collection: 'sessions' // default
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./server/auth')(app, passport);
require('./server/socket')(server);

app.all('*', function (req, res) {
    res.sendFile(path.resolve('app/index.html'));
});

server.listen(port, function () {
    console.log('Listening on port ' + port);
});

module.exports = app;
