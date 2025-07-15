const clienteModel = require('../models/cliente.model');
const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');

exports.registerCliente = async (req, res) => {
  const { nombre, email, contraseña } = req.body;

  try {
    const existe = await clienteModel.findByEmail(email);
    if (existe) {
      return res.status(409).json({ error: 'Email ya registrado' });
    }

    const contraseñaHash = await bcrypt.hash(contraseña, 10);
    const nuevoCliente = await clienteModel.create({ nombre, email, contraseña: contraseñaHash });

    const token = jwt.generateToken({ id_cliente: nuevoCliente.id_cliente, email: nuevoCliente.email });

    res.status(201).json({ token, cliente: nuevoCliente });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al registrar' });
  }
};

exports.loginCliente = async (req, res) => {
  const { email, contraseña } = req.body;

  try {
    const cliente = await clienteModel.findByEmail(email);
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    const passwordValida = await bcrypt.compare(contraseña, cliente.contraseña);
    if (!passwordValida) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.generateToken({ id_cliente: cliente.id_cliente, email: cliente.email });

res.json({
  token,
  cliente: {
    id: cliente.id_cliente,
    nombre: cliente.nombre,
    email: cliente.email,
    telefono: cliente.telefono,       
    residencia: cliente.residencia      
  }
});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};
