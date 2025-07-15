const express = require('express');
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/auth.routes');
const servicioRoutes = require('./routes/servicio.routes');
const vehiculoRoutes = require('./routes/vehiculo.routes');
const clienteRoutes = require('./routes/cliente.routes');
const promocionRoutes = require('./routes/promocion.routes');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/servicios', servicioRoutes);
app.use('/api/vehiculos', vehiculoRoutes);
app.use('/api/cliente', clienteRoutes);
app.use('/api/citas', require('./routes/cita.routes'));
app.use('/api/promociones', promocionRoutes);

module.exports = app;

