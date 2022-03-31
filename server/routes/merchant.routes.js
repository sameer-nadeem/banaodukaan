const express = require('express')
const router = express.Router()
const merchantController = require('../controllers/merchant.controller')

const storeIdentifier = require('../middlewares/storeIdentifier')
router.route('/order/').get(storeIdentifier , merchantController.getOrders)
router.route('/order/:id').get(storeIdentifier , merchantController.getOrder)
router.route('/order/:id').delete(merchantController.deleteOrder)
router.route('/order/:id').put(merchantController.updateOrder)
module.exports = router