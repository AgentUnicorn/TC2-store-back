var express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
var logger = require('morgan');

const mongoose = require('mongoose')
const cors = require('cors')

var indexRouter = require('./routes/index');
var expRouter = require('./routes/exp');

var app = express();
mongoose.connect('mongodb://localhost/airbnb2');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors())

app.use('/', indexRouter);
app.use('/exp', expRouter);

module.exports = app;
