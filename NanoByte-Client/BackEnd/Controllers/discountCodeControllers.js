const DiscountCode = require('../Models/discountCodeModels'); // استدعاء الموديل

// دوال مساعدة لتواريخ البدء والانتهاء
const isExpired = (date) => date && date < new Date();
const isNotStartedYet = (date) => date && date > new Date();

exports.DiscountCodeData = async (req, res) => {
  try {
    const { code, serviceId } = req.body;
    const userId = req.user?.id;

    // البحث عن كود الخصم
    const discountCode = await DiscountCode.findOne({ codeName: code });
    if (!discountCode) {
      return res.status(404).json({ message: "Discount code not found" });
    }

    // التحقق من حالة الكود وتواريخ الصلاحية
    if (!discountCode.isActive) {
      return res.status(400).json({ message: "Discount code is not active" });
    }

    if (isNotStartedYet(discountCode.startTime)) {
      return res.status(403).json({ message: "This discount code is not active yet" });
    }

    if (isExpired(discountCode.expiresAt)) {
      await DiscountCode.updateOne(
        { _id: discountCode._id },
        { $set: { isActive: false } }
      );
      return res.status(403).json({ message: "This discount code has expired" });
    }

    // التحقق من الحد الأقصى للاستخدام
    if (discountCode.maxUsage === 0) {
      return res.status(403).json({ message: "This discount code is no longer available" });
    }

    const userUsage = discountCode.usedBy.find(
      (entry) => entry.userId.toString() === userId
    );

    if (userUsage && userUsage.usageCount >= discountCode.maxUsagePerUser) {
      return res.status(403).json({
        message: "You have reached the maximum usage limit for this discount code",
      });
    }

    // التحقق من المستخدمين المصرح لهم
    if (
      discountCode.authorizedUserId.length > 0 &&
      !discountCode.authorizedUserId.some((id) => id.toString() === userId)
    ) {
      return res.status(403).json({ message: "User is not authorized to use this discount code" });
    }

    // التحقق من الخدمات المطبقة على الكود
    if (
      discountCode.applicableServiceIds.length > 0 &&
      !discountCode.applicableServiceIds.includes(serviceId)
    ) {
      return res.status(400).json({
        message: "Discount code is not applicable for this service",
      });
    }

    // الرد بنجاح مع بيانات الكود
    res.status(200).json({ discountCode });

  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
