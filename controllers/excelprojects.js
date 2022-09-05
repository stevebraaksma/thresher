const express = require('express');
const multer = require('multer');
const upload = multer({ dest: './public/' });
const xlsx = require('node-xlsx').default;
const excelprojectsRouter = express.Router();
const { auth, requiresAuth } = require('express-openid-connect');
const Project = require('../models/project');
const axios = require('axios');


let bomData = [];


function getPriceStock () {
    for (let i = 1; i < bomData.length-1; i++) {
        // bomData[i][3] = 'default';
        // let holdingVariable = [];
        // let bomData2 = bomData;
        let currentPartNum = bomData[i][0];
        axios({
            method: 'post',
            url: "https://api.mouser.com/api/v1/search/keyword?apiKey=53cd927d-3725-4cce-aaa8-50851d7c13f6",
            data: {
                SearchByKeywordRequest: {
                            keyword: currentPartNum
                    }
            }
        })
        .then( (response)=>{
            let currentBomQty = bomData[i][1];
            let actualPrice = '';
            for (let iterator = 0; currentBomQty >= response.data.SearchResults.Parts[0].PriceBreaks[iterator].Quantity; iterator++) {
                actualPrice = response.data.SearchResults.Parts[0].PriceBreaks[iterator].Price;
            };
            bomData[i][3] = actualPrice;
            bomData[i][4] = i;
            console.log(bomData);
            })
        .catch((err) => {
            console.log(err);
        })
    };
    bomData.pop();  // remove the extra empty item added
};
function addPriceStockLabelsToBomData () {
    bomData[0][3] = 'Price';
    bomData[0][4] = 'Stock';

    // (before this appears on page, would have to update the data model)

};


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
    // const 
    bomData = workSheetsFromFile[0].data;

    
    getPriceStock();
    addPriceStockLabelsToBomData();


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
