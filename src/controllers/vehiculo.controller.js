const pool = require('../config/db');
const vehiculoModel = require('../models/vehiculo.model');

exports.getMisVehiculos = async (req, res) => {
  try {
    const clienteId = req.user.id_cliente;

    const result = await vehiculoModel.getVehiculosByClienteId(clienteId);
    res.json(result);
  } catch (err) {
    console.error('Error en getMisVehiculos:', err);
    res.status(500).json({ error: 'Error al obtener vehículos' });
  }
};

exports.crearVehiculo = async (req, res) => {
  try {
    const id_cliente = req.user.id_cliente;
    const { placa, marca, modelo, color } = req.body;

    // Validar si la placa ya existe
    const existente = await vehiculoModel.findByPlaca(placa);
    if (existente) {
      return res.status(409).json({ error: 'Ya existe un vehículo con esa placa' });
    }

    const nuevoVehiculo = await vehiculoModel.createVehiculo({
      id_cliente,
      placa,
      marca,
      modelo,
      color
    });

    res.status(201).json({ mensaje: 'Vehículo creado correctamente', vehiculo: nuevoVehiculo });
  } catch (err) {
    console.error('Error al crear vehículo:', err);
    res.status(500).json({ error: 'Error al crear vehículo' });
  }
};

exports.eliminarVehiculo = async (req, res) => {
  try {
    const id_cliente = req.user.id_cliente;
    const { id_vehiculo } = req.params;

    const tieneCitas = await vehiculoModel.tieneCitasFuturas(id_vehiculo);
    if (tieneCitas) {
      return res.status(400).json({ error: 'No se puede eliminar un vehículo con citas pendientes o futuras' });
    }

    const eliminado = await vehiculoModel.deleteVehiculo(id_vehiculo, id_cliente);

    if (!eliminado) {
      return res.status(404).json({ error: 'Vehículo no encontrado o no pertenece al cliente' });
    }

    res.json({ mensaje: 'Vehículo eliminado correctamente', vehiculo: eliminado });
  } catch (err) {
    console.error('Error al eliminar vehículo:', err);
    res.status(500).json({ error: 'Error al eliminar vehículo' });
  }
};

