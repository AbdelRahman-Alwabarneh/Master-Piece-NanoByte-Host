const Order = require('../Models/ordersModels');

exports.OrdersData = async (req, res) => {
  const { orderStatus } = req.params;
  try {
    
    const orders = await Order.find(orderStatus == "AllOrders" ? { } : {orderStatus: orderStatus} )
      .populate('userId', 'firstName email')
      .sort({ createdAt: -1 }); // ترتيب تنازلي حسب 'createdAt'

    res.status(200).json({ orders });
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

  exports.updateOrderStatusByOrderNumber = async (req, res) => {
    const { orderNumber } = req.params; // استخدام باراميتر من URL للبحث
    const { orderStatus } = req.body; // جلب حالة الطلب من الطلب القادم من الفرونت
    
    try {
      const order = await Order.findOneAndUpdate(
        { orderNumber },
        { orderStatus },
        { new: true } 
      )
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
  
      res.status(200).json(order);
    } catch (err) {
      console.error("Error updating order status:", err.message);
      res.status(500).json({ message: "Server error" });
    }
  };
  