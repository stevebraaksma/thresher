const express = require('express');
const multer = require('multer');
const upload = multer({ dest: './public/' });
const xlsx = require('node-xlsx').default;

const app = express();

const indexController = require('./controllers/index');
const usersController = require('./controllers/users');
const projectsController = require('./controllers/projects');
const excelprojectsController = require('./controllers/excelprojects');
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
  secret: process.env.AUTH0_CLIENT_SECRET,
  baseURL: process.env.AUTH0_CALLBACK_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_DOMAIN,
};

const DATABASE_URL = process.env.DATABASE_URL;
mongoose.connect(DATABASE_URL);

const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

// middleware
app.use(auth(config));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.static('public'));

// mount routes
app.use('/', indexController);
app.use('/', usersController);
app.use('/', projectsController);
app.use('/', excelprojectsController);

