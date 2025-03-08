const DiscountCode = require('../../Models/discountCodeModels'); // استدعاء الموديل

// دوال مساعدة لتواريخ البدء والانتهاء
const isExpired = (date) => date && date < new Date();
const isNotStartedYet = (date) => date && date > new Date();

exports.DiscountCodeData = async (req, res) => {
  try {
    const { code, serviceId, totalPrice, setupFee} = req.body;
    const userId = req.user?.id;
    
    // البحث عن كود الخصم
    const discountCode = await DiscountCode.findOne({ codeName: code });
    if (!discountCode) {
      return res.status(404).json({ message: "لم يتم العثور على كود الخصم" });
    }

    // التحقق من حالة الكود وتواريخ الصلاحية
    if (!discountCode.isActive) {
      return res.status(400).json({ message: "كود الخصم غير نشط" });
    }

    if (isNotStartedYet(discountCode.startTime)) {
      return res.status(403).json({ message: "لم يحل موعد الخصم بعد" });
    }

    if (isExpired(discountCode.expiresAt)) {
      await DiscountCode.updateOne(
        { _id: discountCode._id },
        { $set: { isActive: false } }
      );
      return res.status(403).json({ message: "انتهت صلاحية كود الخصم" });
    }

    // التحقق من الحد الأقصى للاستخدام
    if (discountCode.maxUsage === 0) {
      return res.status(403).json({ message: "كود الخصم لم يعد متاح" });
    }

    const userUsage = discountCode.usedBy.find(
      (entry) => entry.userId.toString() === userId
    );

    if (userUsage && userUsage.usageCount >= discountCode.maxUsagePerUser) {
      return res.status(403).json({
        message: "لقد بلغت الحد الأقصى المسموح به لاستخدام كود الخصم",
      });
    }

    // التحقق من المستخدمين المصرح لهم
    if (
      discountCode.authorizedUserId.length > 0 &&
      !discountCode.authorizedUserId.some((id) => id.toString() === userId)
    ) {
      return res.status(403).json({ message: "كود الخصم غير متاح" });
    }

    // التحقق من الخدمات المطبقة على الكود
    if (
      discountCode.applicableServiceIds.length > 0 &&
      !discountCode.applicableServiceIds.includes(serviceId)
    ) {
      return res.status(400).json({
        message: "كود الخصم غير متاح للتطبيق على هذه الخطة",
      });
    }

    // حساب الخصم وتحديد المجموع الجديد
    const discountValue = discountCode.discountType === "percentage"
      ? ((totalPrice + setupFee) * discountCode.discountValue) / 100
      : discountCode.discountValue;

    const newTotalPrice = totalPrice + setupFee - discountValue;
    
    res.status(200).json({ 
      newTotalPrice,
      discountValue,
      OriginalDiscountValue:discountCode.discountValue,
      discountType: discountCode.discountType,
      codeName: discountCode.codeName
    });
    
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
