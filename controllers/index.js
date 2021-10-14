const express = require('express');
const indexRouter = express.Router();
const { auth, requiresAuth } = require('express-openid-connect');

indexRouter.get('/', (req, res) => {
    res.redirect('/index');
});

indexRouter.get('/index', (req, res) => {
    res.render('home.ejs');
});

module.exports = indexRouter;