require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const userProfileRoutes = require('./routes/profileRoutes.js');


const app = express();
const port = process.env.PORT || 3001;

// Conectar a MongoDB
connectDB();

// Middleware
app.use(express.json());

// Rutas
app.use('/api/profile', userProfileRoutes);

// Iniciar servidor
app.listen(port, () => {
  console.log(`User Profile service running on port ${port}`);
});

// Validación de imagen
app.use('/uploads', express.static('uploads'));
