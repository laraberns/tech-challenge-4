const userController = require('../controllers/user')
const router = require('express').Router()

router.post('/addUser', userController.newUser)
router.get('/allUsers', userController.getAllUsers)
router.get('/:email', userController.getOneUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

module.exports = router