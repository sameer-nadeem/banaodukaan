const express = require('express')
const router = express.Router()
const storeIdentifier = require('../middlewares/storeIdentifier')
const cartController = require('../controllers/cart.controller')

router.route('/').post(storeIdentifier , cartController.checkout)



module.exports = router