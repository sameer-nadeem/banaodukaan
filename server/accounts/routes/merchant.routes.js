const express = require('express')
const router = express.Router()
const merchantController = require('../controllers/merchant.controller')
const { merchantAuth } = require('../../middlewares/auth')

router.route('/store').get(merchantAuth, merchantController.getMyStores)
router.route('/store').post(merchantAuth, merchantController.addStore)
router.route('/store/:id').get(merchantAuth, merchantController.getStore)
router.route('/store/:id').put(merchantAuth, merchantController.updateStore)
router.route('/profile').get(merchantAuth, merchantController.viewMyProfile)
router.route('/profile').put(merchantAuth, merchantController.updateMyProfile)
router.route('/password').put(merchantAuth, merchantController.updateMyPassword)
module.exports = router
