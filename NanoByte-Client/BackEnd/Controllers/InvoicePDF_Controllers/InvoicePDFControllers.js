// BackEnd/Controllers/invoicePDF.controller.js

const generateInvoicePDF = require("../../utils/puppeteerInvoicePDF/puppeteerInvoicePDF");

exports.createInvoicePDF = async (req, res) => {
  const { orderNumber } = req.params;
  const userid = req.user?.id;
  try {
    const pdfBuffer = await generateInvoicePDF({orderNumber, userid });
    res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=invoice_${orderNumber}.pdf`,
        "Content-Length": pdfBuffer.length,
      });
      res.end(pdfBuffer);    
  } catch (error) {
    console.error("PDF generation error:", error.message);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};
