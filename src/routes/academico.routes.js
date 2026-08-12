const express = require('express');
const fs = require('fs');
const path = require('path');
const { requireAuth, requireRole } = require('../middleware/auth.middleware');

const router = express.Router();

const calificacionesPath = path.join(__dirname, '../data/calificaciones.json');
const asistenciaPath = path.join(__dirname, '../data/asistencia.json');

function leerJSON(ruta) {
  return JSON.parse(fs.readFileSync(ruta, 'utf8'));
}

function guardarJSON(ruta, datos) {
  fs.writeFileSync(ruta, JSON.stringify(datos, null, 2), 'utf8');
}

// Consultar calificaciones
router.get('/calificaciones', requireAuth, (req, res) => {
  const calificaciones = leerJSON(calificacionesPath);
  const usuario = req.session.user;

  if (usuario.rol === 'familia') {
    return res.json(
      calificaciones.filter(
        (item) => item.estudianteId === usuario.id
      )
    );
  }

  if (usuario.rol === 'docente' || usuario.rol === 'admin') {
    return res.json(calificaciones);
  }

  res.status(403).json({
    error: 'No tienes permisos para consultar calificaciones'
  });
});

// Registrar calificación
router.post(
  '/calificaciones',
  requireRole('docente', 'admin'),
  (req, res) => {
    const { estudianteId, materia, nota, periodo } = req.body;

    if (
      estudianteId === undefined ||
      !materia ||
      nota === undefined ||
      !periodo
    ) {
      return res.status(400).json({
        error: 'Todos los campos son obligatorios'
      });
    }

    if (Number(nota) < 0 || Number(nota) > 100) {
      return res.status(400).json({
        error: 'La nota debe estar entre 0 y 100'
      });
    }

    const calificaciones = leerJSON(calificacionesPath);

    const nuevaCalificacion = {
      id: calificaciones.length
        ? Math.max(...calificaciones.map((item) => item.id)) + 1
        : 1,
      estudianteId: Number(estudianteId),
      materia,
      nota: Number(nota),
      periodo,
      docente: req.session.user.usuario
    };

    calificaciones.push(nuevaCalificacion);
    guardarJSON(calificacionesPath, calificaciones);

    res.status(201).json(nuevaCalificacion);
  }
);

// Consultar asistencia
router.get('/asistencia', requireAuth, (req, res) => {
  const asistencia = leerJSON(asistenciaPath);
  const usuario = req.session.user;

  if (usuario.rol === 'familia') {
    return res.json(
      asistencia.filter(
        (item) => item.estudianteId === usuario.id
      )
    );
  }

  if (usuario.rol === 'docente' || usuario.rol === 'admin') {
    return res.json(asistencia);
  }

  res.status(403).json({
    error: 'No tienes permisos para consultar asistencia'
  });
});

// Registrar asistencia
router.post(
  '/asistencia',
  requireRole('docente', 'admin'),
  (req, res) => {
    const { estudianteId, fecha, estado } = req.body;

    const estadosPermitidos = ['presente', 'ausente', 'tardanza'];

    if (!estudianteId || !fecha || !estado) {
      return res.status(400).json({
        error: 'Todos los campos son obligatorios'
      });
    }

    if (!estadosPermitidos.includes(estado)) {
      return res.status(400).json({
        error: 'Estado de asistencia no válido'
      });
    }

    const asistencia = leerJSON(asistenciaPath);

    const nuevoRegistro = {
      id: asistencia.length
        ? Math.max(...asistencia.map((item) => item.id)) + 1
        : 1,
      estudianteId: Number(estudianteId),
      fecha,
      estado,
      docente: req.session.user.usuario
    };

    asistencia.push(nuevoRegistro);
    guardarJSON(asistenciaPath, asistencia);

    res.status(201).json(nuevoRegistro);
  }
);

module.exports = router;