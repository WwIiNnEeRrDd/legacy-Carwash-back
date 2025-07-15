const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/register', authController.registerCliente);
router.post('/login', authController.loginCliente);

module.exports = router;
