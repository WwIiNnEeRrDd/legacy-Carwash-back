const express = require('express');
const router = express.Router();
const vehiculoController = require('../controllers/vehiculo.controller');
const { verifyToken } = require('../utils/jwt'); 

router.get('/mis-vehiculos', verifyToken, vehiculoController.getMisVehiculos);
router.post('/crear', verifyToken, vehiculoController.crearVehiculo);
router.delete('/:id_vehiculo', verifyToken, vehiculoController.eliminarVehiculo);

module.exports = router;