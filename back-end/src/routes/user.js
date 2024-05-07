const userController = require('../controllers/user')
const router = require('express').Router()

router.post('/addUser', userController.newUser)
router.get('/:email', userController.getOneUser)
router.post('/verifyUser', userController.verifyUser)
router.get('/all/users', userController.getAllUsers)

module.exports = router