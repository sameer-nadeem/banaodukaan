const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')



router.route('/register-merchant').post(authController.registerMerchant)
router.route('/login-merchant').post(authController.loginMerchant)
router.route('/google-login-merchant').post(authController.googleLogin)





module.exports = router