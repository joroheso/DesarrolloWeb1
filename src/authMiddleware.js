// src/authMiddleware.js
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization']; // o req.get('Authorization')
  if (!authHeader) {
    return res.status(401).json({ error: 'Falta el header Authorization' });
  }

  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Formato de Authorization inválido. Use: Bearer <token>' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // Ej: payload = { sub, email, iat, exp }
    req.user = payload; // lo anexamos a la request para usarlo en rutas protegidas
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expirado' });
    }
    return res.status(401).json({ error: 'Token inválido' });
  }
}

module.exports = authMiddleware;