const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const config = require('./config');
const mongoose = require('mongoose');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use('/system', express.static(path.join(__dirname)));
app.use('/app', express.static(path.join(__dirname, 'app')));


const index = require('./routes/index');
const getRoles = require('./routes/getRoles');

app.use('/', index);
app.use('/getRoles', getRoles);

app.all('*', function (req, res) {
    res.render('index');
});

mongoose.connect(config.database);

//error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
