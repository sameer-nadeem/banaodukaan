const express = require('express')
const router = express.Router()
const merchantController = require('../controllers/merchant.controller')
const { merchantAuth } = require('../../middlewares/auth')

router.route('/store').get(merchantAuth, merchantController.getMyStores)
router.route('/store').post(merchantAuth, merchantController.addStore)
router.route('/profile').get(merchantAuth, merchantController.viewMyProfile)
router.route('/profile').put(merchantAuth, merchantController.updateMyProfile)
module.exports = router
