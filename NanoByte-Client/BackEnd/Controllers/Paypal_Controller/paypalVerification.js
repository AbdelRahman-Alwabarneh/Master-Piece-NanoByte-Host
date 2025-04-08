const axios = require('axios');
const getAccessToken = require('./paypalAuth');

const WEBHOOK_ID = process.env.PAYPAL_WEBHOOK_ID;

async function verifySignature(headers, body) {
  const url = 'https://api-m.sandbox.paypal.com/v1/notifications/verify-webhook-signature';

  try {
    const accessToken = await getAccessToken();
    const response = await axios.post(url, {
      auth_algo: headers['paypal-auth-algo'],
      cert_url: headers['paypal-cert-url'],
      transmission_id: headers['paypal-transmission-id'],
      transmission_sig: headers['paypal-transmission-sig'],
      transmission_time: headers['paypal-transmission-time'],
      webhook_id: WEBHOOK_ID,
      webhook_event: body
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });

    console.log("Verification response:", response.data);
    return response.data.verification_status === "SUCCESS";
  } catch (error) {
    console.error("❌ Error verifying PayPal signature:", error.response?.data || error.message);
    return false;
  }
}

module.exports = verifySignature;
