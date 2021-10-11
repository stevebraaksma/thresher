const express = require('express');
const app = express();
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );
const indexController = require('./controllers/index');
const usersController = require('./controllers/users');
const projectsController = require('./controllers/projects');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});

const { auth, requiresAuth } = require('express-openid-connect');
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

const DATABASE_URL = process.env.DATABASE_URL;
mongoose.connect(DATABASE_URL);

const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// middleware
app.use(auth(config));
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.static('public'));

// mount routes
app.use('/', indexController);
app.use('/', usersController);
app.use('/', projectsController);

