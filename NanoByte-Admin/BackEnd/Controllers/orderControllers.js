const Order = require('../Models/ordersModels');

exports.OrdersData = async (req, res) => { 
  const { orderStatus } = req.params;
  const { search } = req.query; // جلب قيمة البحث من الاستعلام
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit); // الحد الافتراضي إذا لم يتم تحديده

  try {
    const skip = (page - 1) * limit;

    const filter = {};

    if (search) {
      const regexSearch = { $regex: search, $options: 'i' };
      filter.$or = [
        { orderId: regexSearch },
        { orderStatus: regexSearch },
        { orderNumber: regexSearch }
      ];
    }

    // تحديد حالة الطلب إذا كانت غير "AllOrders"
    if (orderStatus !== "AllOrders") {
      filter.orderStatus = orderStatus;
    }

    // جلب إجمالي عدد الطلبات بناءً على الفلتر
    const totalCount = await Order.countDocuments(filter);

    // جلب الطلبات مع تطبيق الباجينيشن والفلترة
    const orders = await Order.find(filter)
      .populate('userId', 'firstName email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // إرسال الاستجابة
    res.status(200).json({
      orders,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      totalItems: totalCount,
      totalCount
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
  



// البحث عن الدفع بواسطة orderNumber
exports.getOrderByOrderNumber = async (req, res) => {
    const { orderNumber } = req.params; // استخدام باراميتر من URL للبحث
  
    try {
      // استرجاع الأمر بواسطة orderNumber مع معلومات المستخدم المرتبطة
      const order = await Order.findOne({ orderNumber })
      .populate('userId', 'firstName email')
      .populate({
        path: 'vpsId',
        select: 'planName',
      })
      .populate({
        path: 'dedicatedServerId',
        select: 'planTitle',
      });
  
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
  

  exports.updateOrder = async (req, res) => {
    const {
      userId,
      orderNumber,
      amount,
      renewalFee,
      nextPaymentDate,
      expirationDate,
      Subscriptionduration,
      paymentMethod,
      discountCode,
      orderStatus,
      PlanId,
    } = req.body;
  
    try {
      // Find order by ID
      const order = await Order.findOne({orderNumber:req.params.orderNumber});
  
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      // Update fields individually
      if (req.body.hasOwnProperty("renewalFee")) order.renewalFee = renewalFee;
      if (req.body.hasOwnProperty("nextPaymentDate")) order.nextPaymentDate = nextPaymentDate;
      if (req.body.hasOwnProperty("expirationDate")) order.expirationDate = expirationDate;
      if (req.body.hasOwnProperty("Subscriptionduration")) order.Subscriptionduration = Subscriptionduration;
      if (req.body.hasOwnProperty("paymentMethod")) order.paymentMethod = paymentMethod;
      if (req.body.hasOwnProperty("discountCode")) order.discountCode = discountCode;
      if (req.body.hasOwnProperty("PlanId")) {
        if (order.vpsId) {
          order.vpsId = PlanId;
        } else {
          order.dedicatedServerId = PlanId;
        }
      }
      // Save the updated order
      await order.save();
  
      res.status(200).json({
        message: "Order updated successfully",
        order,
      });
    } catch (error) {
      console.error("Internal Server Error:", error);
      res.status(500).json({
        message: "Failed to update order",
        error: error.message,
      });
    }
  };

  exports.getOrdersByUserId = async (req, res) => {
    const { userId } = req.params;
    try {
      
      const orders = await Order.find({userId})
        .populate('userId', 'firstName email')
        .sort({ createdAt: -1 });
  
      res.status(200).json({ orders });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  };
  