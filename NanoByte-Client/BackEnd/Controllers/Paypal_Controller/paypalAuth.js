const axios = require('axios');

async function getAccessToken() {
  const url = 'https://api-m.sandbox.paypal.com/v1/oauth2/token';
  const credentials = `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`;
  const encodedCredentials = Buffer.from(credentials).toString('base64');

  try {
    const response = await axios.post(url, 'grant_type=client_credentials', {
      headers: {
        'Authorization': `Basic ${encodedCredentials}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    return response.data.access_token;
  } catch (error) {
    console.error("❌ Error fetching PayPal access token:", error.response?.data || error.message);
    throw new Error("Failed to fetch PayPal access token");
  }
}

module.exports = getAccessToken;
