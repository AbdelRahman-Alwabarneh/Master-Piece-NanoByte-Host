const Payment = require("../Models/paymentModels"); // استيراد نموذج الدفع
const paypalClient = require("../Config/paypalClient"); // استيراد عميل PayPal
const paypal = require("@paypal/checkout-server-sdk");

exports.createPayment = async (req, res) => {
  const { planName, orderNumber, amount, paymentMethod } = req.body;

  if (!req.user.id) {
    return res.status(400).json({ error: "Invalid userId format" });
  }

  if (amount <= 0) {
    return res.status(400).json({ error: "Amount must be greater than zero" });
  }

  if (!["Visa", "PayPal"].includes(paymentMethod)) {
    return res.status(400).json({ error: "Invalid payment method" });
  }

  try {
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: "CAPTURE", 
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: amount.toFixed(2),
          },
        },
      ],
    });

    const order = await paypalClient.execute(request);

    const payment = new Payment({
      userId: req.user.id,
      planName,
      orderNumber,
      amount,
      paymentMethod,
      paymentStatus: "Completed",
      orderID: order.result.id, 
    });
    await payment.save();

    res.status(200).json({
      message: "Payment completed successfully",
      orderID: order.result.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Payment creation failed",
      details: error.message,
    });
  }
};
