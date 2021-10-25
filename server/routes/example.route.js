const express = require('express')
const router = express.Router()
const exampleController = require('../controllers/example.controller')

router.route('/').get(exampleController.example)



module.exports = router
