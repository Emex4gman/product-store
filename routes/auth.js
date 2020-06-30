const authController = require('../controllers/auth');
const User = require("../models/user")
const express = require('express');
const { check, body } = require('express-validator/check');

const router = express.Router();

router.get('/login', authController.getLogin);
router.post('/login',
  body('email', "please enter a vaild email adddress").isEmail().normalizeEmail()
  , body('password', "enter a vaild password").isLength({ min: 5 }).isAlphanumeric().trim()
  , authController.postLogin);

router.get('/signup', authController.getSignup);
router.post('/signup',
  [check('email')
    .isEmail()
    .withMessage('Please Enter a valid Email')
    .custom((value, { req }) => {
      // if (value === "test@test.com") {
      //   throw new Error("this Email cannot be used ")
      // }
      // return true;
      return User.findOne({ email: value })
        .then(userDoc => {
          if (userDoc) {
            return Promise.reject('E-Mail exists already, please pick a different one.')
          }

        })
    }).normalizeEmail(),
  body('password', "error is your password, minimum of 5 characters").isLength({ min: 5 }).isAlphanumeric().trim()
    ,
  body('confirmPassword').trim().custom((vaule, { req }) => {
    if (vaule !== req.body.password) {
      throw new Error("Your passwords has be the same!")
    }
    return true
  })
  ]
  , authController.postSignup);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);
router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword)
router.post('/new-password', authController.postNewPassword)

module.exports = router