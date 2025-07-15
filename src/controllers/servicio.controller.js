const ServicioModel = require('../models/servicio.model');

exports.obtenerServicios = async (req, res) => {
  try {
    const servicios = await ServicioModel.getAllServicios();
    res.json(servicios);
  } catch (error) {
    console.error('Error al obtener servicios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
