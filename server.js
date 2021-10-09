const express = require('express');
const app = express();
//
//
const indexController = require('./controllers/index');

const methodOverride = require('method-override');
const mongoose = require('mongoose');
const morgan = require('morgan');

require('dotenv').config();


// new stuff
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});


//new stuff
const { auth, requiresAuth } = require('express-openid-connect');


// at minue 5:05 could move this to env
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

// app.get('/', (req, res) => {
//     res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });





// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/profile', requiresAuth(), (req,res) => {
    res.send(JSON.stringify(req.oidc.user));
    console.log(req.oidc.user);
})
// "Add the ****requiresAuth**** middleware for routes that require authentication. Any route using this middleware will check for a valid user 
// session and, if one does not exist, it will redirect the user to log in."
// https://manage.auth0.com/dashboard/us/dev-syfi7hdt/integration-guides/F7Iy4E7LGqiJF9qvAO40JaWuhkZLF3ip/express/steps/4


// test route, screen for (if logedd in user) = to creator of the object

app.get('/tester', requiresAuth(), (req, res) => {
    let sampleObjectField = 'stevebraaksma@hotmail.com';
    if (req.oidc.user.name === sampleObjectField) {
        console.log('bingo');
        res.render('home.ejs');
    }
})





const DATABASE_URL = process.env.DATABASE_URL;
mongoose.connect(DATABASE_URL);

const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));





// middleware
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.static('public'));



// mount routes
app.use('/', indexController);