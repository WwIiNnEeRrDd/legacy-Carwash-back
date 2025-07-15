const clienteModel = require('../models/cliente.model');

exports.actualizarPerfil = async (req, res) => {
  const id_cliente = req.user.id_cliente;
  const { nombre, email, telefono, residencia } = req.body;

  try {
    const clienteConEseEmail = await clienteModel.findByEmail(email);
    if (clienteConEseEmail && clienteConEseEmail.id_cliente !== id_cliente) {
      return res.status(400).json({ error: 'El correo ya está en uso por otro cliente' });
    }

    const actualizado = await clienteModel.updateCliente(id_cliente, {
      nombre,
      email,
      telefono,
      residencia
    });

    if (!actualizado) {
      return res.status(404).json({ error: 'Cliente no encontrado o no actualizado' });
    }

    res.json({ mensaje: 'Perfil actualizado correctamente', cliente: actualizado });
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    res.status(500).json({ error: 'Error interno al actualizar perfil' });
  }
};
