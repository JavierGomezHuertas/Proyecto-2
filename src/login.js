const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 3000; // Puedes cambiarlo a cualquier puerto deseado

app.use(express.json());

// Ruta de registro
app.post('/register', (req, res) => {
  // Obtén los datos del usuario desde la solicitud
  const { username, password } = req.body;

  // Realiza las validaciones necesarias (por ejemplo, verificar si el usuario ya existe)

  // Genera un hash del password
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error interno del servidor');
    } else {
      // Guarda el usuario en la base de datos

      // Envía una respuesta exitosa
      res.status(200).send('Registro exitoso');
    }
  });
});

// Ruta de inicio de sesión
app.post('/login', (req, res) => {
  // Obtén los datos del usuario desde la solicitud
  const { username, password } = req.body;

  // Realiza las validaciones necesarias (por ejemplo, verificar si el usuario existe en la base de datos)

  // Verifica la contraseña
  bcrypt.compare(password, hashedPasswordFromDatabase, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error interno del servidor');
    } else if (!result) {
      res.status(401).send('Credenciales inválidas');
    } else {
      // Genera un token JWT
      const token = jwt.sign({ username }, 'secreto', { expiresIn: '1h' });

      // Envía el token como respuesta
      res.status(200).json({ token });
    }
  });
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
