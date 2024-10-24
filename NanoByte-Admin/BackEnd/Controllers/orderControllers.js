const Order = require('../Models/paymentModels');

exports.PendingOrdersData = async (req, res) => {
    try {
      const orders = await Order.find({orderStatus : "Pending"}).populate('userId', 'firstName email');
  
      res.status(200).json({ orders }); // استخدام 'orders' بدلاً من 'OrdersData'
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  };

// البحث عن الدفع بواسطة orderNumber
exports.getOrderByOrderNumber = async (req, res) => {
    const { orderNumber } = req.params; // استخدام باراميتر من URL للبحث
  
    try {
      // استرجاع الأمر بواسطة orderNumber مع معلومات المستخدم المرتبطة
      const order = await Order.findOne({ orderNumber }).populate('userId', 'firstName email');
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.status(200).json(order);
    } catch (err) {
      console.error("Error retrieving order:", err.message);
      res.status(500).json({ message: "Server error" });
    }
  };