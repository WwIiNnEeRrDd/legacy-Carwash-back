const pool = require('../config/db');

exports.getAllServicios = async () => {
  const result = await pool.query('SELECT * FROM servicio');
  return result.rows;
};

// Opcional: para futuros métodos
exports.getServicioById = async (id) => {
  const result = await pool.query('SELECT * FROM servicio WHERE id_servicio = $1', [id]);
  return result.rows[0];
};
