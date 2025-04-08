const express = require("express");
const router = express.Router();
const paypalController = require("../../Controllers/Paypal_Controller/webhookHandler");

// مسار Webhook لاستقبال إشعارات PayPal
router.post('/', 
  express.raw({ type: 'application/json' }), 
  paypalController.handleWebhook  // تم تصحيح هذا السطر
);
module.exports = router;