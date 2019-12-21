const path = require('path');

const express = require('express');


const adminController = require('../controllers/admin');
const isAuth = require('../middleware/isAuth')
const router = express.Router();
const { check, body } = require('express-validator/check');

// /admin/add-product => GET
router.get('/add-product', isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get('/products', isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product',

  body('title', "error with your title")
    .isLength({ min: 3 })
    .isString()
    .trim(),

  body('price', "Number has to be a floating number")
    .isFloat(),
  body('description', "Description has to be longer than five chracters")
    .isLength({ min: 5, max: 300 })
    .trim()

  , isAuth, adminController.postAddProduct);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product', [
  body('title', "Title should contain only aphabets and number").isLength({ min: 5 }).isString().trim(),
  body('price', "has to be a floating number").isFloat(),
  body('description', "has to be longer than five chracters").isLength({ min: 5, max: 300 }).trim()
], isAuth, adminController.postEditProduct);

router.delete('/product/:productId', isAuth, adminController.deleteProduct);


module.exports = router;
