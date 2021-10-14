const express = require('express');
const usersRouter = express.Router();

//new stuff
const { auth, requiresAuth } = require('express-openid-connect');

usersRouter.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  });
  
usersRouter.get('/profile', requiresAuth(), (req,res) => {
    res.send(JSON.stringify(req.oidc.user));
    console.log(req.oidc.user);
});
  
// test route, screen for (if logedd in user) = to creator of the object
usersRouter.get('/tester', requiresAuth(), (req, res) => {
    let sampleObjectField = 'stevebraaksma@hotmail.com';
    if (req.oidc.user.name === sampleObjectField) {
        console.log('bingo');
        res.render('home.ejs');
    };
});

module.exports = usersRouter;