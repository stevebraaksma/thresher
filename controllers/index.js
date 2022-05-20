const express = require('express');
const indexRouter = express.Router();
const { auth, requiresAuth } = require('express-openid-connect');

// indexRouter.get('/', (req, res) => {
//     res.redirect('/home');
// });


// original home page
indexRouter.get('/home', (req, res) => {
    res.render('home-new.ejs');
});

// future new home
indexRouter.get('/', (req, res) => {
    res.render('landing.ejs');
});

// original home page
indexRouter.get('/index-new', (req, res) => {
    res.render('index-new.ejs');
});

module.exports = indexRouter;