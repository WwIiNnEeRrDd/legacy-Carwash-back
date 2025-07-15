const citaModel = require('../models/cita.model');

exports.getMisCitas = async (req, res) => {
  try {
    const id_cliente = req.user.id_cliente;
    const citas = await citaModel.getCitasByClienteId(id_cliente);
    res.json(citas);
  } catch (error) {
    console.error('Error al obtener citas:', error);
    res.status(500).json({ error: 'Error al obtener las citas' });
  }
};

exports.crearCita = async (req, res) => {
  try {
    const id_cliente = req.user.id_cliente;
    const citaData = req.body;

    const nuevaCita = await citaModel.agendarCita(id_cliente, citaData);
    res.status(201).json({ mensaje: 'Cita agendada correctamente', cita: nuevaCita });
  } catch (error) {
    console.error('Error al crear cita:', error);
    res.status(500).json({ error: 'Error al agendar la cita' });
  }
};

exports.getProximaCita = async (req, res) => {
  const id_cliente = req.user.id_cliente;

  try {
    const cita = await citaModel.getProximaCita(id_cliente);

    if (!cita) {
      return res.status(404).json({ mensaje: 'No hay próximas citas agendadas' });
    }

    res.json(cita);
  } catch (error) {
    console.error('Error al obtener la próxima cita:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.actualizarEstado = async (req, res) => {
  const { id_cita } = req.params;
  const { estado } = req.body;

  try {
    const citaActualizada = await citaModel.actualizarEstadoCita(id_cita, estado);

    if (!citaActualizada) {
      return res.status(404).json({ error: 'Cita no encontrada' });
    }

    res.json({ mensaje: 'Estado actualizado correctamente', cita: citaActualizada });
  } catch (error) {
    console.error('Error al actualizar estado de cita:', error);
    res.status(500).json({ error: 'Error al actualizar estado' });
  }
};
