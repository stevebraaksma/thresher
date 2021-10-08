const express = require('express');
const indexRouter = express.Router();

// routes
indexRouter.get('/', (req, res) => {
    res.render('home.ejs');
});


module.exports = indexRouter;