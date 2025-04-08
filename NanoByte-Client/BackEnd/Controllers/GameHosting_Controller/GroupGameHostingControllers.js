const Group = require("../../Models/GroupGameHostingModels"); // تأكد من اسم الموديل الصحيح

exports.GroupsData = async (req, res) => {
  try {
    // إعداد استعلام القاعدة الأولي للحصول على المجموعات المرئية
    let query = {
      isVisible: true,
    };

    // إذا كان المستخدم مسجل دخول، أضف شرط للتحقق من وجوده في قائمة المستخدمين أو إذا كانت المجموعات لا تحتوي على مستخدمين
    if (req.user?.id) {
      query = {
        isVisible: true,
        $or: [
          { users: { $exists: true, $size: 0 } }, // المجموعات التي لا تحتوي على مستخدمين
          { users: req.user.id }, // المجموعات التي تحتوي على المستخدم الحالي
        ],
      };
    } else {
      // إذا لم يكن المستخدم مسجل دخول، فقط عرض المجموعات التي لا تحتوي على مستخدمين
      query = {
        isVisible: true,
        users: { $exists: true, $size: 0 },
      };
    }

    const groupsData = await Group.find(query).populate({
      path: "plans",
      match: { isHidden: false },
      select:
        "planName ram cpu storage connectionSpeed security databases subscriptionDurations.oneMonth.price quantity productLink isUnlimited",
        options: { sort: { createdAt: 1 } },
    }); // إذا كنت تريد معلومات عن الخطط

    // التحقق من وجود بيانات وإرجاعها
    if (!groupsData.length) {
      return res.status(404).json({ message: "No groups found" });
    }

    // إرجاع البيانات
    return res.status(200).json({ groupsData });
  } catch (error) {
    // التعامل مع أي خطأ يحدث أثناء العملية
    console.error("Error fetching groups:", error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
