const express = require('express');
const multer = require('multer');
const upload = multer({ dest: './public/' });

const xlsx = require('node-xlsx').default;

const projectsRouter = express.Router();
const { auth, requiresAuth } = require('express-openid-connect');
const Project = require('../models/project');



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

// excel new route
projectsRouter.get('/projects/excelnew', requiresAuth(), (req, res) => {
    console.log(req.body);
    res.render('excelnew.ejs', {
        currentLoggedInUser: req.oidc.user.name
    });
});

// (delete route)

// (update route)
projectsRouter.put('/projects/:id', requiresAuth(), (req, res) => {
    Project.findByIdAndUpdate(
        req.params.id, 
        req.body, () => {
            res.redirect(`/projects/${req.params.id}`);
    });
});

// create route
projectsRouter.post('/projects', requiresAuth(), (req, res) => {
    console.log(req.oidc.user.name);
    Project.create(req.body, (err, createdProject) => {
        console.log(createdProject);

        res.redirect('/projects');
    });
});

// edit route
projectsRouter.get('/projects/:id/edit', requiresAuth(), (req, res) => {
    Project.findById(req.params.id, (err, foundProject) => {
        res.render('edit.ejs', {
            project: foundProject,
            currentLoggedInUser: req.oidc.user.name
        });
    });
});

// show route
projectsRouter.get('/projects/:id', requiresAuth(), (req, res) => {
    Project.findById(req.params.id, (err, foundProject) => {
        res.render('show.ejs', {
            project: foundProject,
            currentLoggedInUser: req.oidc.user.name
        });
    });
});

module.exports = projectsRouter;
