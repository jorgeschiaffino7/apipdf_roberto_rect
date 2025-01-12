const express = require('express');
const cors = require('cors');
const pdfRoutes = require('./routes/pdfRoutes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales
app.use(cors());
app.use(express.json());

// Hacer pública la carpeta "public"
app.use('/pdfs', express.static(path.join(__dirname, 'public/pdfs')));

// Rutas
app.use('/api/pdf', pdfRoutes);

// Manejo de errores
const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
