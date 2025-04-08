const Payment = require("../../Models/ordersModels");

const DURATION_MAPPING = {
  "شهر واحد": 30,
  "شهرين": 60,
  "ثلاثة أشهر": 90,
  "أربعة أشهر": 120,
  "خمسة أشهر": 150,
  "ستة أشهر": 180,
};

const VALID_PAYMENT_METHODS = ["Visa", "PayPal"];

const calculateDates = (durationText) => {
  const daysToAdd = DURATION_MAPPING[durationText];
  if (!daysToAdd) return null;

  const nextPaymentDate = new Date();
  nextPaymentDate.setDate(nextPaymentDate.getDate() + daysToAdd);

  const expirationDate = new Date(nextPaymentDate);
  expirationDate.setDate(expirationDate.getDate() + 10);

  return { nextPaymentDate, expirationDate };
};

exports.createOrder = async (req, res) => {
  try {
    const {
      SelectedComponent,
      Service_Id,
      amount,
      planPrice,
      renewalFee,
      setupFee,
      appliedDiscount,
      paymentMethod,
      DurationText,
      Discount_Code,
      SelectedServiceType,
      paypalResourceID,
    } = req.body;

    if (!req.user?.id) return res.status(400).json({ error: "Invalid user ID format" });

    if (amount <= 0) return res.status(400).json({ error: "Amount must be greater than zero" });

    if (!VALID_PAYMENT_METHODS.includes(paymentMethod))
      return res.status(400).json({ error: "Invalid payment method" });

    const dates = calculateDates(DurationText);
    if (!dates) return res.status(400).json({ error: "Invalid subscription duration" });

    const payment = new Payment({
      userId: req.user.id,
      planName: SelectedComponent,
      Servicetype: SelectedServiceType,
      Subscriptionduration: DurationText,
      discountCode: Discount_Code,
      amount: amount.toFixed(2),
      planPrice: planPrice.toFixed(2),
      renewalFee: renewalFee.toFixed(2),
      setupFee: setupFee.toFixed(2),
      appliedDiscount: appliedDiscount?.toFixed(2) ?? null,
      paymentMethod,
      paymentStatus: "Pending",
      paypalResourceID,
      nextPaymentDate: dates.nextPaymentDate,
      expirationDate: dates.expirationDate,
      serverId: Service_Id,
    });

    const savedPayment = await payment.save();
    res.status(200).json({ message: "Payment Pending successfully", _id: savedPayment._id , orderNumber:savedPayment.orderNumber });
  } catch (error) {
    console.error("Payment creation error:", error);
    res.status(500).json({ error: "Payment creation failed", details: error.message });
  }
};
