// src/users.js

// ⚠️ Solo para DEMO. En producción NUNCA guardes contraseñas en texto plano.
const users = [
  { id: 1, name: 'Alice', email: 'alice@example.com', password: '123456' },
  { id: 2, name: 'Bob',   email: 'bob@example.com',   password: '123456' },
];

// Utilidad para no exponer contraseñas en respuestas
function sanitize(user) {
  const { password, ...rest } = user;
  return rest;
}

module.exports = { users, sanitize };