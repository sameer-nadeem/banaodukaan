const express = require('express')
const router = express.Router()
const collectionController = require('../controllers/collection.controller')

router.route('/').post(collectionController.addCollection)
router.route('/:id').delete(collectionController.deleteCollection)
router.route('/:id').get(collectionController.getCollection)
router.route('/').get(collectionController.getCollections)
router.route('/:id').put(collectionController.updateCollection)


module.exports = router