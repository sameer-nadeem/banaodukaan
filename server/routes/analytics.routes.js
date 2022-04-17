const express = require('express')
const router = express.Router()
const analyticsController = require('../controllers/analytics.controller')

const storeIdentifier = require('../middlewares/storeIdentifier')
router.route('/orders').get(storeIdentifier , analyticsController.getAnalytics)
router.route('/sales-data').get(storeIdentifier , analyticsController.getSalesbyDate)
router.route('/order-info').get(storeIdentifier , analyticsController.getOrdersInfo)
router.route('/brand-sales').get(storeIdentifier , analyticsController.getBrandSales)

module.exports = router