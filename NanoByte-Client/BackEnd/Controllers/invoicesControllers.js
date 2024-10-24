const Payment = require('../Models/paymentModels');

// البحث عن الدفع بواسطة orderNumber
exports.getPaymentByOrderNumber = async (req, res) => {
  const { orderNumber } = req.params; // استخدم باراميتر من URL للبحث

  try {
    // استرجاع الدفع بواسطة orderNumber
    const payment = await Payment.findOne({ orderNumber }).populate('userId', 'firstName email'); // استبدل 'name email' بالحقول التي تريد عرضها من نموذج المستخدم

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json(payment);
  } catch (err) {
    console.error("Error retrieving payment:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};


exports.getPaymentsByUserId = async (req, res) => {
    const id = req.user.id
    try {
      // استرجاع الفواتير بواسطة userId
      const payments = await Payment.find({ userId: id }); 
  
      if (!payments || payments.length === 0) {
        return res.status(404).json({ message: "No payments found for this user" });
      }
  
      res.status(200).json(payments);
    } catch (err) {
      console.error("Error retrieving payments:", err.message);
      res.status(500).json({ message: "Server error" });
    }
  };