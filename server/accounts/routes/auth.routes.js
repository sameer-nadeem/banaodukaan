const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const { merchantAuth } = require('../../middlewares/auth')



router.route('/register-merchant').post(authController.registerMerchant)
router.route('/login-merchant').post(authController.loginMerchant)
router.route('/google-login-merchant').post(authController.googleLogin)
router.route("/").get(merchantAuth, authController.getUser)




module.exports = router
