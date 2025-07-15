const express = require('express');
const router = express.Router();
const citaController = require('../controllers/cita.controller');
const { verifyToken } = require('../utils/jwt');

router.get('/mis-citas', verifyToken, citaController.getMisCitas);
router.post('/agendar', verifyToken, citaController.crearCita);
router.get('/proxima', verifyToken, citaController.getProximaCita);
router.put('/:id_cita/estado', verifyToken, citaController.actualizarEstado);

module.exports = router;
