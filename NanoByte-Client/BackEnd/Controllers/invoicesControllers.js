const Payment = require("../Models/ordersModels");

// البحث عن الدفع بواسطة orderNumber
exports.getPaymentByOrderNumber = async (req, res) => {
  const { orderNumber } = req.params; // استخدم باراميتر من URL للبحث

  try {
    // استرجاع الدفع بواسطة orderNumber
    const payment = await Payment.findOne({ orderNumber }).populate(
      "userId",
      "firstName email"
    ); // استبدل 'name email' بالحقول التي تريد عرضها من نموذج المستخدم

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
  const userId = req.user.id;
  
  try {
    // الحصول على الصفحة والحد الافتراضي
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit);

    // حساب العدد المراد تخطيه بناءً على الصفحة الحالية والحد
    const skip = (page - 1) * limit;

    // جلب البيانات مع الباجينيشن
    const totalCount = await Payment.countDocuments({ userId });
    const payments = await Payment
      .find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    if (!payments || payments.length === 0) {
      return res.status(404).json({ message: "No payments found for this user" });
    }

    res.status(200).json({
      payments,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      totalItems: totalCount,
    });
  } catch (err) {
    console.error("Error retrieving payments:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


exports.getPayments = async (req, res) => {
  const id = req.user.id;
  try {
    // استرجاع الفواتير بواسطة userId
    const payments = await Payment.find({ userId: id }).sort({ createdAt: -1 });

    if (!payments || payments.length === 0) {
      return res
        .status(404)
        .json({ message: "No payments found for this user" });
    }

    res.status(200).json(payments);
  } catch (err) {
    console.error("Error retrieving payments:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};
