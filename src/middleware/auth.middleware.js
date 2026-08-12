function requireAuth(req, res, next) {
  if (!req.session || !req.session.user) {
    return res.status(401).json({
      error: 'No autenticado'
    });
  }

  next();
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.session || !req.session.user) {
      return res.status(401).json({
        error: 'No autenticado'
      });
    }

    if (!roles.includes(req.session.user.rol)) {
      return res.status(403).json({
        error: 'No tienes permisos para realizar esta acción'
      });
    }

    next();
  };
}

module.exports = {
  requireAuth,
  requireRole
};