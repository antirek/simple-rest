var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var routes = require('./routes/index');
var users = require('./routes/users');

var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/my_database');

var LokoSchema = require('./models/loko');
var Loko = mongoose.model('Loko', LokoSchema);

var BaseSchema = require('./models/base');
var Base = mongoose.model('Base', BaseSchema);

var TrunkSchema = require('./models/trunk');
var Trunk = mongoose.model('Trunk', TrunkSchema);


var app = express();


var createRouter = require('./router');

var lokoRouter = createRouter(Loko, LokoSchema);
var baseRouter = createRouter(Base, BaseSchema);
var trunkRouter = createRouter(Trunk, TrunkSchema);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', routes);
app.use('/users', users);
app.use('/loko', lokoRouter);
app.use('/base', baseRouter);
app.use('/trunk', trunkRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;