const vpsGroupModels = require("../Models/vpsGroupModels");

exports.GroupsData = async (req, res) => {
  try {
    // إعداد استعلام القاعدة الأولي للحصول على المجموعات المرئية
    let query = {
      isVisible: true,
    };
    // console.log(req.user.id)
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

    const vpsGroupsData = await vpsGroupModels.find(query);

    // التحقق من وجود بيانات وإرجاعها
    if (!vpsGroupsData.length) {
      return res.status(404).json({ message: "No groups found" });
    }

    // إرجاع البيانات
    return res.status(200).json({ vpsGroupsData });
  } catch (error) {
    // التعامل مع أي خطأ يحدث أثناء العملية
    console.error("Error fetching groups:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
