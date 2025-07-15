const pool = require('../config/db');

// Obtener todas las promociones
exports.getAllPromociones = async () => {
  const result = await pool.query(`
    SELECT 
      p.id_promocion,
      p.nombre_promocion,
      p.descripcion,
      p.descuento_porcentaje,
      p.fecha_inicio,
      p.fecha_fin,
      p.fecha_creacion,
      p.id_servicio,
      s.nombre_servicio
    FROM promocion p
    INNER JOIN servicio s ON p.id_servicio = s.id_servicio
    WHERE p.fecha_fin >= NOW()
    ORDER BY p.fecha_creacion DESC
  `);
  return result.rows;
};

// Obtener promociones válidas por ID de servicio
exports.getPromocionesPorServicio = async (id_servicio) => {
  const result = await pool.query(`
    SELECT 
      p.id_promocion,
      p.nombre_promocion,
      p.descripcion,
      p.descuento_porcentaje,
      p.fecha_inicio,
      p.fecha_fin,
      p.fecha_creacion,
      p.id_servicio,
      s.nombre_servicio
    FROM promocion p
    INNER JOIN servicio s ON p.id_servicio = s.id_servicio
    WHERE p.id_servicio = $1
      AND p.fecha_fin >= NOW()
    ORDER BY p.fecha_creacion DESC
  `, [id_servicio]);
  return result.rows;
};

