const express = require('express')
const router = express.Router()

const Product = require('../models/product.model')
const productController = require('../controllers/product.controller')


router.route('/').post(productController.addProduct)
router.route('/').get(productController.getProducts)
router.route('/upload').post(productController.uploadImage)
router.route('/:id').get(productController.getProduct)
router.route('/:id').put(productController.updateProduct)
router.route('/:id').delete(productController.deleteProduct)


module.exports = router