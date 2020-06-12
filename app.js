var createError = require('http-errors');
var express = require('express');
const bodyParser = require("body-parser")
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require("mongoose")

var indexRouter = require('./routes/index');
var loginRouter = require("./routes/login");
var usersRouter = require('./routes/users');
var logoutRouter = require("./routes/logout");
var todoRouter = require("./routes/todo");
var deleteRouter = require("./routes/delete");

var app = express();
const config = require("./config/key");

const url = config.mongoURI;
const connect = mongoose.connect(url, {useNewUrlParser: true});

connect.then(function (db) {
  console.log("Connected correctly to server");
}, (err) => {
  console.log(err);
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', indexRouter);
app.use("/login", loginRouter);
app.use('/users', usersRouter);
app.use("/logout", logoutRouter);
app.use("/todo", todoRouter);
app.use("/delete", deleteRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
