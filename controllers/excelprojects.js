const express = require('express');
const multer = require('multer');
const upload = multer({ dest: './public/' });
const xlsx = require('node-xlsx').default;
const excelprojectsRouter = express.Router();
const { auth, requiresAuth } = require('express-openid-connect');
const Project = require('../models/project');

// excel new route
excelprojectsRouter.get('/excelprojects/excelnew', requiresAuth(), (req, res) => {
    res.render('excelnew-new.ejs'), {
        currentLoggedInUser: req.oidc.user.name
    };
});

// excel create route
excelprojectsRouter.post('/excelprojects/', upload.single('uploaded_file'), function (req, res) { 
    const myFile = req.file.filename;
    const workSheetsFromFile = xlsx.parse(`public/${myFile}`);
    const bomData = workSheetsFromFile[0].data;
    res.render('excelformsubmit.ejs', {
        project: bomData,
        currentLoggedInUser: req.oidc.user.name
    });
 });

 excelprojectsRouter.post('/excelprojectso', requiresAuth(), (req, res) => {
    Project.create(req.body, (err, createdAuthor) => {
        res.redirect('/projects');
    });
});

module.exports = excelprojectsRouter;
