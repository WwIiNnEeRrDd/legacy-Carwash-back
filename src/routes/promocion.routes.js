const express = require('express');
const router = express.Router();
const PromocionController = require('../controllers/promocion.controller');
const { verifyToken } = require('../utils/jwt');

router.get('/', verifyToken, PromocionController.obtenerTodas);

router.get('/servicio/:id_servicio', verifyToken, PromocionController.obtenerPorServicio);

module.exports = router;
