const express = require('express');
const multer = require('multer');
const upload = multer({ dest: './public/' });
const xlsx = require('node-xlsx').default;
const excelprojectsRouter = express.Router();
const { auth, requiresAuth } = require('express-openid-connect');
const Project = require('../models/project');
const axios = require('axios');


let bomData = [];

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


    // within this part is where 





    // console.log(bomData);
    testerHello();
    addPriceStockToBomData();
    getPriceStock();


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

function testerHello () {
    console.log(bomData)
    bomData[0][0] = 'surpraise';
    console.log(bomData)

}

function getPriceStock () {
    for (let i = 1; i < bomData.length; i++) {
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
            // addPriceStockToBomData ();
            console.log(response);


            })
        .catch((err) => {
            console.log(err);
        })


    };
};

function addPriceStockToBomData () {

    // Change this so that it adds to the array instead of changing an item
    
    // add title fields
    bomData[0][3] = 'Price';
    bomData[0][4] = 'Stock';



    // (before this appears on page, would have to update the data model)


    for (let i = 1; i < bomData.length; i++) {
        // add in the price in the 3rd position of each item
        bomData[i][3] = 'price';
        // add in the stock in the 4th position of each item
        bomData[i][4] = 'stock';
    };
    console.log(bomData);


};


module.exports = excelprojectsRouter;
