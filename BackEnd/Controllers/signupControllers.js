// controllers/userController.js
const User = require("../Models/usersModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
cookieParser = require('cookie-parser')

exports.createUser = async (req, res) => {
  try {
    const { First_Name, Last_Name, Email, Password } = req.body;

    if (!First_Name || !Last_Name || !Email || !Password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email: Email });
    if (existingUser) {
        return res.status(400).json({ message: 'البريد الإلكتروني مسجل بالفعل.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    // استخدام Model.create() لإدراج المستخدم الجديد
    const newUser = await User.create({
      firstName: First_Name,
      lastName: Last_Name,
      email: Email,
      password: hashedPassword,
    });

    // jwt
    const payload = {
      id: newUser.id,
      First_Name: newUser.firstName,
      Last_Name: newUser.lastName,
    };

    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(payload, secretKey, { expiresIn: "2h" });

          // cookie
          res.cookie("authToken", token, {
            httpOnly: true, // لا يمكن الوصول او التعديل على الكوكيز عن طريق الجافا سكربت في المتصفح
            sameSite: "strict", // يتم ارسال الكوكيز فقط مع الطلبات التي تأتي مع نفس الرابط
            maxAge: 2 * 60 * 60 * 1000, // مدة صلاحية الكوكيز في الملي ثانية هاي المدة ساعتين
          });
      
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
