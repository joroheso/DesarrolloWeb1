```markdown
# 🔐 JWT Auth API

API REST con autenticación mediante JSON Web Tokens (JWT), desarrollada con Node.js y Express.js como parte de la Hoja de Trabajo 6.

---

## 📘 Descripción

Esta API permite a los usuarios autenticarse mediante un endpoint `/login`, que genera un token JWT válido por 30 segundos. Los endpoints `/users` están protegidos por un middleware que verifica el token, asegurando que solo usuarios autenticados puedan acceder.

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express.js
- JSON Web Tokens (`jsonwebtoken`)
- Variables de entorno (`dotenv`)

---

## 📦 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/jwt-auth-api.git
```

2. Instala las dependencias:

```bash
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto:

```env
SECRET_KEY=tu_clave_secreta
TOKEN_EXPIRATION=30s
```

---

## ⚙️ Ejecución local

```bash
npm start
```

El servidor se ejecutará en `http://localhost:3000`.

---

## 🌐 API desplegada

🔗 [https://jwt-auth-api.onrender.com](https://jwt-auth-api.onrender.com)

---

## 📌 Endpoints

### 🔑 POST /login

Autentica al usuario y devuelve un token JWT.

**Body:**

```json
{
  "email": "admin@example.com",
  "password": "123456"
}
```

**Respuesta:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}
```

---

### 👥 GET /users

Lista todos los usuarios (requiere token).

**Headers:**

```http
Authorization: eyJhbGciOiJIUzI1NiIsInR...
```

**Respuesta:**

```json
[
  { "id": 1, "name": "Jonathan" },
  { "id": 2, "name": "Sharon" }
]
```

---

### ✏️ PUT /users/:id

Actualiza un usuario por ID (requiere token).

**Body:**

```json
{
  "name": "Nuevo Nombre"
}
```

---

### 🗑️ DELETE /users/:id

Elimina un usuario por ID (requiere token).

---

## 📄 Notas

- El token expira en 30 segundos.
- Si el token no se incluye o es inválido, se devuelve un error 401 o 403.
- Este proyecto forma parte de la Hoja de Trabajo 6 de Desarrollo Web.

---

## 📬 Entrega

✅ Subido en la rama `jwt`  
✅ Incluye README con descripción, instrucciones y link de despliegue  
✅ Repositorio: [https://github.com/tu-usuario/jwt-auth-api](https://github.com/tu-usuario/jwt-auth-api)

