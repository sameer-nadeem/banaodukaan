const express = require('express')
const router = express.Router()
const uploadController = require('../controllers/upload.controller')

router.route('/product/image').post(uploadController.uploadProductImage)
router.route('/collection/image').post(uploadController.uploadCollectionImage)

module.exports = router
