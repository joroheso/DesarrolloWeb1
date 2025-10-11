const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Arreglo en memoria para simular la base de datos
const users = [];

// Ruta de registro
app.post('/register', (req, res) => {
  const { nombre, dpi, email, password } = req.body;

  // Validar si el email ya existe
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ message: 'El email ya está registrado' });
  }

  // Guardar usuario
  users.push({ nombre, dpi, email, password });
  res.status(201).json({ message: 'Usuario registrado con éxito' });
});

// Ruta de login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  res.json({ nombre: user.nombre, email: user.email });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});