const express = require('express')
const router = express.Router()
const collectionController = require('../controllers/collection.controller')
const storeIdentifier = require('../middlewares/storeIdentifier')

router.route('/').post(storeIdentifier, collectionController.addCollection)
router.route('/:id').delete(storeIdentifier, collectionController.deleteCollection)
router.route('/:id').get(storeIdentifier, collectionController.getCollection)
router.route('/').get(storeIdentifier, collectionController.getCollections)
router.route('/:id').put(storeIdentifier, collectionController.updateCollection)
router.route('/customer/collections').get(storeIdentifier, collectionController.getCustomerCollections)



module.exports = router
