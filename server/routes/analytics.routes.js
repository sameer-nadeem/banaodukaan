const express = require('express')
const router = express.Router()
const analyticsController = require('../controllers/analytics.controller')

const storeIdentifier = require('../middlewares/storeIdentifier')
router.route('/orders').get(storeIdentifier , analyticsController.getAnalytics)

module.exports = router