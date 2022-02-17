const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const { merchantAuth, customerAuth } = require('../middlewares/auth')
const storeIdentifier = require('../middlewares/storeIdentifier')

router.route('/store').get(merchantAuth, storeIdentifier, authController.authStore)
router.route('/customer').post(storeIdentifier, authController.customerLogin)
router.route('/customer').get(storeIdentifier, customerAuth, authController.getCustomer)
router.route('/customer/register').post(storeIdentifier, authController.customerSignUp)

module.exports = router
