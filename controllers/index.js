const express = require('express');
const indexRouter = express.Router();
const { auth, requiresAuth } = require('express-openid-connect');

indexRouter.get('/index', (req, res) => {
    res.render('home.ejs');
});

// indexRouter.get('/callback', (req, res) => {
//     res.redirect('/index');
// })


indexRouter.get('/testroute',  requiresAuth(), (req,res) => {
    // res.render('testroute.ejs');
    res.redirect('/index');
})

module.exports = indexRouter;