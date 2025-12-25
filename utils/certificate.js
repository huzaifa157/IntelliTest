const PDFDocument = require("pdfkit");

function generateCertificate(res, data) {
  const doc = new PDFDocument({ size: "A4", margin: 50 });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=certificate-${data.name}.pdf`
  );

  doc.pipe(res);

  // Border
  doc.rect(20, 20, 555, 802).stroke();

  // Title
  doc
    .fontSize(28)
    .text("Certificate of Completion", { align: "center" })
    .moveDown(2);

  // Body
  doc
    .fontSize(16)
    .text("This is to certify that", { align: "center" })
    .moveDown();

  doc
    .fontSize(22)
    .text(data.name.toUpperCase(), { align: "center", underline: true })
    .moveDown();

  doc
    .fontSize(16)
    .text(
      `has successfully completed the test for the qualification`,
      { align: "center" }
    )
    .moveDown(0.5);

  doc
    .fontSize(18)
    .text(data.qualification, { align: "center" })
    .moveDown(2);

  doc
    .fontSize(16)
    .text(`Score: ${data.score} / ${data.total}`, { align: "center" })
    .moveDown();

  doc
    .fontSize(14)
    .text(`Date: ${data.date || new Date().toLocaleDateString()}`, { align: "center" })
    .moveDown(4);

  doc
    .fontSize(12)
    .text("Authorized by IntelliTest", { align: "right" });

  doc.end();
}

module.exports = generateCertificate;
