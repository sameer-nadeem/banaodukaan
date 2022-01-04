const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const authMiddleware = require('../../middleware/auth.middleware')


router.route('/register-merchant').post(authController.registerMerchant)
router.route('/login-merchant').post(authController.loginMerchant)
router.route('/google-login-merchant').post(authMiddleware.auth, authController.googleLogin)




module.exports = router