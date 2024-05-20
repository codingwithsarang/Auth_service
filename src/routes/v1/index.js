const express = require('express')
const UserController = require('../../controllers/User-controller')
const { AuthRequestValidators } = require('../../middlewares')

const router = express.Router()


router.post('/signup',AuthRequestValidators.validateUserAuth,UserController.create)
router.post('/signin',AuthRequestValidators.validateUserAuth ,UserController.signIn)
router.get('/isauthenticated',UserController.isAuthenticated)
router.get('/isAdmin',AuthRequestValidators.validateAdminRequest,UserController.isAdmin)

module.exports = router