var express = require('express');
var path = require('path');
require('dotenv').config()
const bodyParser = require('body-parser');
var logger = require('morgan');

const mongoose = require('mongoose')
const cors = require('cors')

var indexRouter = require('./routes/index');
var carRouter = require('./routes/car');
var userRouter = require('./routes/user')
var authRouter = require('./routes/auth')

var app = express();
mongoose.connect('mongodb://localhost/tc2-store');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors())

app.use('/', indexRouter);
app.use('/car', carRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);

module.exports = app;
