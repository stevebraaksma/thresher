const express = require('express');
const projectsRouter = express.Router();
const { auth, requiresAuth } = require('express-openid-connect');
const Project = require('../models/project');



// index route
projectsRouter.get('/projects', (req, res) => {
    Project.find({}, (err, foundProjects) => {
        // console.log(foundProjects)
        res.render('index.ejs', {
            projects: foundProjects
        });
    });
});


// new route
projectsRouter.get('/projects/new', (req, res) => {
    res.render('new.ejs', {
        currentLoggedInUser: req.oidc.user.name
    })





    console.log('hooptee');
    // console.log(res.body);

});







// create route
projectsRouter.post('/projects', requiresAuth(), (req, res) => {
    console.log(req.oidc.user.name);
    Project.create(req.body, (err, createdProject) => {
        // console.log(req.oidc.user.name);
        // console.log(typeof req.oidc.user.name)
        
        // req.body.createdBy = req.oidc.user.name;
        // createdProject.body.createdBy = req.oidc.user.name
        // console.log(req.body)
        res.redirect('/projects');
    });
});




module.exports = projectsRouter;