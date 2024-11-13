const Service = require("../Models/ServiceModels");

exports.updateService = async (req, res) => {
  const {
    userId,
    OrderNumber,
    domain,
    ipAddress: privateIP,
    username,
    password,
    status,
    operatingSystem,
    adminNotes,
  } = req.body;

  try {
    // Find service by ID
    const service = await Service.findById(req.params.serviceId);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Update fields individually
    if (req.body.hasOwnProperty("userId")) service.userId = userId;
    if (req.body.hasOwnProperty("OrderNumber")) service.OrderNumber = OrderNumber;
    if (req.body.hasOwnProperty("domain")) service.domain = domain;
    if (req.body.hasOwnProperty("ipAddress")) service.privateIP = privateIP;
    if (req.body.hasOwnProperty("username")) service.username = username;
    if (req.body.hasOwnProperty("password")) service.password = password;
    if (req.body.hasOwnProperty("status")) service.status = status;
    if (req.body.hasOwnProperty("operatingSystem")) service.operatingSystem = operatingSystem;
    if (req.body.hasOwnProperty("adminNotes")) service.adminNotes = adminNotes;

    // Save the updated service
    await service.save();

    res.status(200).json({
      message: "Service updated successfully",
      service,
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({
      message: "Failed to update service",
      error: error.message,
    });
  }
};



exports.getServiceByUserIdAndOrderNumber = async (req, res) => {
    try {
      const { userId, OrderNumber } = req.params; // الحصول على المعرفات من الـ params
  
      // تحقق من وجود الحقول المطلوبة
      if (!userId || !OrderNumber) {
        return res.status(400).json({
          message: "userId and OrderNumber are required",
        });
      }
  
      // البحث عن الخدمة
      const service = await Service.findOne({ userId, OrderNumber });
  
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

  exports.getLastServiceByUserId = async (req, res) => {
    try {
      const { userId } = req.params; // الحصول على المعرف من الـ params
  
      // تحقق من وجود الحقل المطلوب
      if (!userId) {
        return res.status(400).json({
          message: "userId is required",
        });
      }
  
      const service = await Service.findOne({ userId })
        .sort({ createdAt: -1 })
        .select('OrderNumber');
  
      if (!service) {
        return res.status(404).json({
          message: "Service not found",
        });
      }
  
      res.status(200).json({
        message: "Last service found",
        OrderNumber: service.OrderNumber,
      });
    } catch (error) {
      console.error("Internal Server Error:", error);
      res.status(500).json({
        message: "Failed to fetch service",
        error: error.message,
      });
    }
  };
  
    exports.getAllServicesByUserId = async (req, res) => {
      try {
        const { userId } = req.params; // الحصول على المعرف من الـ params
    
        // تحقق من وجود الحقل المطلوب
        if (!userId) {
          return res.status(400).json({
            message: "userId is required",
          });
        }
    
        // جلب جميع الخدمات للمستخدم المحدد
        const services = await Service.find({ userId })
        .sort({ createdAt: -1 }) // ترتيب تنازلي
        .populate({
          path: 'OrderdId',
          select: 'planName orderNumber',
        })
        .select('domain OrderdId status');
  

        if (services.length === 0) {
          return res.status(404).json({
            message: "No services found",
          });
        }
    
        res.status(200).json({
          message: "Services found",
          services: services,
        });
      } catch (error) {
        console.error("Internal Server Error:", error);
        res.status(500).json({
          message: "Failed to fetch services",
          error: error.message,
        });
      }
    };
    