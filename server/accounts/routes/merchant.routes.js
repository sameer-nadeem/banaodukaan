const express = require('express')
const router = express.Router()
const merchantController = require('../controllers/merchant.controller')


router.route('/:id').get(merchantController.getMyStores)
router.route('/:id').post(merchantController.addStore)
module.exports = router