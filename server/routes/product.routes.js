const express = require('express')
const router = express.Router()
const storeIdentifier = require('../middlewares/storeIdentifier')
const Product = require('../models/product.model')
const productController = require('../controllers/product.controller')


router.route('/').post(storeIdentifier, productController.addProduct)
router.route('/').get(storeIdentifier, productController.getProducts)
router.route('/:id').get(storeIdentifier, productController.getProduct)
router.route('/:id').put(storeIdentifier, productController.updateProduct)
router.route('/:id').delete(storeIdentifier, productController.deleteProduct)


module.exports = router
