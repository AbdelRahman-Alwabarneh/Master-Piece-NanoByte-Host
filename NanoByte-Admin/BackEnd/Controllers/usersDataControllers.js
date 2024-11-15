const allUser = require("../Models/usersModels");
const bcrypt = require("bcrypt");
exports.UsersData = async (req, res) => {
  try {
    const UsersData = await allUser.find();

    res.status(200).json({ UsersData });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.AllUsersData = async (req, res) => {
  const { search } = req.query;  // جلب قيمة البحث من الاستعلام
  const page = parseInt(req.query.page) || 1;  // الصفحة الحالية
  const limit = parseInt(req.query.limit);  // الحد الافتراضي للعدد في الصفحة

  try {
    // حساب قيمة الـ skip للباجينشن
    const skip = (page - 1) * limit;

    // بناء فلتر البحث
    const filter = {};
    if (search) {
      const regexSearch = { $regex: search, $options: 'i' };  // بحث غير حساس لحروف
      filter.$or = [
        { firstName: regexSearch },
        { lastName: regexSearch },
        { email: regexSearch },
        { phoneNumber: regexSearch },
      ];
    }

    // جلب إجمالي عدد المستخدمين بناءً على الفلتر
    const totalCount = await allUser.countDocuments(filter);

    // جلب المستخدمين مع تطبيق الباجينشن والفلترة
    const usersData = await allUser.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    // إرسال الاستجابة
    res.status(200).json({
      usersData,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      totalItems: totalCount,
      totalCount
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


exports.UserDetails= async (req, res) => {
  try {
    const UsersData = await allUser.findById(req.params.id);

    res.status(200).json({ UsersData });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  const { Data } = req.body;
  
  try {
    // Find user by ID
    const user = await allUser.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    (user.firstName = Data.firstName),
      (user.lastName = Data.lastName),
      (user.usernameDiscord = Data.discordUsername),
      (user.phoneNumber = Data.phoneNumber),
      (user.companyName = Data.companyName),
      (user.streetAddress = Data.streetAddress),
      (user.city = Data.city),
      (user.country = Data.country),
      (user.profileImage = Data.profileImage);

    // // Hash new password if provided
    if (Data.confirmPassword) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(Data.confirmPassword, salt);
      user.password = hashedPassword;
    }

    // Save updated user
    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
};

exports.BannedUser = async (req, res) => {
  try {    
    const BannedUser = await allUser.findById(req.params.id);
    if (!BannedUser) {
      return res.status(404).json({ message: 'Website Hosting Server not found' });
    }
    BannedUser.isBanned = !BannedUser.isBanned;
    await BannedUser.save();

    res.status(200).json({ message: 'Hidden Dedicated Server successfully', BannedUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};