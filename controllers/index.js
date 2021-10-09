const express = require('express');
const indexRouter = express.Router();

//new stuff
const { auth, requiresAuth } = require('express-openid-connect');

// routes
indexRouter.get('/landingpage', requiresAuth(), (req, res) => {
    res.render('home.ejs');
});


module.exports = indexRouter;