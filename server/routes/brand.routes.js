const express = require('express')
const router = express.Router()
const brandController = require('../controllers/brand.controller')

router.route('/').post(brandController.addBrand)
router.route('/:id').delete(brandController.deleteBrand)
router.route('/:id').get(brandController.getBrand)
router.route('/').get(brandController.getBrands)
router.route('/:id').put(brandController.updateBrand)


module.exports = router