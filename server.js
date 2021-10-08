const express = require('express');
const app = express();
//
//
const indexController = require('./controllers/index');

const methodOverride = require('method-override');
const mongoose = require('mongoose');
const morgan = require('morgan');

require('dotenv').config();






const DATABASE_URL = process.env.DATABASE_URL;
mongoose.connect(DATABASE_URL);

const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));


app.listen(3000, () => {
    console.log('listening at port 3k');
});


// middleware
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.static('public'));



// mount routes
app.use('/', indexController);