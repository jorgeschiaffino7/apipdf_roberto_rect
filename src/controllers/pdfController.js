const PresupuestoGenerator = require('../services/presupuestoGenerator');

const generatePDF = async (req, res) => {
  try {
    const { cliente, fecha, motor, diagnostico, trabajo, repuestos, sugerencias, logoPath } = req.body;

    const generator = new PresupuestoGenerator(
      { cliente, fecha, motor, diagnostico, trabajo, repuestos, sugerencias },
      logoPath
    );
    const pdfBuffer = await generator.generatePDF();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=presupuesto.pdf');
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { generatePDF };
