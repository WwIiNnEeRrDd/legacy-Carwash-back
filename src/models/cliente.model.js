const pool = require('../config/db');

// Buscar cliente por email
exports.findByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM cliente WHERE email = $1', [email]);
  return result.rows[0];
};

// Crear cliente
exports.create = async ({ nombre, email, contraseña }) => {
  const result = await pool.query(`
    INSERT INTO cliente (nombre, email, contraseña)
    VALUES ($1, $2, $3)
    RETURNING id_cliente, nombre, email
  `, [nombre, email, contraseña]);

  return result.rows[0];
};

// 🔁 ACTUALIZAR perfil de cliente
exports.updateCliente = async (id_cliente, { nombre, email, telefono, residencia }) => {
  const result = await pool.query(`
    UPDATE cliente
    SET nombre = $1, email = $2, telefono = $3, residencia = $4
    WHERE id_cliente = $5
    RETURNING id_cliente, nombre, email, telefono, residencia
  `, [nombre, email, telefono, residencia, id_cliente]);

  return result.rows[0];
};
