const DiscountCode = require('../Models/discountCodeModels'); // استدعاء الموديل

exports.createDiscountCode = async (req, res) => {
  try {
    const {
      codeName,
      discountValue,
      discountType,
      authorizedUserId,
      startTime,
      expiresAt,
      isActive,
      maxUsage,
      maxUsagePerUser,
      applicableServiceIds,
      adminNotes,
    } = req.body;

    // التحقق من الحقول المطلوبة
    if (!codeName || !discountValue || !discountType) {
      return res.status(400).json({ message: "Code name, value, and type are required" });
    }

    // إنشاء كود الخصم الجديد
    const newDiscountCode = await DiscountCode.create({
      codeName,
      discountValue,
      discountType,
      authorizedUserId,
      startTime,
      expiresAt,
      isActive,
      maxUsage: maxUsage || Infinity,
      maxUsagePerUser: maxUsagePerUser || Infinity,
      applicableServiceIds,
      adminNotes,
    });

    res.status(201).json({
      message: "Discount code created successfully",
      discountCode: newDiscountCode,
    });
  } catch (error) {
    console.error("Internal Server Error:", error);
    res.status(500).json({
      message: "Failed to create discount code",
      error: error.message,
    });
  }
};

exports.updateDiscountCode = async (req, res) => {
    try {
      const { id } = req.params; // نأخذ الـ id من الـ URL
      const {
        codeName,
        discountValue,
        discountType,
        authorizedUserId,
        startTime,
        expiresAt,
        isActive,
        maxUsage,
        maxUsagePerUser,
        applicableServiceIds,
        adminNotes,
      } = req.body;
  
      // التحقق من الحقول المطلوبة
      if (!codeName || !discountValue || !discountType) {
        return res.status(400).json({ message: "Code name, value, and type are required" });
      }
  
      // تحديث كود الخصم باستخدام ID
      const updatedDiscountCode = await DiscountCode.findByIdAndUpdate(
        id,
        {
          codeName,
          discountValue,
          discountType,
          authorizedUserId,
          startTime,
          expiresAt,
          isActive,
          maxUsage: maxUsage || Infinity,
          maxUsagePerUser: maxUsagePerUser || Infinity,
          applicableServiceIds,
          adminNotes,
        },
        { new: true } // إرجاع كود الخصم بعد التحديث
      );
  
      if (!updatedDiscountCode) {
        return res.status(404).json({ message: "Discount code not found" });
      }
  
      res.status(200).json({
        message: "Discount code updated successfully",
        discountCode: updatedDiscountCode,
      });
    } catch (error) {
      console.error("Internal Server Error:", error);
      res.status(500).json({
        message: "Failed to update discount code",
        error: error.message,
      });
    }
  };
  

exports.DiscountCodeData = async (req, res) => {
    try {
      const DiscountCodeData = await DiscountCode.find();
  
      res.status(200).json({ DiscountCodeData });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  };

  exports.DiscountCodeDetails= async (req, res) => {
    try {
      const DiscountCodeDetails = await DiscountCode.findById(req.params.id).populate('usedBy.userId', 'firstName email');;
  
      res.status(200).json({ DiscountCodeDetails });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    }
  };

  exports.HiddenDiscountCode = async (req, res) => {
    try {    
      const HiddenDiscountCode = await DiscountCode.findById(req.params.id);
      if (!HiddenDiscountCode) {
        return res.status(404).json({ message: 'Discount Code not found' });
      }
      HiddenDiscountCode.isActive = !HiddenDiscountCode.isActive;
      await HiddenDiscountCode.save();
  
      res.status(200).json({ message: 'Hidden Discount Code successfully', HiddenDiscountCode });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };