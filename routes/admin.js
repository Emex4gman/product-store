//core module
const path = require("path");

//3rd party module
const express= require('express');

const adminController = require('../controllers/adminController')

const router = express.Router();


//  /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);
router.get('/products', adminController.getProducts );
 
//  /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct) 
router.get('/edit-product/:productId', adminController.getEditProduct) 


module.exports = router;
 