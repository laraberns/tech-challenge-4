const quadraController = require('../controllers/quadra')
const router = require('express').Router()

router.post('/addQuadra', quadraController.newQuadra)

module.exports = router