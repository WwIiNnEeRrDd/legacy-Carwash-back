const express = require('express');
const router = express.Router();
const ServicioController = require('../controllers/servicio.controller');
const { verifyToken } = require('../utils/jwt'); // importa middleware

// Ruta protegida con token
router.get('/', verifyToken, ServicioController.obtenerServicios);

module.exports = router;
