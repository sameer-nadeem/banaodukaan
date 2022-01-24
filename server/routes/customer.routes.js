const express = require('express')
const router = express.Router()
const customerController = require('../controllers/customer.controller')
const storeIdentifier = require('../middlewares/storeIdentifier')

router.route('/').post(storeIdentifier, customerController.addCustomer)
router.route('/:id').get(storeIdentifier, customerController.getCustomer)
router.route('/:id').delete(storeIdentifier, customerController.deleteCustomer)
router.route('/:id').put(storeIdentifier, customerController.updateCustomer)
router.route('/').get(storeIdentifier, customerController.getCustomers)
module.exports = router
