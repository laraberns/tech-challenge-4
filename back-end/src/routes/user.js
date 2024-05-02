const userController = require('../controllers/user')
const router = require('express').Router()

router.post('/addUser', userController.newUser)
router.get('/:email', userController.getOneUser)
router.post('/verifyUser', userController.verifyUser)

module.exports = router