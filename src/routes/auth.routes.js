const express = require('express');
const bcrypt = require('bcrypt');
const usuarios = require('../data/usuarios.json');

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { usuario, contrasena } = req.body;

    if (!usuario || !contrasena) {
      return res.status(400).json({
        error: 'Usuario y contraseña son obligatorios'
      });
    }

    const user = usuarios.find((item) => item.usuario === usuario);

    if (!user) {
      return res.status(401).json({
        error: 'Usuario o contraseña incorrectos'
      });
    }

    const passwordValid = await bcrypt.compare(
      contrasena,
      user.contrasena
    );

    if (!passwordValid) {
      return res.status(401).json({
        error: 'Usuario o contraseña incorrectos'
      });
    }

    req.session.user = {
      id: user.id,
      nombre: user.nombre,
      usuario: user.usuario,
      rol: user.rol
    };

    res.json({
      message: 'Inicio de sesión correcto',
      user: req.session.user
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({
        error: 'No se pudo cerrar la sesión'
      });
    }

    res.json({
      message: 'Sesión cerrada correctamente'
    });
  });
});

router.get('/me', (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({
      error: 'No hay una sesión activa'
    });
  }

  res.json({
    user: req.session.user
  });
});

module.exports = router;