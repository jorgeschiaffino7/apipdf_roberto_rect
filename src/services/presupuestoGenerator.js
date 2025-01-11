const PDFDocument = require('pdfkit');

class PresupuestoGenerator {
  constructor(data, logoPath) {
    this.data = data;
    this.logoPath = logoPath;
  }

  async generatePDF() {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({
        size: 'A4',
        margin: 50
      });

      const chunks = [];
      doc.on('data', chunk => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));

      // Crear el encabezado con el logo
      this.addHeader(doc);

      // Título principal
      doc.moveDown();
      doc.fontSize(20).text('Presupuesto Detallado', { align: 'center' });
      doc.moveDown();

      // Información del cliente
      doc.fontSize(12);
      doc.text(`Cliente: ${this.data.cliente}`);
      doc.text(`Fecha: ${this.data.fecha}`);
      doc.text(`Motor: ${this.data.motor}`);
      doc.moveDown();

      // Secciones del presupuesto
      this.addSection(doc, 'Diagnóstico del Motor', this.data.diagnostico);
      this.addSection(doc, 'Trabajo a Realizar', this.data.trabajo);
      this.addSection(doc, 'Repuestos Necesarios', this.data.repuestos);
      this.addSection(doc, 'Sugerencias', this.data.sugerencias);

      // Pie de página
      doc.moveDown(2);
      doc.fontSize(10).text('Muchas gracias por su preferencia', { align: 'center' });

      doc.end();
    });
  }

  addHeader(doc) {
    // Agregar el logo en la parte superior como encabezado
    if (this.logoPath) {
      doc.image(this.logoPath, 50, 20, { width: 150 });
    }
    // Línea separadora debajo del logo
    doc.moveTo(50, 80).lineTo(545, 80).stroke();
  }

  addSection(doc, title, content) {
    doc.fontSize(14).text(title, { underline: true });
    doc.fontSize(12);
    doc.moveDown(0.5);

    if (Array.isArray(content)) {
      content.forEach(item => {
        doc.text(`• ${item}`);
      });
    } else {
      doc.text(content);
    }
    doc.moveDown();
  }
}

module.exports = PresupuestoGenerator;
