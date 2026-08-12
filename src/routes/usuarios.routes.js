const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { requireRole } = require('../middleware/auth.middleware');

const router = express.Router();

const usuariosPath = path.join(__dirname, '../data/usuarios.json');

const ROLES_VALIDOS = ['admin', 'docente', 'familia'];

function leerUsuarios() {
  return JSON.parse(fs.readFileSync(usuariosPath, 'utf8'));
}

function guardarUsuarios(usuarios) {
  fs.writeFileSync(
    usuariosPath,
    JSON.stringify(usuarios, null, 2),
    'utf8'
  );
}

// Consultar usuarios
router.get('/', requireRole('admin'), (req, res) => {
  const usuarios = leerUsuarios();

  const usuariosPublicos = usuarios.map(
    ({ contrasena, ...usuario }) => usuario
  );

  res.json(usuariosPublicos);
});

// Crear usuario
router.post('/', requireRole('admin'), async (req, res) => {
  const { nombre, usuario, contrasena, rol } = req.body;

  if (!nombre || !usuario || !contrasena || !rol) {
    return res.status(400).json({
      error: 'Todos los campos son obligatorios'
    });
  }

  if (!ROLES_VALIDOS.includes(rol)) {
    return res.status(400).json({
      error: 'Rol no válido'
    });
  }

  const usuarios = leerUsuarios();

  if (usuarios.some((item) => item.usuario === usuario)) {
    return res.status(409).json({
      error: 'El usuario ya existe'
    });
  }

  const nuevoUsuario = {
    id: usuarios.length
      ? Math.max(...usuarios.map((item) => item.id)) + 1
      : 1,
    nombre,
    usuario,
    contrasena: await bcrypt.hash(contrasena, 10),
    rol
  };

  usuarios.push(nuevoUsuario);
  guardarUsuarios(usuarios);

  const { contrasena: _, ...usuarioCreado } = nuevoUsuario;

  res.status(201).json(usuarioCreado);
});

// Editar usuario
router.put('/:id', requireRole('admin'), async (req, res) => {
  const id = Number(req.params.id);
  const { nombre, usuario, contrasena, rol } = req.body;

  const usuarios = leerUsuarios();
  const indice = usuarios.findIndex((item) => item.id === id);

  if (indice === -1) {
    return res.status(404).json({
      error: 'Usuario no encontrado'
    });
  }

  if (rol && !ROLES_VALIDOS.includes(rol)) {
    return res.status(400).json({
      error: 'Rol no válido'
    });
  }

  if (usuario) {
    const usuarioExiste = usuarios.some(
      (item) => item.usuario === usuario && item.id !== id
    );

    if (usuarioExiste) {
      return res.status(409).json({
        error: 'El usuario ya existe'
      });
    }

    usuarios[indice].usuario = usuario;
  }

  if (nombre) {
    usuarios[indice].nombre = nombre;
  }

  if (rol) {
    usuarios[indice].rol = rol;
  }

  if (contrasena) {
    usuarios[indice].contrasena = await bcrypt.hash(contrasena, 10);
  }

  guardarUsuarios(usuarios);

  const { contrasena: _, ...usuarioActualizado } = usuarios[indice];

  res.json(usuarioActualizado);
});

// Eliminar usuario
router.delete('/:id', requireRole('admin'), (req, res) => {
  const id = Number(req.params.id);

  if (id === req.session.user.id) {
    return res.status(400).json({
      error: 'No puedes eliminar tu propio usuario'
    });
  }

  const usuarios = leerUsuarios();
  const indice = usuarios.findIndex((item) => item.id === id);

  if (indice === -1) {
    return res.status(404).json({
      error: 'Usuario no encontrado'
    });
  }

  usuarios.splice(indice, 1);
  guardarUsuarios(usuarios);

  res.json({
    message: 'Usuario eliminado correctamente'
  });
});

module.exports = router;