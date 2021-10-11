const express = require('express');
const projectsRouter = express.Router();
const { auth, requiresAuth } = require('express-openid-connect');
const Project = require('../models/project');

const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );



// index route
projectsRouter.get('/projects', requiresAuth(), (req, res) => {
    Project.find({}, (err, foundProjects) => {
        res.render('index.ejs', {
            projects: foundProjects
        });
    });
});


// new route
projectsRouter.get('/projects/new', requiresAuth(), (req, res) => {
    res.render('new.ejs', {
        currentLoggedInUser: req.oidc.user.name
    });
});


// (delete route)

// (update route)
projectsRouter.put('/projects/:id', (req, res) => {
    Project.findByIdAndUpdate(
        req.params.id, 
        req.body, {
            new: true,
        },    
        (err, updatedProduct) => {
        res.redirect(`/projects/${req.params.id}`);
    });
});

// create route
projectsRouter.post('/projects', requiresAuth(), (req, res) => {
    console.log(req.oidc.user.name);
    Project.create(req.body, (err, createdProject) => {
        res.redirect('/projects');
    });
});


// edit route
projectsRouter.get('/projects/:id/edit', (req, res) => {
    Project.findById(req.params.id, (err, foundProject) => {
        res.render('edit.ejs', {
            project: foundProject,
            currentLoggedInUser: req.oidc.user.name
        });
    });
});




// show route
projectsRouter.get('/projects/:id', (req, res) => {
    Project.findById(req.params.id, (err, foundProject) => {
        res.render('show.ejs', {
            project: foundProject
        });

        // res.send('got it')
    });
});




module.exports = projectsRouter;