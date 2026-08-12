const express = require('express');
const fs = require('fs');
const path = require('path');
const { requireAuth, requireRole } = require('../middleware/auth.middleware');

const router = express.Router();

const comunicadosPath = path.join(__dirname, '../data/comunicados.json');

function leerComunicados() {
  return JSON.parse(fs.readFileSync(comunicadosPath, 'utf8'));
}

function guardarComunicados(comunicados) {
  fs.writeFileSync(
    comunicadosPath,
    JSON.stringify(comunicados, null, 2),
    'utf8'
  );
}

// Consultar comunicados
router.get('/', requireAuth, (req, res) => {
  res.json(leerComunicados());
});

// Crear comunicado
router.post('/', requireRole('admin'), (req, res) => {
  const { titulo, contenido } = req.body;

  if (!titulo || !contenido) {
    return res.status(400).json({
      error: 'Título y contenido son obligatorios'
    });
  }

  const comunicados = leerComunicados();

  const nuevoComunicado = {
    id: comunicados.length
      ? Math.max(...comunicados.map((item) => item.id)) + 1
      : 1,
    titulo,
    contenido,
    fecha: new Date().toISOString().split('T')[0],
    autor: req.session.user.usuario
  };

  comunicados.push(nuevoComunicado);
  guardarComunicados(comunicados);

  res.status(201).json(nuevoComunicado);
});

// Eliminar comunicado
router.delete('/:id', requireRole('admin'), (req, res) => {
  const id = Number(req.params.id);

  const comunicados = leerComunicados();
  const indice = comunicados.findIndex((item) => item.id === id);

  if (indice === -1) {
    return res.status(404).json({
      error: 'Comunicado no encontrado'
    });
  }

  comunicados.splice(indice, 1);
  guardarComunicados(comunicados);

  res.json({
    message: 'Comunicado eliminado correctamente'
  });
});

module.exports = router;