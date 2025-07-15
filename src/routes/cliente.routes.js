const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/cliente.controller');
const { verifyToken } = require('../utils/jwt');

router.put('/actualizar', verifyToken, clienteController.actualizarPerfil);

module.exports = router;
