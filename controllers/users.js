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
  
  
  // "Add the ****requiresAuth**** middleware for routes that require authentication. Any route using this middleware will check for a valid user 
  // session and, if one does not exist, it will redirect the user to log in."
  // https://manage.auth0.com/dashboard/us/dev-syfi7hdt/integration-guides/F7Iy4E7LGqiJF9qvAO40JaWuhkZLF3ip/express/steps/4
  

  // test route, screen for (if logedd in user) = to creator of the object
  
usersRouter.get('/tester', requiresAuth(), (req, res) => {
    let sampleObjectField = 'stevebraaksma@hotmail.com';
    if (req.oidc.user.name === sampleObjectField) {
        console.log('bingo');
        res.render('home.ejs');
    };
});


// usersRouter.get('/logout', (req, res) => {
//     res.redirect('/');
// })

// usersRouter.get('/callback', (req, res) => {
//     res.redirect('/');
// })

// usersRouter.get('/callback/callback', (req, res) => {
//     res.redirect('/');
// })

// usersRouter.get('/', (req, res) => {
//         res.redirect('/index');

// })





module.exports = usersRouter;