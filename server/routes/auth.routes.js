const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const { merchantAuth } = require('../middlewares/auth')
const storeIdentifier = require('../middlewares/storeIdentifier')

router.route('/store').get(merchantAuth, storeIdentifier, authController.authStore)
router.route('/customer').post(storeIdentifier, authController.customerLogin)


module.exports = router
