// src/index.js (CommonJS)
require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

// Log simple de cada request (útil para depurar)
app.use((req, _res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
});

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '30s';

// "Base de datos" en memoria (solo práctica)
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com', password: '123456' },
  { id: 2, name: 'Bob',   email: 'bob@example.com',   password: '123456' },
];

// Ruta de salud/raíz (para probar rápido en el navegador)
app.get('/', (_req, res) => res.send('API JWT funcionando ✅'));

// Middleware JWT
function authenticateJWT(req, res, next) {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado (usa Authorization: Bearer <token>)' });
  }

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      const isExpired = err.name === 'TokenExpiredError';
      return res.status(401).json({
        error: isExpired ? 'Token expirado' : 'Token inválido',
        details: isExpired ? { expiredAt: err.expiredAt } : undefined,
      });
    }
    req.user = payload;
    next();
  });
}

// POST /login -> devuelve token de 30s
app.post('/login', (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: 'email y password son requeridos' });
  }

  const found = users.find(u => u.email === email && u.password === password);
  if (!found) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  const payload = { sub: found.id, email: found.email, name: found.name };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  const decoded = jwt.decode(token);

  return res.json({
    token,
    tokenType: 'Bearer',
    expiresIn: JWT_EXPIRES_IN,
    expiresAt: decoded?.exp ? new Date(decoded.exp * 1000).toISOString() : null,
    user: { id: found.id, name: found.name, email: found.email },
  });
});

// Rutas protegidas
app.get('/users', authenticateJWT, (req, res) => {
  const safeUsers = users.map(({ password, ...rest }) => rest);
  res.json(safeUsers);
});

app.put('/users/:id', authenticateJWT, (req, res) => {
  const id = Number(req.params.id);
  const { name, email, password } = req.body || {};

  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }

  if (typeof name === 'string') users[idx].name = name;
  if (typeof email === 'string') users[idx].email = email;
  if (typeof password === 'string') users[idx].password = password;

  const { password: _, ...safe } = users[idx];
  res.json({ message: 'Usuario actualizado', user: safe });
});

app.delete('/users/:id', authenticateJWT, (req, res) => {
  const id = Number(req.params.id);
  const exists = users.some(u => u.id === id);
  if (!exists) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  users = users.filter(u => u.id !== id);
  res.json({ message: `Usuario ${id} eliminado` });
});

// Manejador de errores (para evitar cuelgues silenciosos)
app.use((err, _req, res, _next) => {
  console.error('Error no controlado:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});