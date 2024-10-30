const Service = require("../Models/ServiceModels");

exports.createService = async (req, res) => {
  try {
    const {
        orderNumber,
        receivedOrderID,
    } = req.body;
    console.log(receivedOrderID);
    
    
    // تحقق من الحقول المطلوبة
    if (!req.user.id || !orderNumber) {
      return res.status(400).json({
        message: "userId,OrderNumber are required",
      });
    }

    // إنشاء الخدمة الجديدة
    const newService = await Service.create({
        userId: req.user.id,
        OrderdId: receivedOrderID,
        OrderNumber: orderNumber,
    });

    res.status(201).json({
      message: "Service created successfully",
      service: newService,
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({
      message: "Failed to create service",
      error: error.message,
    });
  }
};

exports.getServiceByUserId = async (req, res) => {
    try {
      if (!req.user.id) {
        return res.status(400).json({
          message: "userId is required",
        });
      }
  
      // البحث عن الخدمة وربطها بالأوردر
      const service = await Service.find({ userId: req.user.id })
      .populate({
        path: "OrderdId", // جلب بيانات Order
        select: "Servicetype orderStatus subscriptionDuration nextPaymentDate renewalFee paymentStatus vpsId dedicatedServerId nextPaymentDate",
        populate: [
          {
            path: "vpsId", // ربط الـ VPS إذا كان موجودًا
            model: "VPS", // تأكد من وجود هذا الموديل
            select: "planName cpu ram storage",
          },
          {
            path: "dedicatedServerId", // ربط الـ DedicatedServer إذا كان موجودًا
            model: "DedicatedServer", // تأكد من وجود هذا الموديل
            select: "planName cpu ram storage",
          },
        ],
      });
  
      // التحقق من وجود الخدمة
      if (!service) {
        return res.status(404).json({
          message: "Service not found",
        });
      }
  
      res.status(200).json({
        message: "Service found",
        service,
      });
    } catch (error) {
      console.error("Internal Server Error:", error);
      res.status(500).json({
        message: "Failed to fetch service",
        error: error.message,
      });
    }
  };

  exports.getServiceByUserIdAndOrder = async (req, res) => {
    try {
      const { id, OrderNumber } = req.params; // استخراج _id و OrderNumber من البرامس
        
      // التحقق من وجود userId في الطلب
      if (!req.user || !req.user.id) {
        return res.status(400).json({
          message: "userId is required",
        });
      }
  
      const userId = req.user.id; // استخراج userId من req.user
  

      const service = await Service.findOne({ userId, _id: id, OrderNumber }) // البحث عن الخدمة بناءً على userId و _id
        .populate({
          path: "OrderdId", // جلب بيانات الأوردر
          select:"Servicetype orderStatus subscriptionDuration nextPaymentDate renewalFee paymentStatus vpsId dedicatedServerId",
          populate: [
            {
              path: "vpsId", // جلب بيانات VPS إن وجدت
              model: "VPS",
              select: "planName cpu ram storage",
            },
            {
              path: "dedicatedServerId", // جلب بيانات الخادم المخصص إن وجد
              model: "DedicatedServer",
              select: "planName cpu ram storage",
            },
          ],
        });
  
      // التحقق من وجود الخدمة
      if (!service) {
        return res.status(404).json({
          message: "Service not found",
        });
      }
  
      res.status(200).json({
        message: "Service found",
        service,
      });
    } catch (error) {
      console.error("Internal Server Error:", error);
      res.status(500).json({
        message: "Failed to fetch service",
        error: error.message,
      });
    }
  };

  