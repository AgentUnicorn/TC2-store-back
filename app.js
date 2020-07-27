var express = require('express');
var path = require('path');
require('dotenv').config()
const bodyParser = require('body-parser');
var logger = require('morgan');
var gi = require(`gitignore`);


const mongoose = require('mongoose')
const cors = require('cors')

var indexRouter = require('./routes/index');
var carRouter = require('./routes/car');
var userRouter = require('./routes/user')
var authRouter = require('./routes/auth')

var app = express();
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/tc2-store', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log("Mongoose is connected!!!!")
})

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
