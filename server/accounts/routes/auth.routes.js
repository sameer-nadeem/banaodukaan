const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')

router.route('/register-merchant').post(authController.registerMerchant)
router.route('/login-merchant').post(authController.loginMerchant)




module.exports = router