const promocionModel = require('../models/promocion.model');

// Obtener todas las promociones
exports.obtenerTodas = async (req, res) => {
  try {
    const promociones = await promocionModel.getAllPromociones();
    res.json(promociones);
  } catch (error) {
    console.error('Error al obtener promociones:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Obtener promociones por servicio
exports.obtenerPorServicio = async (req, res) => {
  const idServicio = parseInt(req.params.id_servicio);
  if (isNaN(idServicio)) {
    return res.status(400).json({ error: 'ID de servicio inválido' });
  }

  try {
    const promociones = await promocionModel.getPromocionesPorServicio(idServicio);
    res.json(promociones);
  } catch (error) {
    console.error('Error al obtener promociones por servicio:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
