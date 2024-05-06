const reservaController = require('../controllers/reserva')
const router = require('express').Router()

router.post('/addReserva', reservaController.newReserva)
router.get('/allReservas', reservaController.getAllReservas)
router.post('/availableTimes', reservaController.getAvailableTimesForDay)
router.get('/:userId', reservaController.getAllReservasByUserId)
router.delete('/:id', reservaController.deleteReservaById)

module.exports = router