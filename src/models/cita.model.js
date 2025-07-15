const pool = require('../config/db');

exports.getCitasByClienteId = async (id_cliente) => {
  const result = await pool.query(
    `SELECT c.id_cita, c.fecha_cita, c.hora_cita, c.estado, c.comentario_cliente, c.fecha_creacion,
            v.placa, s.nombre_servicio, s.duracion_estimada
     FROM cita c
     JOIN vehiculo v ON c.id_vehiculo = v.id_vehiculo
     JOIN servicio s ON c.id_servicio = s.id_servicio
     WHERE c.id_cliente = $1
     ORDER BY c.fecha_cita, c.hora_cita`,
    [id_cliente]
  );
  return result.rows;
};

exports.agendarCita = async (id_cliente, citaData) => {
  const {
    id_vehiculo,
    id_servicio,
    fecha_cita,
    hora_cita,
    comentario_cliente
  } = citaData;

  const result = await pool.query(
    `INSERT INTO cita (id_cliente, id_vehiculo, id_servicio, fecha_cita, hora_cita, estado, comentario_cliente, fecha_creacion)
     VALUES ($1, $2, $3, $4, $5, 'pendiente', $6, NOW())
     RETURNING *`,
    [id_cliente, id_vehiculo, id_servicio, fecha_cita, hora_cita, comentario_cliente]
  );
  return result.rows[0];
};

exports.getProximaCita = async (id_cliente) => {
  const result = await pool.query(
    `SELECT c.id_cita, c.fecha_cita, c.hora_cita, c.estado, c.fecha_creacion,
            v.placa, s.nombre_servicio
     FROM cita c
     JOIN vehiculo v ON c.id_vehiculo = v.id_vehiculo
     JOIN servicio s ON c.id_servicio = s.id_servicio
     WHERE c.id_cliente = $1
       AND c.estado = 'pendiente'
       AND (c.fecha_cita > CURRENT_DATE OR (c.fecha_cita = CURRENT_DATE AND c.hora_cita > CURRENT_TIME))
     ORDER BY c.fecha_cita ASC, c.hora_cita ASC
     LIMIT 1`,
    [id_cliente]
  );
  return result.rows[0];
};

exports.actualizarEstadoCita = async (id_cita, nuevoEstado) => {
  const result = await pool.query(
    `UPDATE cita 
     SET estado = $1
     WHERE id_cita = $2
     RETURNING *`,
    [nuevoEstado, id_cita]
  );

  return result.rows[0]; // devuelve la cita actualizada o undefined si no existe
};