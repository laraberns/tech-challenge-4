const quadraController = require('../controllers/quadra')
const router = require('express').Router()

router.post('/addQuadra', quadraController.newQuadra)
router.get('/allQuadras', quadraController.getAllQuadras)
router.get('/:id', quadraController.getQuadra)
router.delete('/:id', quadraController.deleteQuadra)
router.put('/:id', quadraController.editQuadra)

module.exports = router