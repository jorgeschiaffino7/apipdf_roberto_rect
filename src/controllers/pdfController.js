const fs = require('fs');
const path = require('path');
const PresupuestoGenerator = require('../services/presupuestoGenerator');

const generatePDF = async (req, res) => {
  try {
    const { cliente, fecha, motor, diagnostico, trabajo, repuestos, sugerencias, logoPath } = req.body;

    const generator = new PresupuestoGenerator(
      { cliente, fecha, motor, diagnostico, trabajo, repuestos, sugerencias },
      logoPath
    );

    // Generar el PDF como buffer
    const pdfBuffer = await generator.generatePDF();

    // Guardar el PDF en la carpeta pública del servidor
    const pdfFilename = `presupuesto-${Date.now()}.pdf`;
    const pdfPath = path.join(__dirname, '../public/pdfs', pdfFilename);

    // Crear el directorio si no existe
    fs.mkdirSync(path.dirname(pdfPath), { recursive: true });

    // Guardar el buffer en el sistema de archivos
    fs.writeFileSync(pdfPath, pdfBuffer);

    // Generar el link público al archivo
    const pdfUrl = `${req.protocol}://${req.get('host')}/pdfs/${pdfFilename}`;

    // Preparar la respuesta en formato JSON para el CRM
    const responseMessage = {
      messages: [
        {
          type: "to_user",
          content: pdfUrl
        }
      ]
    };

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(responseMessage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { generatePDF };
