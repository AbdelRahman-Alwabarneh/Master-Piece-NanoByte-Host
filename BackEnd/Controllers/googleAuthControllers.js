const User = require("../Models/usersModels");
const jwt = require("jsonwebtoken");

exports.googleAuth = async (req, res) => {
  try {
    const { google_id, email, name, picture } = req.body;
    
    if (!google_id || !email) {
      return res
        .status(400)
        .json({ message: "Missing required Google account information" });
    }

    // تقسيم الاسم إلى الاسم الأول والأخير
    let firstName = "";
    let lastName = "";
    if (name) {
      const nameParts = name.split(" ");
      firstName = nameParts[0] || "";
      lastName = nameParts.slice(1).join(" ") || "";
    }

    // البحث عن المستخدم أو إنشاء مستخدم جديد
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        firstName,
        lastName,
        email,
        profileImage: picture,
        googleId: google_id,
      });
    }

    // إنشاء JWT token
    const payloadJwt = {
      id: user._id,
    };
    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(payloadJwt, secretKey, { expiresIn: "2h" });

    // إعداد الكوكي
    res.cookie("authToken", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 2 * 60 * 60 * 1000, // ساعتين
    });

    // إرسال الاستجابة
    res.status(200).json({
      token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("Google signup error:", error);
    res
      .status(500)
      .json({ message: "Error during Google signup", error: error.message });
  }
};
