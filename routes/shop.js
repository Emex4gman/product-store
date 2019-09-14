//core module
const path = require("path");

//3rd party module
const express= require('express');

const router = express.Router();


router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../','views', 'shop.html'));
});


module.exports = router;