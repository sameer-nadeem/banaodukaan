const express = require('express')
const router = express.Router()
const brandController = require('../controllers/brand.controller')
const storeIdentifier = require('../middlewares/storeIdentifier')

router.route('/').post(storeIdentifier, brandController.addBrand)
router.route('/:id').delete(storeIdentifier, brandController.deleteBrand)
router.route('/:id').get(storeIdentifier, brandController.getBrand)
router.route('/').get(storeIdentifier, brandController.getBrands)
router.route('/:id').put(storeIdentifier, brandController.updateBrand)


module.exports = router
