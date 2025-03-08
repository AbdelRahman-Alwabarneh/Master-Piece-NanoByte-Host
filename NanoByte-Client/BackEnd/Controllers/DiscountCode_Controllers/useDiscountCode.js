const DiscountCode = require('../../Models/discountCodeModels'); // استدعاء الموديل

exports.useDiscountCode = async (req, res) => {
    const { codeName } = req.body; // استلام اسم كود الخصم ومعرف المستخدم من الجسم
    const userId = req.user?.id;
    try {
      // العثور على كود الخصم بناءً على الاسم
      const discountCode = await DiscountCode.findOne({ codeName });
  
      if (!discountCode) {
        return res.status(404).json({ message: "Discount code not found" });
      }
  
      // التحقق مما إذا كان الكود نشطًا
      if (!discountCode.isActive) {
        return res.status(400).json({ message: "Discount code is not active" });
      }
 
      // البحث عن المستخدم في قائمة المستخدمين الذين استخدموا الكود
      const userUsage = discountCode.usedBy.find(user => user.userId.toString() === userId);
  
      if (userUsage) {
        userUsage.usageCount += 1; // زيادة عدد الاستخدامات لهذا المستخدم
        userUsage.lastUsed = new Date();
      } else {
        discountCode.usedBy.push({ userId, usageCount: 1 }); // إضافة المستخدم مع عدد استخدام 1
      }
  
      discountCode.usageCount += 1; // زيادة عدد الاستخدامات العامة
      await discountCode.save(); // حفظ التحديثات
  
      return res.status(200).json({ message: "Discount code used successfully", discountCode });
    } catch (err) {
      console.error("Error in using discount code:", err.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  };