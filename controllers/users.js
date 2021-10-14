const express = require('express');
const usersRouter = express.Router();

const { auth, requiresAuth } = require('express-openid-connect');

usersRouter.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  });
  
usersRouter.get('/profile', requiresAuth(), (req,res) => {
    res.send(JSON.stringify(req.oidc.user));
    console.log(req.oidc.user);
});

module.exports = usersRouter;