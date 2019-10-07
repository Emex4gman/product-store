//core module
const path = require("path");
 
//3rd party module
const express= require('express');

//getting the root directory
const rootDir = require('../util/path')

const router = express.Router();

const adminData = require('./admin')

router.get('/', (req, res, next) => {
    console.log(adminData.products)
    res.sendFile(path.join(rootDir,'views', 'shop.html'));
});


module.exports = router;