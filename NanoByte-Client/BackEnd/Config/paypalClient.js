// paypalClient.js
const paypal = require('@paypal/checkout-server-sdk');

// إعداد بيئة PayPal (Sandbox أو Production)
const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID, 
  process.env.PAYPAL_SECRET
);
const client = new paypal.core.PayPalHttpClient(environment);

module.exports = client;
