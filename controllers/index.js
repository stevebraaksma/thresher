const express = require('express');
const indexRouter = express.Router();
const { auth, requiresAuth } = require('express-openid-connect');

indexRouter.get('/landingpage', requiresAuth(), (req, res) => {
    res.render('home.ejs');
});

module.exports = indexRouter;