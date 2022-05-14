const express = require('express');
const indexRouter = express.Router();
const { auth, requiresAuth } = require('express-openid-connect');

indexRouter.get('/', (req, res) => {
    res.redirect('/index');
});


// original home page
indexRouter.get('/index', (req, res) => {
    res.render('home.ejs');
});


// future new home
indexRouter.get('/newlanding', (req, res) => {
    res.render('landing.ejs');
});

// original home page
indexRouter.get('/index-new', (req, res) => {
    res.render('index-new.ejs');
});

module.exports = indexRouter;