const Service = require("../Models/ServiceModels");

exports.createService = async (req, res) => {
  try {
    const {
        orderNumber,
        receivedOrderID,
        Servicetype,
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
        Servicetype,
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
            select: "planTitle planDescription",
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
              select: "planTitle secondaryTitle planDescription",
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

 exports.getServiceByUserIdAndType = async (req, res) => {
    try {
        const { serviceType } = req.params;

        // التحقق من وجود userId
        if (!req.user.id) {
            return res.status(400).json({
                message: "userId is required",
            });
        }

        // التحقق من وجود نوع الخدمة
        if (!serviceType) {
            return res.status(400).json({
                message: "Service type is required.",
            });
        }

        // الحصول على الصفحة والحد الافتراضي للباجينيشن
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit);  // تحديد الحد الافتراضي 10 إذا لم يتم تحديده

        // حساب عدد السجلات التي يجب تخطيها
        const skip = (page - 1) * limit;

        // جلب البيانات مع الباجينيشن
        const totalCount = await Service.countDocuments({
          userId: req.user.id,
          Servicetype: serviceType
      });
      
        const service = await Service.find({ userId: req.user.id })
            .populate({
                path: "OrderdId",
                match: { Servicetype: serviceType }, // تصفية نوع الخدمة داخل Order
                select: "Servicetype orderStatus subscriptionDuration nextPaymentDate renewalFee paymentStatus vpsId dedicatedServerId",
                populate: serviceType === "VPS"
                    ? {
                        path: "vpsId",
                        model: "VPS",
                        select: "planName cpu ram storage",
                    }
                    : serviceType === "DedicatedServer"
                    ? {
                        path: "dedicatedServerId",
                        model: "DedicatedServer",
                        select: "planTitle planDescription",
                    }
                    : null,
            })
            .skip(skip)
            .limit(limit);

        // تصفية النتائج الفارغة
        const filteredService = service.filter(s => s.OrderdId);

        // التحقق من وجود خدمة بناءً على الفلاتر
        if (filteredService.length === 0) {
            return res.status(404).json({
                message: `${serviceType} Service not found`,
            });
        }

        // إرجاع البيانات مع تفاصيل الباجينيشن
        res.status(200).json({
            services: filteredService,
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit),
            totalItems: totalCount,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving service",
            error: error.message,
        });
    }
};

