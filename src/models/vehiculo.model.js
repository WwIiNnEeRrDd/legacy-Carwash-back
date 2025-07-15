const pool = require('../config/db');

exports.getVehiculosByClienteId = async (clienteId) => {
  const result = await pool.query(
    'SELECT * FROM vehiculo WHERE id_cliente = $1',
    [clienteId]
  );
  return result.rows;
};

exports.createVehiculo = async ({ id_cliente, placa, marca, modelo, color }) => {
  const result = await pool.query(
    `INSERT INTO vehiculo (id_cliente, placa, marca, modelo, color)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [id_cliente, placa, marca, modelo, color]
  );
  return result.rows[0];
};

exports.findByPlaca = async (placa) => {
  const result = await pool.query(
    'SELECT * FROM vehiculo WHERE placa = $1',
    [placa]
  );
  return result.rows[0];
};

exports.deleteVehiculo = async (id_vehiculo, id_cliente) => {
  const result = await pool.query(
    `DELETE FROM vehiculo 
     WHERE id_vehiculo = $1 AND id_cliente = $2
     RETURNING *`,
    [id_vehiculo, id_cliente]
  );
  return result.rows[0]; 
};

exports.tieneCitasFuturas = async (id_vehiculo) => {
  const result = await pool.query(
    `SELECT COUNT(*) 
     FROM cita 
     WHERE id_vehiculo = $1
       AND estado = 'pendiente'
       AND (fecha_cita > CURRENT_DATE OR (fecha_cita = CURRENT_DATE AND hora_cita > CURRENT_TIME))`,
    [id_vehiculo]
  );
  return parseInt(result.rows[0].count, 10) > 0;
};