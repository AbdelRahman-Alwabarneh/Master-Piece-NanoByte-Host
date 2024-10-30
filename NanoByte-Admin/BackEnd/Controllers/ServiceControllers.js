const Service = require("../Models/ServiceModels");

exports.updateService = async (req, res) => {
    try {
      const { serviceId } = req.params; // الحصول على serviceId من الرابط
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
  
      // التحقق من وجود الخدمة المطلوبة
      const existingService = await Service.findById(serviceId);
      if (!existingService) {
        return res.status(404).json({
          message: "Service not found",
        });
      }
  
      // تحديث الحقول المطلوبة فقط
      const updatedService = await Service.findByIdAndUpdate(
        serviceId,
        {
          ...(userId && { userId }),
          ...(OrderNumber && { OrderNumber }),
          ...(domain && { domain }),
          ...(privateIP && { privateIP }),
          ...(username && { username }),
          ...(password && { password }),
          ...(status && { status }),
          ...(operatingSystem && { operatingSystem }),
          ...(adminNotes && { adminNotes }),
        },
        { new: true } // يعيد النسخة المحدثة من الخدمة
      );
  
      res.status(200).json({
        message: "Service updated successfully",
        service: updatedService,
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