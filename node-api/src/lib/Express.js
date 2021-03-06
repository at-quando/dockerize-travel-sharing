const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');

const logger = require('morgan');
const compression = require('compression');
const over = require('method-override');
const helmet = require('helmet');
const expressWinston = require('express-winston');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local').Strategy;
const multer = require('multer');
const winston = require('./Winston');
const flash = require('connect-flash');
const mongo = require('mongodb');
const http = require('http');
const cors = require('cors');
const nodemailer = require('nodemailer');
const routes = require('../routes');

fs = require('fs');
const config = require('../config');
const register = require('babel-core/register');

const app = express();

const option = {
  service: 'gmail',
    auth: {
      user: 'dhquan1910@gmail.com',
      pass: 'doquan1910'
  }
};

if (config.env === 'development') {
  app.use(logger('development'));
}

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(compression());
app.use(over());
app.use(helmet());
app.use(cors());


app.use(expressValidator({
  errorFormatte: function(param,msg,value) {
    var namespace = param.split('.'),
    root = namespace.shift(),
    formParam = root;
    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Accept");
  res.header("Access-Control-Expose-Headers", "access-token, uid, provider");
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

if (config.env === 'development') {
  expressWinston.requestWhitelist.push('body');
  expressWinston.responseWhitelist.push('body');
  app.use(expressWinston.logger({
    winstonInstance: winston,
    meta: true, // optional: log meta data about request (defaults to true)
    msg: 'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
    colorStatus: true // Color the status code (default green, 3XX cyan, 4XX yellow, 5XX red).
  }));
}

// mount all routes on / path
app.use('/', routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const e = new APIError(HttpStatus.NOT_FOUND);
  return next(e);
});

// error converter
app.use((err, req, res, next) => {
  if (err instanceof validate.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const msg = err.errors.map(error => error.messages.join('. ')).join(' and ');
    const e = new APIError(HttpStatus.BAD_REQUEST, `${msg}`);
    return next(e);
  } else if (!(err instanceof APIError)) {
    const status = err.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const e = new APIError(status, err.message);
    return next(e);
  }
  return next(err);
});

// log error in winston transports except when executing test suite
if (config.env !== 'test') {
  app.use(expressWinston.errorLogger({
    winstonInstance: winston
  }));
}

// error handler, send stacktrace only during development
app.use((err, req, res, next) => {
  const status = err.status;
  const msg = err.message || HttpStatus[status];
  if (config.env === 'development') {
    return res.status(status).json({
      message: msg,
      stack: err.stack
    });
  }
  return res.status(status).json({
    message: msg
  });
});


module.exports = app;
