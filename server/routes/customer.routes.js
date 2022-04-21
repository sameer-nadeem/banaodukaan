const express = require('express')
const router = express.Router()
const customerController = require('../controllers/customer.controller')
const { customerAuth } = require('../middlewares/auth')
const storeIdentifier = require('../middlewares/storeIdentifier')

router.route('/').post(customerController.addCustomer)
router.route('/password').put(customerAuth, customerController.updateCustomerPassword)
router.route('/:id').get(customerController.getCustomer)
router.route('/:id').delete(customerController.deleteCustomer)
router.route('/').put(customerAuth, customerController.updateCustomer)
router.route('/').get(customerController.getCustomers)

router.route('/orders/:id').get(customerController.getCustomerOrders)
router.route('/order/:id').get(customerController.getCustomerOrder)



module.exports = router
