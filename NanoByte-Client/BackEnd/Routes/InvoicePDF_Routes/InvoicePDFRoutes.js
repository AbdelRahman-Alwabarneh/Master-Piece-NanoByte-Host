const express = require("express");
const router = express.Router();
const invoicePDFController = require("../../Controllers/InvoicePDF_Controllers/InvoicePDFControllers");
const authMiddleware = require('../../Middlewares/userIdMiddleware');

router.get("/generate-pdf/:orderNumber", authMiddleware,invoicePDFController.createInvoicePDF);

module.exports = router;
