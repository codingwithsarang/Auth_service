const express = require('express')
const UserController = require('../../controllers/User-controller')

const router = express.Router()


router.post('/signup',UserController.create)

module.exports = router